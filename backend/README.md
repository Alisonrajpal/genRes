Backend for genRes — FastAPI + Supabase + Hugging Face

Quick start

1. Copy `.env.example` to `.env` and fill in your keys:

   - `SUPABASE_URL` and `SUPABASE_KEY` (service role key if you need server-side access)
   - `HUGGINGFACE_API_TOKEN` (for Hugging Face Inference API)
   - optional `DEFAULT_HF_MODEL` (e.g. `gpt2`, `facebook/opt-1.3b`)

2. Create a Python environment and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

3. Run development server:

```bash
uvicorn app.main:app --reload --port 8000
```

Endpoints

- GET `/health` — health check
- GET `/templates` — list templates (reads from a `templates` table in Supabase)
- POST `/generate` — { prompt, model?, max_tokens? } -> calls Hugging Face Inference API
- POST `/resumes` — save resume JSON to Supabase `resumes` table
- GET `/resumes/{id}` — fetch saved resume

Supabase setup notes

- Create tables `resumes` and (optionally) `templates` with appropriate schemas in your Supabase project.
- Use a service role key for full DB privileges from the server; do not expose this key in the browser.

Hugging Face notes

- The app uses the Hugging Face Inference API. Some models are large and may be rate-limited.
- Set `DEFAULT_HF_MODEL` in `.env` to choose a default model.

Security

- Keep `SUPABASE_KEY` and `HUGGINGFACE_API_TOKEN` secret.
- For production, run the app behind a secure server and limit origins in CORS.

Docker

- Build: `docker build -t genres-backend ./backend`
- Run: `docker run -p 8000:8000 --env-file ./backend/.env genres-backend`
