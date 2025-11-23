export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn?: string;
  portfolio?: string;
  summary?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
  currentlyStudying: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: string;
  yearsOfExperience?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  url?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  url?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  preview: string;
}

export interface AISuggestion {
  section: string;
  original: string;
  suggestion: string;
  reason: string;
  confidence: number;
}
