from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

class JobBase(BaseModel):
    title: str
    required_skills: List[str]
    required_experience: int
    education: str

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True

# OOP Job class
class JobModel:
    def __init__(self, id: str, title: str, required_skills: List[str], required_experience: int, education: str):
        self.id = id
        self.title = title
        self.required_skills = required_skills
        self.required_experience = required_experience
        self.education = education

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "required_skills": self.required_skills,
            "required_experience": self.required_experience,
            "education": self.education
        }
