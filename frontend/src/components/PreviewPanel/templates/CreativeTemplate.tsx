import React from "react";
import { ResumeData } from "../../../types/resume";
import { formatDate } from "../../../utils/helpers";

interface CreativeTemplateProps {
  resumeData: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ resumeData }) => {
  const { personalInfo, education, workExperience, skills, projects } =
    resumeData;

  // Group skills by category
  const groupedSkills = skills.reduce((acc: Record<string, any[]>, s) => {
    const cat = s.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <div className="creative-template font-sans text-gray-800">
      <div className="grid grid-cols-3 gap-6">
        {/* Left sidebar */}
        <aside className="col-span-1 bg-gradient-to-b from-purple-600 to-pink-500 text-white p-6 rounded-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-sm mt-1">
              {(personalInfo as any).position || ""}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="uppercase text-xs opacity-80 tracking-wider mb-2">
              Contact
            </h3>
            <div className="text-sm space-y-1 text-white/90">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.linkedIn && <div>{personalInfo.linkedIn}</div>}
            </div>
          </div>

          <div>
            <h3 className="uppercase text-xs opacity-80 tracking-wider mb-2">
              Skills
            </h3>
            {Object.entries(groupedSkills).map(([cat, list]) => (
              <div key={cat} className="mb-3">
                <div className="text-xs font-semibold mb-2">{cat}</div>
                <div className="flex flex-wrap gap-2">
                  {list.map((sk: any, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/20 text-white text-xs rounded">
                      {sk.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-2 bg-white p-6 rounded-lg">
          {personalInfo.summary && (
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Professional Summary
              </h2>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {workExperience.length > 0 && (
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Experience
              </h2>
              <div className="space-y-3">
                {workExperience.map((exp, i) => (
                  <div key={i} className="border-l-4 border-pink-500 pl-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">
                        {exp.position} — {exp.company}
                      </h3>
                      <span className="text-sm text-gray-600">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mt-1">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {edu.degree} — {edu.institution}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDate(edu.startDate)} -{" "}
                        {edu.currentlyStudying
                          ? "Present"
                          : formatDate(edu.endDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Projects
              </h2>
              <div className="space-y-2">
                {projects.map((p, i) => (
                  <div key={i}>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-600">{p.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default CreativeTemplate;
