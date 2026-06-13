from fastapi import APIRouter, HTTPException
from app.db.supabase import supabase
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/candidates", tags=["Candidates"])

@router.get("")
async def get_candidates():
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        response = supabase.table("candidates").select("*").execute()
        return response.data
    except Exception as e:
        logger.error(f"Error fetching candidates: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{id}")
async def get_candidate(id: str):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        response = supabase.table("candidates").select("*").eq("id", id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Candidate not found")
        return response.data[0]
    except Exception as e:
        logger.error(f"Error fetching candidate {id}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
