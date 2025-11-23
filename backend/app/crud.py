from typing import Dict, Any, Optional
from .db import insert_resume, get_resume


def save_resume(resume: Dict[str, Any]) -> Dict[str, Any]:
    resp = insert_resume(resume)
    if resp.error:
        raise RuntimeError(resp.error.message if hasattr(resp.error, 'message') else str(resp.error))
    # Return created record(s)
    return resp.data


def fetch_resume(resume_id: str) -> Optional[Dict[str, Any]]:
    resp = get_resume(resume_id)
    if resp.error:
        return None
    return resp.data
