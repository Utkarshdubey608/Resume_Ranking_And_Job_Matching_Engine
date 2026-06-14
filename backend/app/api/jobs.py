from fastapi import APIRouter, HTTPException
from app.db.supabase import supabase
from app.models.job import JobCreate
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.post("")
async def create_job(job: JobCreate):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    
    try:
        response = supabase.table("jobs").insert(job.model_dump()).execute()
        if response.data:
            return response.data[0]
        raise HTTPException(status_code=500, detail="Failed to insert job")
    except Exception as e:
        logger.error(f"Error creating job: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("")
async def get_jobs():
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        response = supabase.table("jobs").select("*").execute()
        return response.data
    except Exception as e:
        logger.error(f"Error fetching jobs: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{id}")
async def get_job(id: str):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        response = supabase.table("jobs").select("*").eq("id", id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Job not found")
        return response.data[0]
    except Exception as e:
        logger.error(f"Error fetching job {id}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
