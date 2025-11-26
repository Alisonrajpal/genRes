import React, { useState, useEffect } from "react";
import PersonalInfoForm from "../InputForms/PersonalInfoForm";
import EducationForm from "../InputForms/EducationForm";
import WorkExperienceForm from "../InputForms/WorkExperienceForm";
import SkillsForm from "../InputForms/SkillsForm";
import PreviewPanel from "../PreviewPanel/PreviewPanel";
import TemplateSelector from "../TemplateSelector/TemplateSelector";
import { ResumeData, Template } from "../../types/resume";
import { defaultResumeData, defaultTemplate } from "../../utils/default";
import api from "../../services/api";

const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] =
    useState<Template>(defaultTemplate);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error" | "warning",
  });

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    const savedTemplate = localStorage.getItem("selectedTemplate");

    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading resume data:", error);
      }
    }

    if (savedTemplate) {
      try {
        setSelectedTemplate(JSON.parse(savedTemplate));
      } catch (error) {
        console.error("Error loading template:", error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem("selectedTemplate", JSON.stringify(selectedTemplate));
  }, [selectedTemplate]);

  const showToast = (
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 4000);
  };

  const handleResumeDataChange = (newData: ResumeData) => {
    setResumeData(newData);
  };

  const generateSummary = async () => {
    try {
      const prompt = `Write a concise, professional resume summary for ${
        resumeData.personalInfo.firstName
      } ${resumeData.personalInfo.lastName}. Include skills: ${resumeData.skills
        .map((s) => s.name)
        .join(
          ", "
        )}. Highlight experience from positions: ${resumeData.workExperience
        .map((w) => w.position)
        .join(", ")}. Keep it under 60 words.`;
      const resp = await api.generateText({ prompt, max_tokens: 120 });
      const generated = resp.generated_text || "";

      setResumeData({
        ...resumeData,
        personalInfo: { ...resumeData.personalInfo, summary: generated },
      });
      showToast("Generated summary added", "success");
    } catch (err: any) {
      console.error("Generation failed", err);
      showToast("AI generation failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Resume Builder
          </h1>
          <p className="text-lg text-gray-600">
            Fill in your information and watch your resume come to life in
            real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Forms */}
          <div className="space-y-6">
            <div className="flex items-center justify-end">
              <button
                onClick={generateSummary}
                className="btn-secondary text-sm px-4 py-2">
                Generate Summary
              </button>
            </div>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
            />

            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={(personalInfo) =>
                handleResumeDataChange({ ...resumeData, personalInfo })
              }
            />

            <EducationForm
              education={resumeData.education}
              onChange={(education) =>
                handleResumeDataChange({ ...resumeData, education })
              }
            />

            <WorkExperienceForm
              workExperience={resumeData.workExperience}
              onChange={(workExperience) =>
                handleResumeDataChange({ ...resumeData, workExperience })
              }
            />

            <SkillsForm
              skills={resumeData.skills}
              onChange={(skills) =>
                handleResumeDataChange({ ...resumeData, skills })
              }
            />
          </div>

          {/* Right Side - Preview */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <PreviewPanel
              resumeData={resumeData}
              template={selectedTemplate}
              onExportSuccess={() =>
                showToast("Resume exported successfully!", "success")
              }
              onExportError={(error) =>
                showToast(`Export failed: ${error}`, "error")
              }
            />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg border transform transition-transform duration-300 animate-slide-up ${
            toast.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : toast.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-yellow-50 border-yellow-200 text-yellow-800"
          }`}>
          <div className="flex items-center">
            <div className="text-sm font-medium">{toast.message}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
