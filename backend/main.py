from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Resume Ranking & Job Matching API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api import resume, candidates, jobs, ranking, search, analytics
app.include_router(resume.router)
app.include_router(candidates.router)
app.include_router(jobs.router)
app.include_router(ranking.router)
app.include_router(search.router)
app.include_router(analytics.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Resume Ranking & Job Matching API"}
