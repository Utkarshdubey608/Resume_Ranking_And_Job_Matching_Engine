import pytest
from app.services.skill_extractor import extract_skills
from app.services.ranking_engine import calculate_score, rank_candidates
from app.services.search_engine import binary_search_experience, build_skill_hash_map, search_candidates
from app.services.matcher import match_candidate_to_job

def test_extract_skills():
    text = "I have experience with Python, React, and MongoDB."
    skills = extract_skills(text)
    assert "python" in skills
    assert "react" in skills
    assert "mongodb" in skills
    assert "java" not in skills

def test_calculate_score():
    score = calculate_score(
        candidate_skills=["python", "react"],
        job_skills=["python", "react", "sql"],
        candidate_exp=3,
        job_exp=2,
        candidate_edu="B.Tech",
        job_edu="B.Tech"
    )
    # Skill match: 2/3 * 70 = 46.66
    # Exp match: 3 >= 2 -> 20.0
    # Edu match: B.Tech -> 10.0
    # Total: ~76.67
    assert 76.0 <= score <= 77.0

def test_binary_search_experience():
    candidates = [
        {"id": 1, "experience": 1},
        {"id": 2, "experience": 2},
        {"id": 3, "experience": 3},
        {"id": 4, "experience": 5},
    ]
    res = binary_search_experience(candidates, 3)
    assert len(res) == 2
    assert res[0]["id"] == 3

def test_search_candidates():
    candidates = [
        {"id": 1, "experience": 1, "skills": ["python"], "education": "BS"},
        {"id": 2, "experience": 4, "skills": ["java"], "education": "MS"},
        {"id": 3, "experience": 5, "skills": ["python", "react"], "education": "MS"},
    ]
    res = search_candidates(candidates, skill="python", min_exp=3)
    assert len(res) == 1
    assert res[0]["id"] == 3

def test_match_candidate_to_job():
    res = match_candidate_to_job(
        candidate_skills=["python", "react"],
        job_skills=["python", "java"]
    )
    assert "python" in res["matching_skills"]
    assert "java" in res["missing_skills"]
    assert res["match_percentage"] > 0
