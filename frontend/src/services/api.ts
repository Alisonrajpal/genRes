import supabase from "./supabaseClient";
import { generateTextHF } from "./hf";

type GenerateRequest = { prompt: string; model?: string; max_tokens?: number };
type ATSScoreResponse = {
  score: number;
  feedback: string[];
  keyword_match: number;
  total_keywords: number;
};

export async function generateText(payload: GenerateRequest) {
  // Use Hugging Face directly from frontend
  const text = await generateTextHF(
    payload.prompt,
    payload.model || undefined,
    payload.max_tokens || 256
  );
  return { generated_text: text };
}

export async function checkATSScore(
  resumeText: string
): Promise<ATSScoreResponse> {
  // Frontend-only ATS scoring (no backend required)
  const atsKeywords = [
    "skills",
    "experience",
    "education",
    "employment",
    "work history",
    "technical skills",
    "certifications",
    "awards",
    "projects",
    "responsibilities",
    "achievements",
  ];

  const resumeLower = resumeText.toLowerCase();
  let score = 50; // Base score

  // Add points for keyword presence
  const keywordCount = atsKeywords.filter((kw) =>
    resumeLower.includes(kw)
  ).length;
  score += (keywordCount / atsKeywords.length) * 30;

  // Check for structured sections
  const sections = ["education", "experience", "skills", "certification"];
  const sectionCount = sections.filter((sec) =>
    resumeLower.includes(sec)
  ).length;
  score += (sectionCount / sections.length) * 15;

  // Check readability (word count)
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount >= 300 && wordCount <= 1000) {
    score += 5;
  }

  // Cap score at 100
  score = Math.min(100, Math.max(0, score));

  // Generate feedback
  const feedback: string[] = [];
  if (keywordCount < atsKeywords.length / 2) {
    feedback.push(
      "Consider including more standard ATS keywords like 'skills', 'experience', 'education'"
    );
  }
  if (sectionCount < 3) {
    feedback.push(
      "Consider organizing resume into standard sections (Education, Experience, Skills)"
    );
  }
  if (wordCount < 300) {
    feedback.push("Resume seems short; consider adding more details");
  } else if (wordCount > 1000) {
    feedback.push(
      "Resume is lengthy; consider condensing to improve readability"
    );
  }

  return {
    score: Math.round(score * 10) / 10,
    feedback,
    keyword_match: keywordCount,
    total_keywords: atsKeywords.length,
  };
}

export async function saveResume(resumeData: any) {
  // Insert into Supabase 'resumes' table
  const { data, error } = await supabase.from("resumes").insert([resumeData]);
  if (error) throw error;
  return data;
}

export async function getTemplates() {
  const { data, error } = await supabase.from("templates").select("*");
  if (error) throw error;
  return { templates: data };
}

export async function getResume(id: string) {
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return { resume: data };
}

export default {
  generateText,
  checkATSScore,
  saveResume,
  getTemplates,
  getResume,
};
