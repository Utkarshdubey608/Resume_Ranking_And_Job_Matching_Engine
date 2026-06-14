def calculate_score(candidate_skills: list[str], job_skills: list[str], 
                    candidate_exp: int, job_exp: int, 
                    candidate_edu: str, job_edu: str) -> float:
    """
    Calculate ranking score based on:
    - Skill Match = 70%
    - Experience = 20%
    - Education = 10%
    """
    # 1. Skill Match (70%)
    if not job_skills:
        skill_score = 70.0
    else:
        # Case insensitive match
        cand_skills_set = set([s.lower() for s in candidate_skills])
        job_skills_set = set([s.lower() for s in job_skills])
        match_count = len(cand_skills_set.intersection(job_skills_set))
        skill_score = (match_count / len(job_skills_set)) * 70.0

    # 2. Experience Match (20%)
    # Give full 20 points if candidate exp >= job exp, else proportional
    if job_exp <= 0:
        exp_score = 20.0
    else:
        if candidate_exp >= job_exp:
            exp_score = 20.0
        else:
            exp_score = (candidate_exp / job_exp) * 20.0

    # 3. Education Match (10%)
    # Simple binary match for now. If required education is in candidate's education text
    edu_score = 0.0
    if not job_edu:
        edu_score = 10.0
    elif job_edu.lower() in candidate_edu.lower():
        edu_score = 10.0
    else:
        # Partial points if there's some text but maybe not exact match
        edu_score = 5.0 

    total_score = skill_score + exp_score + edu_score
    return round(total_score, 2)

def rank_candidates(candidates: list[dict], job: dict) -> list[dict]:
    """
    Rank a list of candidates against a job description.
    Returns the candidates sorted by score descending, with score and rank injected.
    """
    ranked_list = []
    
    for cand in candidates:
        score = calculate_score(
            candidate_skills=cand.get('skills', []),
            job_skills=job.get('required_skills', []),
            candidate_exp=cand.get('experience', 0),
            job_exp=job.get('required_experience', 0),
            candidate_edu=cand.get('education', ''),
            job_edu=job.get('education', '')
        )
        cand_copy = cand.copy()
        cand_copy['score'] = score
        ranked_list.append(cand_copy)
        
    # Sort descending by score
    ranked_list.sort(key=lambda x: x['score'], reverse=True)
    
    # Assign rank
    for i, cand in enumerate(ranked_list):
        cand['rank'] = i + 1
        
    return ranked_list
