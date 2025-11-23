import React from "react";
import { Plus, Trash2, Star, Settings } from "lucide-react";
import { Skill } from "../../types/resume";
import { generateId } from "../../utils/helpers";
import { defaultSkill } from "../../utils/default";

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const addSkill = () => {
    onChange([...skills, { ...defaultSkill, id: generateId() }]);
  };

  const updateSkill = (index: number, updatedSkill: Skill) => {
    const newSkills = [...skills];
    newSkills[index] = updatedSkill;
    onChange(newSkills);
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    onChange(newSkills);
  };

  const skillCategories = [
    "Technical",
    "Programming Languages",
    "Frameworks",
    "Tools",
    "Soft Skills",
    "Languages",
    "Certifications",
    "Other",
  ];

  const proficiencyLevels = [
    {
      value: "Beginner",
      label: "Beginner",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "Intermediate",
      label: "Intermediate",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "Advanced",
      label: "Advanced",
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "Expert",
      label: "Expert",
      color: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-blue-600" />
          Skills
        </h2>
        <button onClick={addSkill} className="btn-primary">
          <Plus className="h-4 w-4 mr-1" />
          Add Skill
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Settings className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No skills added yet. Click "Add Skill" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-900">
                  Skill #{index + 1}
                </h3>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) =>
                      updateSkill(index, { ...skill, name: e.target.value })
                    }
                    className="input-field"
                    placeholder="JavaScript, Project Management, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={skill.category}
                    onChange={(e) =>
                      updateSkill(index, { ...skill, category: e.target.value })
                    }
                    className="input-field"
                    required>
                    <option value="">Select a category</option>
                    {skillCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Star className="h-4 w-4 mr-1 text-gray-500" />
                    Proficiency Level *
                  </label>
                  <select
                    value={skill.level}
                    onChange={(e) =>
                      updateSkill(index, {
                        ...skill,
                        level: e.target.value as any,
                      })
                    }
                    className="input-field"
                    required>
                    {proficiencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    value={skill.yearsOfExperience || ""}
                    onChange={(e) =>
                      updateSkill(index, {
                        ...skill,
                        yearsOfExperience: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                    className="input-field"
                    placeholder="3.5"
                  />
                </div>
              </div>

              {/* Proficiency indicator */}
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proficiency:
                </label>
                <div className="flex items-center space-x-1">
                  {proficiencyLevels.map((level, levelIndex) => {
                    const isActive =
                      proficiencyLevels.findIndex(
                        (l) => l.value === skill.level
                      ) >= levelIndex;
                    return (
                      <div
                        key={level.value}
                        className={`h-2 flex-1 rounded-full transition-colors ${
                          isActive
                            ? level.color.replace("bg-", "bg-").split(" ")[0]
                            : "bg-gray-200"
                        }`}
                        title={level.label}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
