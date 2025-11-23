import React from "react";
import { Download, FileText, FileCode, RefreshCw } from "lucide-react";
import { ResumeData, Template } from "../../types/resume";
import {
  exportToPdf,
  exportToDocx,
  exportToHtml,
} from "../../services/export/generators";
import api from "../../services/api";

interface ExportControlsProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  resumeData: ResumeData;
  template: Template;
  isExporting: boolean;
  setIsExporting: (exporting: boolean) => void;
  onExportSuccess: () => void;
  onExportError: (error: string) => void;
}

const ExportControls: React.FC<ExportControlsProps> = ({
  previewRef,
  resumeData,
  template,
  isExporting,
  setIsExporting,
  onExportSuccess,
  onExportError,
}) => {
  const handleExport = async (format: "pdf" | "docx" | "html") => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      switch (format) {
        case "pdf":
          await exportToPdf(
            previewRef.current,
            `${resumeData.personalInfo.firstName}_Resume.pdf`
          );
          break;
        case "docx":
          await exportToDocx(
            resumeData,
            `${resumeData.personalInfo.firstName}_Resume.docx`
          );
          break;
        case "html":
          await exportToHtml(
            resumeData,
            template,
            `${resumeData.personalInfo.firstName}_Resume.html`
          );
          break;
      }
      onExportSuccess();

      // Persist resume to backend when export succeeds
      try {
        // we don't await strongly here; try to save and ignore non-critical failures
        await api.saveResume({
          personalInfo: resumeData.personalInfo,
          education: resumeData.education,
          workExperience: resumeData.workExperience,
          skills: resumeData.skills,
          projects: resumeData.projects,
          certifications: resumeData.certifications,
        });
      } catch (err: any) {
        // notify user via onExportError but don't block
        onExportError(err?.message || "Failed to save resume to backend");
      }
    } catch (error) {
      onExportError(error instanceof Error ? error.message : "Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Export Resume</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => handleExport("pdf")}
          disabled={isExporting}
          className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {isExporting ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </>
          )}
        </button>

        <button
          onClick={() => handleExport("docx")}
          disabled={isExporting}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {isExporting ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              DOCX
            </>
          )}
        </button>

        <button
          onClick={() => handleExport("html")}
          disabled={isExporting}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {isExporting ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <FileCode className="h-4 w-4 mr-2" />
              HTML
            </>
          )}
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-500 text-center">
        <p>PDF recommended for job applications</p>
      </div>
    </div>
  );
};

export default ExportControls;
