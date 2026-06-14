from fastapi import APIRouter, HTTPException
from app.db.supabase import supabase
from app.services.ranking_engine import rank_candidates
import uuid

router = APIRouter(tags=["Ranking"])

@router.post("/rank/{job_id}")
async def create_ranking(job_id: str):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    
    # Get job details
    job_res = supabase.table("jobs").select("*").eq("id", job_id).execute()
    if not job_res.data:
        raise HTTPException(status_code=404, detail="Job not found")
    job = job_res.data[0]
    
    # Get all candidates
    cands_res = supabase.table("candidates").select("*").execute()
    candidates = cands_res.data
    
    # Rank candidates
    ranked_candidates = rank_candidates(candidates, job)
    
    # Save rankings to database
    rankings_to_insert = []
    for cand in ranked_candidates:
        rankings_to_insert.append({
            "candidate_id": cand['id'],
            "job_id": job_id,
            "score": cand['score'],
            "rank": cand['rank']
        })
        
    try:
        # We can clear existing rankings for this job_id, but for hackathon keep it simple and just insert or we can delete first
        supabase.table("rankings").delete().eq("job_id", job_id).execute()
        response = supabase.table("rankings").insert(rankings_to_insert).execute()
        return {"message": f"Successfully ranked {len(candidates)} candidates for job {job_id}", "rankings": ranked_candidates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/rankings/{job_id}")
async def get_rankings(job_id: str):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        # Join rankings with candidates
        response = supabase.table("rankings").select("*, candidates(*)").eq("job_id", job_id).order("rank").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
