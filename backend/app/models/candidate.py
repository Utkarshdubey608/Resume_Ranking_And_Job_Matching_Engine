from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class CandidateBase(BaseModel):
    name: str
    education: str
    experience: int
    skills: List[str]
    certifications: List[str]
    resume_text: str
    file_hash: Optional[str] = None

class CandidateCreate(CandidateBase):
    pass

class Candidate(CandidateBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True

# Object Oriented Programming as requested
class CandidateModel:
    def __init__(self, id: str, name: str, education: str, experience: int, skills: List[str], certifications: List[str], resume_text: str, file_hash: str = None):
        self.id = id
        self.name = name
        self.education = education
        self.experience = experience
        self.skills = skills
        self.certifications = certifications
        self.resume_text = resume_text
        self.file_hash = file_hash

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "education": self.education,
            "experience": self.experience,
            "skills": self.skills,
            "certifications": self.certifications,
            "resume_text": self.resume_text,
            "file_hash": self.file_hash
        }
