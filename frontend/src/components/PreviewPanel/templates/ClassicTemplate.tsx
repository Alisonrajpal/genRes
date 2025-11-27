import React from "react";
import { ResumeData } from "../../../types/resume";
import { formatDate } from "../../../utils/helpers";

const ClassicTemplate: React.FC<{ resumeData: ResumeData }> = ({
  resumeData,
}) => {
  const { personalInfo, education, workExperience, skills, projects, certifications } = resumeData;

  return (
    <div className="classic-template font-serif text-gray-800">
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-2 border-gray-400">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.linkedIn && (
            <span>LinkedIn: {personalInfo.linkedIn}</span>
          )}
          {personalInfo.portfolio && (
            <span>Portfolio: {personalInfo.portfolio}</span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-800 leading-relaxed text-sm">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-sm">
                    {exp.position}
                  </h3>
                  <span className="text-xs text-gray-700">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.currentlyWorking ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-800 text-sm font-semibold">
                    {exp.company}
                  </p>
                  {exp.location && (
                    <span className="text-xs text-gray-700">{exp.location}</span>
                  )}
                </div>
                {exp.description && (
                  <p className="text-gray-800 text-sm mb-2">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-800 text-sm space-y-1 ml-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-sm">
                    {edu.degree}
                  </h3>
                  <span className="text-xs text-gray-700">
                    {formatDate(edu.startDate)} -{" "}
                    {edu.currentlyStudying ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-800 text-sm font-semibold">
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <span className="text-xs text-gray-700">GPA: {edu.gpa}</span>
                  )}
                </div>
                <p className="text-gray-800 text-sm">{edu.fieldOfStudy}</p>
                {edu.description && (
                  <p className="text-gray-800 text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">
            PROJECTS
          </h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-sm">
                    {project.name}
                  </h3>
                  <span className="text-xs text-gray-700">
                    {formatDate(project.startDate)} -{" "}
                    {formatDate(project.endDate)}
                  </span>
                </div>
                <p className="text-gray-800 text-sm mb-2">
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div className="text-xs text-gray-700">
                    <strong>Technologies:</strong> {project.technologies.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">
            SKILLS
          </h2>
          <div className="space-y-2">
            {Object.entries(
              skills.reduce((acc: Record<string, any[]>, skill) => {
                const cat = skill.category || "Other";
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(skill);
                return acc;
              }, {})
            ).map(([category, categorySkills]) => (
              <div key={category} className="mb-2">
                <span className="font-semibold text-gray-900 text-sm">
                  {category}:
                </span>{" "}
                <span className="text-gray-800 text-sm">
                  {categorySkills.map((skill: any) => skill.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">
            CERTIFICATIONS
          </h2>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="text-sm">
                <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                <p className="text-gray-800">{cert.issuer}</p>
                <p className="text-xs text-gray-700">
                  Issued: {formatDate(cert.issueDate)}
                  {cert.expirationDate &&
                    ` • Expires: ${formatDate(cert.expirationDate)}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
