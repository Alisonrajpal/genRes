import React from "react";
import { Check, LayoutTemplate, Eye } from "lucide-react";
import { Template } from "../../types/resume";

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onTemplateSelect: (template: Template) => void;
}

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional design with modern typography",
    category: "Professional",
    color: "blue",
    preview: "modern-preview",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional resume format trusted by recruiters",
    category: "Traditional",
    color: "green",
    preview: "classic-preview",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Modern design with creative elements for design roles",
    category: "Creative",
    color: "purple",
    preview: "creative-preview",
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect,
}) => {
  const getTemplateColor = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    switch (template?.color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTemplateBorderColor = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    switch (template?.color) {
      case "blue":
        return "border-blue-500 ring-blue-100";
      case "green":
        return "border-green-500 ring-green-100";
      case "purple":
        return "border-purple-500 ring-purple-100";
      default:
        return "border-gray-500 ring-gray-100";
    }
  };

  return (
    <div className="card p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <LayoutTemplate className="h-5 w-5 mr-2 text-blue-600" />
        Choose a Template
      </h2>
      <p className="text-gray-600 mb-6">
        Select from our ATS-friendly templates optimized for different
        industries
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate.id === template.id
                ? `${getTemplateBorderColor(template.id)} ring-2`
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onTemplateSelect(template)}>
            {/* Template Preview */}
            <div
              className={`h-32 rounded-t-lg ${getTemplateColor(
                template.id
              )} flex items-center justify-center relative`}>
              <span className="text-white font-semibold text-lg">
                {template.name}
              </span>
              <div className="absolute top-2 right-2">
                <Eye className="h-4 w-4 text-white opacity-75" />
              </div>
            </div>

            {/* Template Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                {selectedTemplate.id === template.id && (
                  <Check className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {template.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                  {template.category}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    template.color === "blue"
                      ? "bg-blue-100 text-blue-800"
                      : template.color === "green"
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                  }`}>
                  ATS Friendly
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Features */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">
          All templates include:
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2" />
            ATS (Applicant Tracking System) optimized layout
          </li>
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Industry-standard sections and formatting
          </li>
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Mobile-responsive design
          </li>
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Professional typography and spacing
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TemplateSelector;
