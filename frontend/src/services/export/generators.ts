import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ResumeData, Template } from "../../types/resume";

export const exportToPdf = async (
  element: HTMLElement,
  filename: string
): Promise<void> => {
  const canvas = await html2canvas(element, {
    // html2canvas typings can be strict; cast to any to allow additional options
    ...({
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    } as any),
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 295; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
};

export const exportToDocx = async (
  resumeData: ResumeData,
  filename: string
): Promise<void> => {
  // Simple DOCX export implementation
  // In a real app, you might use a library like docx.js
  const content = generateDocxContent(resumeData);
  const blob = new Blob([content], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToHtml = async (
  resumeData: ResumeData,
  template: Template,
  filename: string
): Promise<void> => {
  const htmlContent = generateHtmlContent(resumeData, template);
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const generateDocxContent = (resumeData: ResumeData): string => {
  // Simple implementation - in real app use proper DOCX generation
  return `
    Resume for ${resumeData.personalInfo.firstName} ${
    resumeData.personalInfo.lastName
  }
    Email: ${resumeData.personalInfo.email}
    Phone: ${resumeData.personalInfo.phone}
    
    PROFESSIONAL SUMMARY
    ${resumeData.personalInfo.summary || ""}
    
    WORK EXPERIENCE
    ${resumeData.workExperience
      .map(
        (exp) => `
      ${exp.position} at ${exp.company}
      ${exp.startDate} - ${exp.currentlyWorking ? "Present" : exp.endDate}
      ${exp.description}
    `
      )
      .join("\n")}
    
    EDUCATION
    ${resumeData.education
      .map(
        (edu) => `
      ${edu.degree} in ${edu.fieldOfStudy}
      ${edu.institution}
      ${edu.startDate} - ${edu.currentlyStudying ? "Present" : edu.endDate}
    `
      )
      .join("\n")}
  `;
};

const generateHtmlContent = (
  resumeData: ResumeData,
  template: Template
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Resume - ${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}</h1>
        <p>${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.address}</p>
      </div>
      <!-- Add more resume content here -->
    </body>
    </html>
  `;
};
