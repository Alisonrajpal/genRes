import { ResumeData } from "../types/resume";

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
};

export const formatDate = (date: string): string => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export const calculateDuration = (
  startDate: string,
  endDate: string,
  currentlyWorking: boolean = false
): string => {
  const start = new Date(startDate);
  const end = currentlyWorking ? new Date() : new Date(endDate);

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${
      remainingMonths !== 1 ? "s" : ""
    }`;
  }
};

export const exportToJson = (
  data: ResumeData,
  filename: string = "resume.json"
) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(dataBlob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importFromJson = (file: File): Promise<ResumeData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(new Error("Invalid JSON file"));
      }
    };

    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
};
