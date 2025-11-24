import supabase from "./supabaseClient";
import { generateTextHF } from "./hf";

type GenerateRequest = { prompt: string; model?: string; max_tokens?: number };

export async function generateText(payload: GenerateRequest) {
  // Use Hugging Face directly from frontend
  const text = await generateTextHF(
    payload.prompt,
    payload.model || undefined,
    payload.max_tokens || 256
  );
  return { generated_text: text };
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

export default { generateText, saveResume, getTemplates, getResume };
