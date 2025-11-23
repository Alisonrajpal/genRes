import React, { useRef, useState } from "react";
import { Eye, FileText } from "lucide-react";
import { ResumeData, Template } from "../../types/resume";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

import ExportControls from "./ExportControls";

interface PreviewPanelProps {
  resumeData: ResumeData;
  template: Template;
  onExportSuccess: () => void;
  onExportError: (error: string) => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  resumeData,
  template,
  onExportSuccess,
  onExportError,
}) => {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const renderTemplate = () => {
    const templateProps = { resumeData };

    switch (template.id) {
      case "modern":
        return <ModernTemplate {...templateProps} />;
      case "classic":
        return <ClassicTemplate {...templateProps} />;
      case "creative":
        return <CreativeTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  return (
    <div className="sticky top-8">
      <div className="card p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-blue-600" />
            Live Preview
          </h2>
          <div className="flex items-center space-x-2">
            <button
              className="flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => window.print()}>
              <FileText className="h-4 w-4 mr-1" />
              Print
            </button>
          </div>
        </div>

        {/* Preview Container */}
        <div className="border-2 border-gray-200 rounded-lg bg-white">
          {/* Preview Content */}
          <div
            ref={previewRef}
            className="preview-container min-h-[800px] p-8 bg-white">
            {renderTemplate()}
          </div>
        </div>

        {/* Export Controls */}
        <ExportControls
          previewRef={previewRef}
          resumeData={resumeData}
          template={template}
          isExporting={isExporting}
          setIsExporting={setIsExporting}
          onExportSuccess={onExportSuccess}
          onExportError={onExportError}
        />
      </div>

      {/* Preview Tips */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          Preview Tips:
        </h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• All templates are ATS-optimized and print-ready</li>
          <li>• Export as PDF for best quality</li>
          <li>• Use the print button for quick printing</li>
          <li>• Ensure all sections are filled for best results</li>
        </ul>
      </div>
    </div>
  );
};

export default PreviewPanel;
