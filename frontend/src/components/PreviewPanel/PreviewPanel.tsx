import React, { useRef, useState, useEffect } from "react";
import { Eye, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { ResumeData, Template } from "../../types/resume";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import api from "../../services/api";

import ExportControls from "./ExportControls";

interface PreviewPanelProps {
  resumeData: ResumeData;
  template: Template;
  onExportSuccess: () => void;
  onExportError: (error: string) => void;
}

interface ATSScore {
  score: number;
  feedback: string[];
  keyword_match: number;
  total_keywords: number;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  resumeData,
  template,
  onExportSuccess,
  onExportError,
}) => {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [isCheckingAts, setIsCheckingAts] = useState(false);

  // Generate resume text from data for ATS checking
  const generateResumeText = (): string => {
    const parts: string[] = [];

    // Personal info
    if (resumeData.personalInfo.firstName) {
      parts.push(
        `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`
      );
    }
    if (resumeData.personalInfo.email)
      parts.push(resumeData.personalInfo.email);
    if (resumeData.personalInfo.phone)
      parts.push(resumeData.personalInfo.phone);
    if (resumeData.personalInfo.summary)
      parts.push(`Summary: ${resumeData.personalInfo.summary}`);

    // Education
    if (resumeData.education.length > 0) {
      parts.push("Education");
      resumeData.education.forEach((edu) => {
        parts.push(edu.degree, edu.fieldOfStudy, edu.institution);
        if (edu.description) parts.push(edu.description);
      });
    }

    // Work Experience
    if (resumeData.workExperience.length > 0) {
      parts.push("Experience");
      resumeData.workExperience.forEach((work) => {
        parts.push(work.position, work.company);
        if (work.description) parts.push(work.description);
        work.achievements?.forEach((ach) => parts.push(ach));
      });
    }

    // Skills
    if (resumeData.skills.length > 0) {
      parts.push("Skills");
      resumeData.skills.forEach((skill) => {
        parts.push(skill.name);
        if (skill.level) parts.push(skill.level);
      });
    }

    return parts.join(" ");
  };

  // Check ATS score whenever resume data changes
  useEffect(() => {
    const checkAts = async () => {
      setIsCheckingAts(true);
      try {
        const resumeText = generateResumeText();
        const result = await api.checkATSScore(resumeText);
        setAtsScore(result);
      } catch (error) {
        console.error("Error checking ATS score:", error);
      } finally {
        setIsCheckingAts(false);
      }
    };

    // Debounce ATS check
    const timer = setTimeout(checkAts, 500);
    return () => clearTimeout(timer);
  }, [resumeData]);

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
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

        {/* ATS Score Section */}
        {atsScore && (
          <div
            className={`mb-4 p-4 rounded-lg border ${getScoreBgColor(
              atsScore.score
            )}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {atsScore.score >= 70 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                )}
                <h3 className="font-semibold text-gray-900">ATS Score</h3>
              </div>
              <div
                className={`text-2xl font-bold ${getScoreColor(
                  atsScore.score
                )}`}>
                {atsScore.score}/100
              </div>
            </div>

            <div className="mb-3">
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    atsScore.score >= 80
                      ? "bg-green-600"
                      : atsScore.score >= 60
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                  style={{ width: `${atsScore.score}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-2">
              Keywords matched: {atsScore.keyword_match}/
              {atsScore.total_keywords}
            </p>

            {atsScore.feedback.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Suggestions:
                </p>
                <ul className="text-xs text-gray-700 space-y-1">
                  {atsScore.feedback.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

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
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          💡 ATS Score Tips:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • Use standard section headers (Education, Experience, Skills)
          </li>
          <li>• Include relevant keywords from job descriptions</li>
          <li>• Keep resume length between 300-1000 words</li>
          <li>• Add action verbs like "Managed", "Developed", "Led"</li>
        </ul>
      </div>
    </div>
  );
};

export default PreviewPanel;
