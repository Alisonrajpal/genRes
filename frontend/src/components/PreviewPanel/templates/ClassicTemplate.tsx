import React from "react";
import { ResumeData } from "../../../types/resume";
import { formatDate } from "../../../utils/helpers";

const ClassicTemplate: React.FC<{ resumeData: ResumeData }> = ({
  resumeData,
}) => {
  const { personalInfo, education, workExperience, skills } = resumeData;

  return (
    <div className="classic-template font-serif text-gray-800">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </header>

      {/* Content will be similar to Modern but with classic styling */}
      <div className="space-y-8">{/* Add classic template content */}</div>
    </div>
  );
};

export default ClassicTemplate;
