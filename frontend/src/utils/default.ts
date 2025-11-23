import {
  ResumeData,
  Template,
  Education,
  WorkExperience,
  Skill,
  Project,
  Certification,
  PersonalInfo,
} from "../types/resume";

export const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    linkedIn: "",
    portfolio: "",
    summary: "Experienced professional seeking new opportunities...",
  },
  education: [],
  workExperience: [],
  skills: [],
  projects: [],
  certifications: [],
};

export const defaultTemplate: Template = {
  id: "modern",
  name: "Modern",
  description: "Clean and professional design with modern typography",
  category: "Professional",
  color: "blue",
  preview: "modern-preview",
};

export const defaultEducation: Education = {
  id: "",
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  description: "",
  currentlyStudying: false,
};

export const defaultWorkExperience: WorkExperience = {
  id: "",
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
  achievements: [],
  currentlyWorking: false,
};

export const defaultSkill: Skill = {
  id: "",
  name: "",
  level: "Intermediate",
  category: "Technical",
};
