import React from "react";
import { Plus, Trash2, GraduationCap, Calendar } from "lucide-react";
import { Education } from "../../types/resume";
import { generateId } from "../../utils/helpers";
import { defaultEducation } from "../../utils/default";

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onChange,
}) => {
  const addEducation = () => {
    onChange([...education, { ...defaultEducation, id: generateId() }]);
  };

  const updateEducation = (index: number, updatedEducation: Education) => {
    const newEducation = [...education];
    newEducation[index] = updatedEducation;
    onChange(newEducation);
  };

  const removeEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    onChange(newEducation);
  };

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
          Education
        </h2>
        <button onClick={addEducation} className="btn-primary">
          <Plus className="h-4 w-4 mr-1" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet. Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-900">
                  Education #{index + 1}
                </h3>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(index, {
                        ...edu,
                        institution: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="University of Example"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(index, { ...edu, degree: e.target.value })
                    }
                    className="input-field"
                    placeholder="Bachelor of Science"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study *
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) =>
                      updateEducation(index, {
                        ...edu,
                        fieldOfStudy: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="Computer Science"
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
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(index, {
                        ...edu,
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
                    {edu.currentlyStudying ? "Expected End Date" : "End Date *"}
                  </label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(index, {
                        ...edu,
                        endDate: e.target.value,
                      })
                    }
                    className="input-field"
                    disabled={edu.currentlyStudying}
                    required={!edu.currentlyStudying}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`currently-studying-${index}`}
                    checked={edu.currentlyStudying}
                    onChange={(e) =>
                      updateEducation(index, {
                        ...edu,
                        currentlyStudying: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`currently-studying-${index}`}
                    className="ml-2 text-sm text-gray-700">
                    Currently studying here
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA
                  </label>
                  <input
                    type="text"
                    value={edu.gpa || ""}
                    onChange={(e) =>
                      updateEducation(index, { ...edu, gpa: e.target.value })
                    }
                    className="input-field"
                    placeholder="3.8/4.0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={edu.description}
                    onChange={(e) =>
                      updateEducation(index, {
                        ...edu,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="input-field"
                    placeholder="Relevant coursework, achievements, or activities..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
