import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def match_candidate_to_job(candidate: dict, job: dict) -> dict:
    """
    Use Scikit-learn TF-IDF Vectorizer and Cosine Similarity to find Match Percentage.
    Also calculates exact sub-scores (Skills, Exp, Edu, Certs) out of 100.
    """
    candidate_skills = candidate.get('skills', [])
    job_skills = job.get('required_skills', [])
    
    cand_skills_lower = [s.lower() for s in candidate_skills]
    job_skills_lower = [s.lower() for s in job_skills]
    
    cand_set = set(cand_skills_lower)
    job_set = set(job_skills_lower)
    
    matching_skills = list(cand_set.intersection(job_set))
    missing_skills = list(job_set.difference(cand_set))
    
    # 1. Skill Match (TF-IDF Cosine Similarity as base, but we will return explicit 0-100 score)
    if not job_skills:
        skillMatch = 100.0
    elif not candidate_skills:
        skillMatch = 0.0
    else:
        cand_text = " ".join(cand_skills_lower)
        job_text = " ".join(job_skills_lower)
        
        vectorizer = TfidfVectorizer()
        try:
            tfidf_matrix = vectorizer.fit_transform([job_text, cand_text])
            similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            skillMatch = round(similarity * 100, 2)
        except ValueError:
            skillMatch = 0.0

    # Fallback to simple intersection if TF-IDF yields 0 but there is intersection
    if skillMatch == 0 and job_skills_lower:
        skillMatch = round((len(matching_skills) / len(job_skills_lower)) * 100, 2)

    # 2. Experience Match (0-100)
    cand_exp = candidate.get('experience', 0)
    job_exp = job.get('required_experience', 0)
    if job_exp <= 0:
        expMatch = 100.0
    elif cand_exp >= job_exp:
        expMatch = 100.0
    else:
        expMatch = round((cand_exp / job_exp) * 100, 2)

    # 3. Education Match (0-100)
    cand_edu = str(candidate.get('education', '')).lower()
    job_edu = str(job.get('education', '')).lower()
    eduMatch = 70.0
    if job_edu and job_edu in cand_edu:
        eduMatch = 100.0
    elif 'ph.d' in cand_edu or 'doctorate' in cand_edu:
        eduMatch = 100.0
    elif 'master' in cand_edu or 'm.s' in cand_edu:
        eduMatch = 90.0
    elif 'bachelor' in cand_edu or 'b.s' in cand_edu:
        eduMatch = 80.0

    # 4. Certifications Match (0-100)
    certs = candidate.get('certifications', [])
    if certs and len(certs) > 0:
        certMatch = 90.0
    else:
        certMatch = 40.0
        
    # Overall Score (Weighted average)
    match_percentage = round((skillMatch * 0.4) + (expMatch * 0.3) + (eduMatch * 0.2) + (certMatch * 0.1), 2)

    return {
        "match_percentage": match_percentage,
        "skillMatch": skillMatch,
        "expMatch": expMatch,
        "eduMatch": eduMatch,
        "certMatch": certMatch,
        "matching_skills": matching_skills,
        "missing_skills": missing_skills
    }
