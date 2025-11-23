import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Eye } from "lucide-react";

const Templates: React.FC = () => {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and professional design with modern typography",
      category: "Professional",
      color: "blue",
      bestFor: ["Tech Industry", "Corporate Jobs", "Recent Graduates"],
      features: ["ATS Optimized", "Clean Layout", "Professional Typography"],
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional resume format trusted by recruiters",
      category: "Traditional",
      color: "green",
      bestFor: ["Finance", "Legal", "Executive Roles"],
      features: ["Time-Tested", "Formal Structure", "Recruiter Favorite"],
    },
    {
      id: "creative",
      name: "Creative",
      description: "Modern design with creative elements for visual roles",
      category: "Creative",
      color: "purple",
      bestFor: ["Designers", "Marketing", "Creative Roles"],
      features: ["Visual Appeal", "Modern Design", "Portfolio Integration"],
    },
  ];

  const getTemplateColor = (color: string) => {
    switch (color) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resume Templates
          </h1>
          <p className="text-lg text-gray-600">
            Choose from our collection of ATS-friendly templates designed for
            different industries and career levels
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Template Preview */}
              <div
                className={`h-48 ${getTemplateColor(
                  template.color
                )} flex items-center justify-center relative`}>
                <span className="text-white font-bold text-2xl">
                  {template.name}
                </span>
                <div className="absolute top-4 right-4">
                  <Eye className="h-5 w-5 text-white opacity-75" />
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded mt-1">
                      {template.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{template.description}</p>

                {/* Best For */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Best For:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {template.bestFor.map((industry, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Features:
                  </h4>
                  <ul className="space-y-1">
                    {template.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <Link
                  to="/builder"
                  state={{ template: template.id }}
                  className="w-full btn-primary justify-center">
                  Use This Template
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Template Selection Guide */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Choose the Right Template
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Consider Your Industry
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Traditional Industries</strong> (Finance, Law): Use
                    Classic template
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Tech & Startups</strong>: Modern template works best
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Creative Fields</strong>: Choose a layout that
                    highlights portfolio links and visual samples
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ATS Compatibility
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>All templates are ATS-optimized</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Clean, readable fonts and structure</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Proper section headings and formatting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
