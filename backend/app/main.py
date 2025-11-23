import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .schemas import GenerateRequest, GenerateResponse, Resume
from .ai import generate_text
from .crud import save_resume, fetch_resume
from .db import list_templates

load_dotenv()

app = FastAPI(title="genRes Backend", version="0.1.0")

# Allow local frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv('FRONTEND_ORIGIN', 'http://localhost:5173')],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/templates")
async def get_templates():
    try:
        templates = list_templates()
        return {"templates": templates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate", response_model=GenerateResponse)
async def generate(request: GenerateRequest):
    try:
        text = generate_text(request.prompt, model=request.model, max_tokens=request.max_tokens)
        return {"generated_text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/resumes")
async def create_resume(resume: Resume):
    try:
        data = resume.dict()
        saved = save_resume(data)
        return {"saved": saved}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/resumes/{resume_id}")
async def get_resume_endpoint(resume_id: str):
    try:
        r = fetch_resume(resume_id)
        if not r:
            raise HTTPException(status_code=404, detail="Resume not found")
        return {"resume": r}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
