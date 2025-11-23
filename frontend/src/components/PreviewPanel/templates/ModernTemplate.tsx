import React from "react";
import { ResumeData } from "../../../types/resume";
import { formatDate, calculateDuration } from "../../../utils/helpers";

interface ModernTemplateProps {
  resumeData: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData }) => {
  const {
    personalInfo,
    education,
    workExperience,
    skills,
    projects,
    certifications,
  } = resumeData;

  return (
    <div className="modern-template font-sans text-gray-800">
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-2 border-blue-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
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
          <h2 className="text-xl font-semibold text-blue-600 mb-3 pb-2 border-b border-gray-200">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b border-gray-200">
                Work Experience
              </h2>
              <div className="space-y-4">
                {workExperience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                      {exp.location && (
                        <span className="text-sm text-gray-600">
                          {exp.location}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mb-2">{exp.description}</p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {exp.achievements.map(
                          (achievement, achievementIndex) => (
                            <li key={achievementIndex}>{achievement}</li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b border-gray-200">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(edu.startDate)} -{" "}
                        {edu.currentlyStudying
                          ? "Present"
                          : formatDate(edu.endDate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-700 font-medium">
                        {edu.institution}
                      </p>
                      {edu.gpa && (
                        <span className="text-sm text-gray-600">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700">{edu.fieldOfStudy}</p>
                    {edu.description && (
                      <p className="text-gray-700 mt-1 text-sm">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b border-gray-200">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-500 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {project.name}
                      </h3>
                      <span className="text-sm text-gray-600">
                        {formatDate(project.startDate)} -{" "}
                        {formatDate(project.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-3 pb-2 border-b border-gray-200">
                Skills
              </h2>
              <div className="space-y-3">
                {Object.entries(
                  skills.reduce((acc: Record<string, any[]>, skill) => {
                    const cat = skill.category || "Other";
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(skill);
                    return acc;
                  }, {})
                ).map(([category, categorySkills]) => (
                  <div key={category} className="mb-3">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {categorySkills.map((skill: any, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-3 pb-2 border-b border-gray-200">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                    <p className="text-sm text-gray-700">{cert.issuer}</p>
                    <p className="text-xs text-gray-600">
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
      </div>
    </div>
  );
};

export default ModernTemplate;
