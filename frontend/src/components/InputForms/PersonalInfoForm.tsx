import React from "react";
import { User, Mail, Phone, MapPin, Link2, Edit } from "lucide-react";
import { PersonalInfo } from "../../types/resume";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
}) => {
  const handleChange =
    (field: keyof PersonalInfo) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({
        ...data,
        [field]: event.target.value,
      });
    };

  return (
    <div className="card p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <User className="h-5 w-5 mr-2 text-blue-600" />
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={handleChange("firstName")}
            className="input-field"
            placeholder="John"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={handleChange("lastName")}
            className="input-field"
            placeholder="Doe"
            required
          />
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Mail className="h-4 w-4 mr-1 text-gray-500" />
            Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={handleChange("email")}
            className="input-field"
            placeholder="john.doe@example.com"
            required
          />
        </div>

        {/* Phone */}
        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Phone className="h-4 w-4 mr-1 text-gray-500" />
            Phone *
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={handleChange("phone")}
            className="input-field"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
            Address
          </label>
          <input
            type="text"
            value={data.address}
            onChange={handleChange("address")}
            className="input-field"
            placeholder="New York, NY"
          />
        </div>

        {/* LinkedIn */}
        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Link2 className="h-4 w-4 mr-1 text-gray-500" />
            LinkedIn URL
          </label>
          <input
            type="url"
            value={data.linkedIn || ""}
            onChange={handleChange("linkedIn")}
            className="input-field"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        {/* Portfolio */}
        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Link2 className="h-4 w-4 mr-1 text-gray-500" />
            Portfolio URL
          </label>
          <input
            type="url"
            value={data.portfolio || ""}
            onChange={handleChange("portfolio")}
            className="input-field"
            placeholder="https://johndoe.com"
          />
        </div>

        {/* Professional Summary */}
        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Edit className="h-4 w-4 mr-1 text-gray-500" />
            Professional Summary
          </label>
          <textarea
            value={data.summary || ""}
            onChange={handleChange("summary")}
            rows={4}
            className="input-field"
            placeholder="Experienced professional with expertise in..."
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
