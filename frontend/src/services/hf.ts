const HF_TOKEN = (import.meta as any).env.VITE_HF_TOKEN;
const HF_API_URL = "https://api-inference.huggingface.co/models";
const USE_MOCK =
  (import.meta as any).env.VITE_USE_MOCK_HF === "true" || !HF_TOKEN;

console.log("[HF Service] Token configured:", !!HF_TOKEN);
console.log("[HF Service] Using mock mode:", USE_MOCK);

if (!HF_TOKEN) {
  console.warn(
    "Hugging Face token not found. Set VITE_HF_TOKEN in frontend/.env to enable generation. Using mock fallback."
  );
}

// Enhanced mock function for testing without real HF token
function generateMock(prompt: string, max_tokens: number): string {
  console.log(
    "[HF Service] Generating mock response for prompt:",
    prompt.substring(0, 50)
  );

  // More comprehensive mock responses
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("summary")) {
    return "Driven software professional with 5+ years of experience in full-stack development, cloud technologies, and team leadership. Proven ability to design and implement scalable solutions that increase operational efficiency by 40%. Strong expertise in modern frameworks, agile methodologies, and cross-functional collaboration.";
  }
  if (lowerPrompt.includes("bullet") || lowerPrompt.includes("point")) {
    return "• Led development of microservices architecture serving 100K+ daily users with 99.9% uptime\n• Implemented CI/CD pipelines reducing deployment time by 60%\n• Mentored team of 5 junior developers, improving code quality by 35%";
  }
  if (lowerPrompt.includes("skill")) {
    return "JavaScript: Advanced, Python: Advanced, React: Expert, AWS: Intermediate, Docker: Intermediate, Leadership: Advanced, Problem Solving: Expert";
  }

  return "Dedicated professional with strong technical background and proven track record of delivering high-impact solutions. Experienced in collaborating with cross-functional teams to achieve business objectives and drive innovation.";
}

export async function generateTextHF(
  prompt: string,
  model = "mistralai/Mistral-7B-Instruct-v0.2",
  max_tokens = 256
): Promise<string> {
  console.log("[HF Service] generateTextHF called with model:", model);

  // Use mock if token not configured or env flag set
  if (USE_MOCK) {
    console.log("[HF Service] Using mock mode");
    return generateMock(prompt, max_tokens);
  }

  if (!HF_TOKEN) {
    console.error("[HF Service] No HF token available");
    throw new Error("Hugging Face token not configured");
  }

  const url = `${HF_API_URL}/${model}`;
  console.log("[HF Service] Calling HF API at:", url);

  const payload = {
    inputs: prompt,
    parameters: {
      max_new_tokens: max_tokens,
      return_full_text: false,
    },
    options: { wait_for_model: true },
  };

  try {
    console.log("[HF Service] Sending request with payload:", {
      model,
      max_tokens,
      promptLength: prompt.length,
    });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("[HF Service] Response status:", res.status);

    if (!res.ok) {
      let errorDetail: string;
      try {
        const errData = await res.json();
        errorDetail = JSON.stringify(errData);
      } catch (e) {
        errorDetail = await res.text();
      }
      console.error(`[HF Service] API error (${res.status}):`, errorDetail);
      throw new Error(`HF API error (${res.status}): ${errorDetail}`);
    }

    const data = await res.json();
    console.log("[HF Service] Raw response data:", data);

    // Handle array response
    if (Array.isArray(data)) {
      const first = data[0];
      if (first && typeof first === "object" && "generated_text" in first) {
        const text = (first as any).generated_text;
        console.log(
          "[HF Service] Extracted generated_text from array:",
          text.substring(0, 50)
        );
        return text;
      }
      const result = String(first);
      console.log(
        "[HF Service] Stringified first array element:",
        result.substring(0, 50)
      );
      return result;
    }

    // Handle object response
    if (data && typeof data === "object" && "generated_text" in data) {
      const text = (data as any).generated_text;
      console.log(
        "[HF Service] Extracted generated_text from object:",
        text.substring(0, 50)
      );
      return text;
    }

    const result = String(data);
    console.log(
      "[HF Service] Stringified entire response:",
      result.substring(0, 50)
    );
    return result;
  } catch (error) {
    console.error("[HF Service] Fetch error:", error);
    // Fallback to mock on fetch error
    console.log(
      "[HF Service] Falling back to mock response due to fetch error"
    );
    return generateMock(prompt, max_tokens);
  }
}

export default { generateTextHF };
