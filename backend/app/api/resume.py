from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from app.services.parser import parse_resume, is_valid_resume, redact_pii
import hashlib
from app.services.skill_extractor import extract_skills
from app.db.supabase import supabase
from app.models.candidate import CandidateCreate
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/resume", tags=["Resume"])

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    name: str = Form(...),
    education: str = Form(...),
    experience: int = Form(...),
    certifications: str = Form("") # comma separated
):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")

    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")

    content = await file.read()
    resume_text = parse_resume(content, file.filename)
    
    if not resume_text:
        raise HTTPException(status_code=400, detail="Could not extract text from resume")

    file_hash = hashlib.sha256(content).hexdigest()
    
    # Deduplication check by name (since file_hash is missing from schema)
    existing = supabase.table("candidates").select("id").eq("name", name).execute()
    if existing.data and len(existing.data) > 0:
        raise HTTPException(status_code=409, detail=f"A candidate named '{name}' has already been uploaded.")

    # Validation check
    if not is_valid_resume(resume_text):
        raise HTTPException(status_code=400, detail="Document does not appear to be a valid resume.")

    # Redaction (De-biasing)
    resume_text = redact_pii(resume_text)

    skills = extract_skills(resume_text)
    certs_list = [c.strip() for c in certifications.split(",")] if certifications else []

    candidate_data = {
        "name": name,
        "education": education,
        "experience": experience,
        "skills": skills,
        "certifications": certs_list,
        "resume_text": resume_text
    }

    try:
        response = supabase.table("candidates").insert(candidate_data).execute()
        if len(response.data) > 0:
            return {"message": "Resume uploaded and processed successfully", "candidate": response.data[0]}
        else:
            raise HTTPException(status_code=500, detail="Failed to insert candidate")
    except Exception as e:
        logger.error(f"Error uploading resume: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
