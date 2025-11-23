import os
import requests
from dotenv import load_dotenv

load_dotenv()
HUGGINGFACE_API_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")
DEFAULT_MODEL = os.getenv("DEFAULT_HF_MODEL", "gpt2")

if not HUGGINGFACE_API_TOKEN:
    # We don't necessarily throw here; allow routes to return a helpful error
    HUGGINGFACE_API_TOKEN = None

HF_API_URL = "https://api-inference.huggingface.co/models"


def generate_text(prompt: str, model: str = None, max_tokens: int = 256) -> str:
    model = model or DEFAULT_MODEL
    if not HUGGINGFACE_API_TOKEN:
        raise RuntimeError("HUGGINGFACE_API_TOKEN is not set")

    url = f"{HF_API_URL}/{model}"
    headers = {"Authorization": f"Bearer {HUGGINGFACE_API_TOKEN}"}
    payload = {
        "inputs": prompt,
        "parameters": {"max_new_tokens": max_tokens, "return_full_text": False},
        "options": {"wait_for_model": True},
    }

    resp = requests.post(url, headers=headers, json=payload, timeout=60)
    if resp.status_code != 200:
        try:
            data = resp.json()
            message = data.get('error') or data
        except Exception:
            message = resp.text
        raise RuntimeError(f"Hugging Face inference error: {message}")

    data = resp.json()
    # Response format varies by model; commonly it's a dict or list of dicts
    if isinstance(data, dict) and 'error' in data:
        raise RuntimeError(data['error'])
    if isinstance(data, list):
        # many models return list of generations
        first = data[0]
        if isinstance(first, dict) and 'generated_text' in first:
            return first['generated_text']
        # other models return plain text in first element
        return str(first)
    if isinstance(data, dict) and 'generated_text' in data:
        return data['generated_text']

    # Fallback: try to stringify
    return str(data)
