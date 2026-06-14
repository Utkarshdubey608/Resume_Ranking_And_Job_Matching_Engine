import matplotlib
matplotlib.use('Agg') # Non-interactive backend
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import io
import base64
from collections import Counter

def _get_base64_image(fig) -> str:
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    plt.close(fig)
    return img_base64

def generate_top_skills_chart(candidates: list[dict]) -> str:
    all_skills = []
    for cand in candidates:
        all_skills.extend(cand.get('skills', []))
        
    if not all_skills:
        fig, ax = plt.subplots(figsize=(6, 4))
        ax.text(0.5, 0.5, "No Skills Data", ha='center', va='center')
        return _get_base64_image(fig)
        
    skill_counts = Counter([s.lower() for s in all_skills]).most_common(10)
    df = pd.DataFrame(skill_counts, columns=['Skill', 'Count'])
    
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.barplot(data=df, x='Count', y='Skill', ax=ax, palette='viridis')
    ax.set_title('Top 10 Skills Among Candidates')
    plt.tight_layout()
    return _get_base64_image(fig)

def generate_education_distribution(candidates: list[dict]) -> str:
    educations = [cand.get('education', 'Unknown') for cand in candidates]
    
    if not educations:
        fig, ax = plt.subplots(figsize=(6, 4))
        ax.text(0.5, 0.5, "No Education Data", ha='center', va='center')
        return _get_base64_image(fig)
        
    edu_counts = Counter(educations)
    
    fig, ax = plt.subplots(figsize=(8, 8))
    ax.pie(edu_counts.values(), labels=edu_counts.keys(), autopct='%1.1f%%', colors=sns.color_palette('pastel'))
    ax.set_title('Education Distribution')
    return _get_base64_image(fig)

def generate_experience_distribution(candidates: list[dict]) -> str:
    experiences = [cand.get('experience', 0) for cand in candidates]
    
    if not experiences:
        fig, ax = plt.subplots(figsize=(6, 4))
        ax.text(0.5, 0.5, "No Experience Data", ha='center', va='center')
        return _get_base64_image(fig)
        
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.histplot(experiences, bins=10, kde=True, ax=ax, color='skyblue')
    ax.set_title('Experience Distribution (Years)')
    ax.set_xlabel('Years of Experience')
    ax.set_ylabel('Number of Candidates')
    plt.tight_layout()
    return _get_base64_image(fig)
