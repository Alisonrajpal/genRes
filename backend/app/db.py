import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_KEY must be set in env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Utility helpers
def insert_resume(resume: dict):
    return supabase.table('resumes').insert(resume).execute()

def get_resume(resume_id: str):
    resp = supabase.table('resumes').select('*').eq('id', resume_id).single().execute()
    return resp

def list_templates():
    # expects a table 'templates' in Supabase; fallback to empty list if missing
    resp = supabase.table('templates').select('*').execute()
    if resp.error:
        return []
    return resp.data
