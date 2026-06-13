import re

# Predefined skill dictionary
SKILL_DICTIONARY = [
    "python", "java", "c++", "javascript", "react", "node.js", "fastapi",
    "sql", "nosql", "mongodb", "postgresql", "mysql", "aws", "azure", "gcp",
    "docker", "kubernetes", "git", "machine learning", "data science",
    "html", "css", "django", "flask", "spring boot", "c#", "typescript",
    "pandas", "numpy", "scikit-learn", "pytorch", "tensorflow", "agile",
    "scrum", "communication", "leadership", "problem solving", "ci/cd",
    "linux", "bash", "golang", "rust", "ruby"
]

def extract_skills(text: str) -> list[str]:
    """
    Extract skills from text using a predefined skill dictionary.
    Returns a unique list of matched skills in lowercase.
    """
    text_lower = text.lower()
    extracted_skills = set()
    
    for skill in SKILL_DICTIONARY:
        # Use regex to find whole word matches to avoid partial matches
        # For skills with special characters (like c++ or node.js), re.escape is needed
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            extracted_skills.add(skill)
            
    return list(extracted_skills)
