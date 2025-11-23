import React from "react";
import { Plus, Trash2, Briefcase, Calendar, MapPin } from "lucide-react";
import { WorkExperience } from "../../types/resume";
import { generateId } from "../../utils/helpers";
import { defaultWorkExperience } from "../../utils/default";

interface WorkExperienceFormProps {
  workExperience: WorkExperience[];
  onChange: (workExperience: WorkExperience[]) => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  workExperience,
  onChange,
}) => {
  const addWorkExperience = () => {
    onChange([
      ...workExperience,
      { ...defaultWorkExperience, id: generateId() },
    ]);
  };

  const updateWorkExperience = (
    index: number,
    updatedExperience: WorkExperience
  ) => {
    const newExperience = [...workExperience];
    newExperience[index] = updatedExperience;
    onChange(newExperience);
  };

  const removeWorkExperience = (index: number) => {
    const newExperience = workExperience.filter((_, i) => i !== index);
    onChange(newExperience);
  };

  const addAchievement = (index: number) => {
    const experience = workExperience[index];
    const newAchievements = [...experience.achievements, ""];
    updateWorkExperience(index, {
      ...experience,
      achievements: newAchievements,
    });
  };

  const updateAchievement = (
    expIndex: number,
    achievementIndex: number,
    value: string
  ) => {
    const experience = workExperience[expIndex];
    const newAchievements = [...experience.achievements];
    newAchievements[achievementIndex] = value;
    updateWorkExperience(expIndex, {
      ...experience,
      achievements: newAchievements,
    });
  };

  const removeAchievement = (expIndex: number, achievementIndex: number) => {
    const experience = workExperience[expIndex];
    const newAchievements = experience.achievements.filter(
      (_, i) => i !== achievementIndex
    );
    updateWorkExperience(expIndex, {
      ...experience,
      achievements: newAchievements,
    });
  };

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
          Work Experience
        </h2>
        <button onClick={addWorkExperience} className="btn-primary">
          <Plus className="h-4 w-4 mr-1" />
          Add Experience
        </button>
      </div>

      {workExperience.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>
            No work experience added yet. Click "Add Experience" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {workExperience.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-gray-900">
                  Experience #{index + 1}
                </h3>
                <button
                  onClick={() => removeWorkExperience(index)}
                  className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      updateWorkExperience(index, {
                        ...exp,
                        company: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="Google Inc."
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position *
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) =>
                      updateWorkExperience(index, {
                        ...exp,
                        position: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="Senior Software Engineer"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    Start Date *
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateWorkExperience(index, {
                        ...exp,
                        startDate: e.target.value,
                      })
                    }
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    {exp.currentlyWorking ? "Present" : "End Date *"}
                  </label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateWorkExperience(index, {
                        ...exp,
                        endDate: e.target.value,
                      })
                    }
                    className="input-field"
                    disabled={exp.currentlyWorking}
                    required={!exp.currentlyWorking}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`currently-working-${index}`}
                    checked={exp.currentlyWorking}
                    onChange={(e) =>
                      updateWorkExperience(index, {
                        ...exp,
                        currentlyWorking: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`currently-working-${index}`}
                    className="ml-2 text-sm text-gray-700">
                    I currently work here
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location || ""}
                    onChange={(e) =>
                      updateWorkExperience(index, {
                        ...exp,
                        location: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateWorkExperience(index, {
                      ...exp,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="input-field"
                  placeholder="Describe your responsibilities and role..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Key Achievements
                  </label>
                  <button
                    type="button"
                    onClick={() => addAchievement(index)}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Achievement
                  </button>
                </div>

                {exp.achievements.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">
                    No achievements added yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className="flex items-center gap-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) =>
                            updateAchievement(
                              index,
                              achievementIndex,
                              e.target.value
                            )
                          }
                          className="input-field flex-1"
                          placeholder="Increased performance by 30% through optimization..."
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeAchievement(index, achievementIndex)
                          }
                          className="text-red-600 hover:text-red-800 p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperienceForm;
