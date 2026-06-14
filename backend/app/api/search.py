from fastapi import APIRouter, HTTPException, Query
from app.db.supabase import supabase
from app.services.search_engine import search_candidates
from app.services.matcher import match_candidate_to_job
from typing import Optional

router = APIRouter(tags=["Search & Match"])

@router.get("/search")
async def search(
    skill: Optional[str] = None,
    min_exp: Optional[int] = None,
    education: Optional[str] = None
):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        res = supabase.table("candidates").select("*").execute()
        candidates = res.data
        
        filtered = search_candidates(candidates, skill=skill, min_exp=min_exp, education=education)
        return filtered
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/match/{candidate_id}/{job_id}")
async def get_match_percentage(candidate_id: str, job_id: str):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        cand_res = supabase.table("candidates").select("*").eq("id", candidate_id).execute()
        if not cand_res.data:
            raise HTTPException(status_code=404, detail="Candidate not found")
        cand = cand_res.data[0]
        
        job_res = supabase.table("jobs").select("*").eq("id", job_id).execute()
        if not job_res.data:
            raise HTTPException(status_code=404, detail="Job not found")
        job = job_res.data[0]
        
        match_result = match_candidate_to_job(cand, job)
        
        return match_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
