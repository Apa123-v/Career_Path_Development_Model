from pydantic import BaseModel, Field
from typing import List


class VisionProfile(BaseModel):
    current_life: str
    main_blocker: str
    vision_12mo: str
    top_motivation: str

class UserProfileInput(BaseModel):
    icp_type: str = Field(..., description="Must be either 'high_wage' or 'low_wage'")
    name: str
    current_role: str
    target_role: str
    urgency_months: int
    skills: List[str]
    language: str = Field(..., description="Language code, e.g., 'en' or 'hi'")
    vision_profile: VisionProfile

class Milestone(BaseModel):
    code: str = Field(..., description="Must be exactly M01, M02, M03, M04, M05, M06, or M07")
    title: str = Field(..., description="Personalized milestone title based on user track")
    salary_tier: str = Field(..., description="Realistic salary expectation, forking based on ICP type")
    unlock_statement: str = Field(..., description="Hyper-specific vivid action statement showing what the user can confidently achieve")
    blur_level: int = Field(..., description="Strict mathematical progression of detail clarity: M01=0, M02=0, M03=1, M04=2, M05-M07=3")
    scenario_count: int = Field(..., description="Downstream count for practicing interactive scenarios")
    assessment_count: int = Field(..., description="Downstream count for assessments")
    mock_interview_count: int = Field(..., description="Downstream count for interviews")

class RoadmapOutput(BaseModel):
    milestones: List[Milestone] = Field(..., description="An array of exactly 7 structured career milestones")