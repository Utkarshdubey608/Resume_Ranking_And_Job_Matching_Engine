from fastapi import APIRouter, HTTPException
from app.db.supabase import supabase
from app.services.analytics_engine import generate_top_skills_chart, generate_education_distribution, generate_experience_distribution

router = APIRouter(prefix="/analytics", tags=["Analytics"])

def get_all_candidates():
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    try:
        res = supabase.table("candidates").select("*").execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/top-skills")
async def top_skills():
    cands = get_all_candidates()
    base64_img = generate_top_skills_chart(cands)
    return {"image": base64_img}

@router.get("/education")
async def education_dist():
    cands = get_all_candidates()
    base64_img = generate_education_distribution(cands)
    return {"image": base64_img}

@router.get("/experience")
async def experience_dist():
    cands = get_all_candidates()
    base64_img = generate_experience_distribution(cands)
    return {"image": base64_img}
