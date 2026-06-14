from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def match_candidate_to_job(candidate_skills: list[str], job_skills: list[str]) -> dict:
    """
    Use Scikit-learn TF-IDF Vectorizer and Cosine Similarity to find:
    - Match Percentage
    - Matching Skills
    - Missing Skills
    """
    cand_skills_lower = [s.lower() for s in candidate_skills]
    job_skills_lower = [s.lower() for s in job_skills]
    
    cand_set = set(cand_skills_lower)
    job_set = set(job_skills_lower)
    
    matching_skills = list(cand_set.intersection(job_set))
    missing_skills = list(job_set.difference(cand_set))
    
    # Calculate similarity using TF-IDF on skills combined as text
    if not job_skills:
        match_percentage = 100.0
    elif not candidate_skills:
        match_percentage = 0.0
    else:
        cand_text = " ".join(cand_skills_lower)
        job_text = " ".join(job_skills_lower)
        
        vectorizer = TfidfVectorizer()
        try:
            tfidf_matrix = vectorizer.fit_transform([job_text, cand_text])
            similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            match_percentage = round(similarity * 100, 2)
        except ValueError:
            # Vocabulary empty
            match_percentage = 0.0
            
    return {
        "match_percentage": match_percentage,
        "matching_skills": matching_skills,
        "missing_skills": missing_skills
    }
