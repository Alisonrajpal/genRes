const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const HF_API_URL = "https://api-inference.huggingface.co/models";
const USE_MOCK = import.meta.env.VITE_USE_MOCK_HF === "true" || !HF_TOKEN;

if (!HF_TOKEN) {
  console.warn(
    "Hugging Face token not found. Set VITE_HF_TOKEN in frontend/.env to enable generation. Using mock fallback."
  );
}

// Mock function for testing without real HF token
function generateMock(prompt: string, max_tokens: number): string {
  const summaries: { [key: string]: string } = {
    frontend:
      "Experienced Frontend Developer with 5+ years specializing in React, TypeScript, and modern web technologies. Proven track record of delivering scalable, user-centric applications.",
    backend:
      "Full-Stack Backend Engineer proficient in Python, Node.js, and cloud infrastructure. Expertise in designing robust APIs and database architectures.",
    designer:
      "Creative UI/UX Designer with strong visual design principles and user research background. Experienced in Figma and prototyping tools.",
  };
  const keyword = prompt.toLowerCase();
  for (const key in summaries) {
    if (keyword.includes(key)) {
      return summaries[key as keyof typeof summaries].substring(0, max_tokens);
    }
  }
  return "Professional with strong technical background and proven ability to deliver results in a fast-paced environment.";
}

export async function generateTextHF(
  prompt: string,
  model = "gpt2",
  max_tokens = 256
): Promise<string> {
  // Use mock if token not configured or env flag set
  if (USE_MOCK) {
    console.log("Using mock HF response (no real token configured)");
    return generateMock(prompt, max_tokens);
  }

  if (!HF_TOKEN) throw new Error("Hugging Face token not configured");

  const url = `${HF_API_URL}/${model}`;
  const payload = {
    inputs: prompt,
    parameters: { max_new_tokens: max_tokens, return_full_text: false },
    options: { wait_for_model: true },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errorDetail: string;
      try {
        const errData = await res.json();
        errorDetail = JSON.stringify(errData);
      } catch (e) {
        errorDetail = await res.text();
      }
      console.error(`HF API error (${res.status}):`, errorDetail);
      throw new Error(`HF API error (${res.status}): ${errorDetail}`);
    }

    const data = await res.json();
    console.log("HF response:", data);

    if (Array.isArray(data)) {
      const first = data[0];
      if (first && typeof first === "object" && "generated_text" in first) {
        return (first as any).generated_text;
      }
      return String(first);
    }
    if (data && typeof data === "object" && "generated_text" in data) {
      return (data as any).generated_text;
    }
    return String(data);
  } catch (error) {
    console.error("HF fetch error:", error);
    // Fallback to mock on fetch error
    console.log("Falling back to mock response due to fetch error");
    return generateMock(prompt, max_tokens);
  }
}

export default { generateTextHF };
