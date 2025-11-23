from pydantic import BaseModel
from typing import List, Optional, Any

class GenerateRequest(BaseModel):
    prompt: str
    model: Optional[str] = None
    max_tokens: Optional[int] = 256

class GenerateResponse(BaseModel):
    generated_text: str

class PersonalInfo(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    address: Optional[str] = None
    linkedIn: Optional[str] = None
    portfolio: Optional[str] = None
    summary: Optional[str] = None

class Education(BaseModel):
    id: Optional[str]
    institution: str
    degree: str
    fieldOfStudy: str
    startDate: str
    endDate: Optional[str]
    description: Optional[str]
    currentlyStudying: Optional[bool] = False

class WorkExperience(BaseModel):
    id: Optional[str]
    company: str
    position: str
    location: Optional[str]
    startDate: str
    endDate: Optional[str]
    currentlyWorking: Optional[bool] = False
    description: Optional[str]
    achievements: Optional[List[str]] = []

class Skill(BaseModel):
    id: Optional[str]
    name: str
    level: Optional[str]
    category: Optional[str]
    yearsOfExperience: Optional[float]

class Resume(BaseModel):
    id: Optional[str]
    personalInfo: PersonalInfo
    education: List[Education] = []
    workExperience: List[WorkExperience] = []
    skills: List[Skill] = []
    projects: List[Any] = []
    certifications: List[Any] = []
