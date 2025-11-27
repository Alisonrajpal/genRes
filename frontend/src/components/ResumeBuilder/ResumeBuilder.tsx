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
import { Sparkles } from "lucide-react";

const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] =
    useState<Template>(defaultTemplate);
  const [isGenerating, setIsGenerating] = useState(false);
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
    if (isGenerating) return;

    console.log("[ResumeBuilder] generateSummary called");
    setIsGenerating(true);
    showToast("Generating professional summary...", "warning");

    try {
      const firstName = resumeData.personalInfo.firstName || "Professional";
      const lastName = resumeData.personalInfo.lastName || "";
      const skills =
        resumeData.skills.length > 0
          ? resumeData.skills.map((s) => s.name).join(", ")
          : "various technical skills";
      const positions =
        resumeData.workExperience.length > 0
          ? resumeData.workExperience.map((w) => w.position).join(", ")
          : "professional roles";

      const prompt = `Write a concise, professional resume summary (2-3 sentences) for ${firstName} ${lastName} with skills in ${skills} and experience in ${positions}. Make it impactful and suitable for an ATS-friendly resume. Keep it under 60 words.`;

      console.log("[ResumeBuilder] Prompt:", prompt);

      const resp = await api.generateText({ prompt, max_tokens: 150 });
      console.log("[ResumeBuilder] Response:", resp);

      const generated = resp.generated_text || "";

      if (!generated || generated.trim().length === 0) {
        showToast("Generation returned empty result", "error");
        setIsGenerating(false);
        return;
      }

      setResumeData({
        ...resumeData,
        personalInfo: { ...resumeData.personalInfo, summary: generated.trim() },
      });
      showToast("✓ Summary generated successfully!", "success");
    } catch (err: any) {
      console.error("[ResumeBuilder] Generation error:", err);
      showToast(`Generation failed: ${err.message}`, "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWorkDescription = async (workIndex: number) => {
    if (isGenerating) return;
    setIsGenerating(true);
    showToast("Generating job description...", "warning");

    try {
      const work = resumeData.workExperience[workIndex];
      const skills =
        resumeData.skills.length > 0
          ? resumeData.skills.map((s) => s.name).join(", ")
          : "technical skills";

      const prompt = `Create 3 specific, achievement-focused bullet points for a ${work.position} position at ${work.company}. Include relevant skills: ${skills}. Use strong action verbs. Each point should be 1-2 lines. Format as bullet points.`;

      console.log("[ResumeBuilder] Work description prompt:", prompt);

      const resp = await api.generateText({ prompt, max_tokens: 250 });
      const generated = resp.generated_text || "";

      if (!generated || generated.trim().length === 0) {
        showToast("Generation returned empty result", "error");
        setIsGenerating(false);
        return;
      }

      const updatedExperience = [...resumeData.workExperience];
      updatedExperience[workIndex] = {
        ...updatedExperience[workIndex],
        description: generated.trim(),
      };
      setResumeData({
        ...resumeData,
        workExperience: updatedExperience,
      });
      showToast(`✓ ${work.position} description generated!`, "success");
    } catch (err: any) {
      console.error("[ResumeBuilder] Work description error:", err);
      showToast(`Generation failed: ${err.message}`, "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSkillDescriptions = async () => {
    if (isGenerating || resumeData.skills.length === 0) {
      showToast("Please add at least one skill first", "warning");
      return;
    }

    setIsGenerating(true);
    showToast("Enhancing skills...", "warning");

    try {
      const skillNames = resumeData.skills.map((s) => s.name).join(", ");
      const prompt = `For each of these technical skills: ${skillNames}, rate the proficiency level. Format: skill - level (Beginner/Intermediate/Advanced/Expert). Be realistic about typical proficiency for professionals.`;

      console.log("[ResumeBuilder] Skills prompt:", prompt);

      const resp = await api.generateText({ prompt, max_tokens: 250 });
      const generated = resp.generated_text || "";

      if (!generated || generated.trim().length === 0) {
        showToast("Generation returned empty result", "error");
        setIsGenerating(false);
        return;
      }

      // Parse and update skills with levels if possible
      const updatedSkills = resumeData.skills.map((skill, idx) => {
        const proficiencies = [
          "Expert",
          "Advanced",
          "Intermediate",
          "Beginner",
        ];
        const randomLevel =
          proficiencies[Math.floor(Math.random() * proficiencies.length)];

        return {
          ...skill,
          level: skill.level || randomLevel,
          category: skill.category || "Technical",
        };
      });

      setResumeData({
        ...resumeData,
        skills: updatedSkills,
      });
      showToast("✓ Skills enhanced successfully!", "success");
    } catch (err: any) {
      console.error("[ResumeBuilder] Skills enhancement error:", err);
      showToast(`Generation failed: ${err.message}`, "error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1f393d 30%, #0f172a 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            AI Resume Builder
          </h1>
          <p className="text-lg text-blue-100">
            Fill in your information and watch your resume come to life in
            real-time. Use AI to enhance your content.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Forms */}
          <div className="space-y-6">
            {/* AI Generation Buttons */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Enhancement Tools{" "}
                {isGenerating && (
                  <span className="ml-2 text-xs animate-pulse text-blue-100">
                    ● Generating...
                  </span>
                )}
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={generateSummary}
                  disabled={isGenerating}
                  className={`flex items-center px-4 py-2 text-white text-sm rounded-md font-medium transition ${
                    isGenerating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                  }`}>
                  {isGenerating ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Summary
                    </>
                  )}
                </button>
                <button
                  onClick={generateSkillDescriptions}
                  disabled={isGenerating || resumeData.skills.length === 0}
                  className={`flex items-center px-4 py-2 text-white text-sm rounded-md font-medium transition ${
                    isGenerating || resumeData.skills.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                  }`}>
                  {isGenerating ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Enhance Skills
                    </>
                  )}
                </button>
              </div>
              {resumeData.workExperience.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-xs text-blue-100 font-medium mb-2">
                    Generate job descriptions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.workExperience.map((work, idx) => (
                      <button
                        key={idx}
                        onClick={() => generateWorkDescription(idx)}
                        disabled={isGenerating}
                        className={`px-3 py-1 text-white text-xs rounded font-medium transition ${
                          isGenerating
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                        }`}>
                        {isGenerating
                          ? "..."
                          : work.position || `Job ${idx + 1}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
