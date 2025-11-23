const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:8000";

type GenerateRequest = { prompt: string; model?: string; max_tokens?: number };

export async function generateText(payload: GenerateRequest) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Generation failed");
  }
  return res.json();
}

export async function saveResume(resumeData: any) {
  const res = await fetch(`${API_BASE}/resumes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resumeData),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Save resume failed");
  }
  return res.json();
}

export async function getTemplates() {
  const res = await fetch(`${API_BASE}/templates`);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to load templates");
  }
  return res.json();
}

export async function getResume(id: string) {
  const res = await fetch(`${API_BASE}/resumes/${encodeURIComponent(id)}`);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to load resume");
  }
  return res.json();
}

export default { generateText, saveResume, getTemplates, getResume };
