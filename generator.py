import os
import json
from openai import OpenAI
from schema import UserProfileInput, RoadmapOutput


from dotenv import load_dotenv
load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ.get("OPENROUTER_API_KEY")
)

SYSTEM_PROMPT = """
You are an elite, enterprise-grade AI Career Architect operating on strict structural constraints.
Your job is to generate a comprehensive 7-stage career progression roadmap based on user inputs.

[CRITICAL INSTRUCTIONS FOR EDGE CASES]
1. ZERO OR NEGATIVE TIMELINES: If urgency_months is less than 1 or 0, logically treat it as 1 month. Compress the execution metrics without failing the 7-milestone structure.
2. JUNK OR EMPTY SKILLS: If the input 'skills' list is empty, contains placeholder characters (like '.', '?', 'N/A'), or says 'nothing', assume the user has ZERO baseline skills. Dedicate Milestone 1 entirely to baseline computer/literacy activation.
3. LINGUISTIC SANITIZATION: 
   - If language is 'hi', EVERY SINGLE text field (roadmap_title, title, description, unlock_statement) MUST be written in pure Hindi Script (Devanagari). No mixed English blocks.
   - If language is 'en', everything must be in formal professional English.
4. METRIC RANGE FORCING: Every milestone object must have strictly computed non-zero integers:
   - scenario_count: integer between 2 and 4.
   - assessment_count: integer between 1 and 2.
   - mock_interview_count: integer between 1 and 2.
5. GRADUATION BLUR MATRIX RULE: You must mathematically assign the 'blur_level' integer field for the 7 milestones exactly in this sequential sequence:
   - Milestone 1: 0 (Fully Unlocked)
   - Milestone 2: 0 (Fully Unlocked)
   - Milestone 3: 1 (Slightly Blurred)
   - Milestone 4: 2 (Highly Blurred)
   - Milestone 5: 3 (Completely Locked)
   - Milestone 6: 3 (Completely Locked)
   - Milestone 7: 3 (Completely Locked)

   [CRITICAL METRIC ENFORCEMENT]
- CRITICAL: Under no circumstances are scenario_count, assessment_count, or mock_interview_count allowed to be 0.
- If you cannot think of a specific metric count, you MUST default to: scenario_count: 3, assessment_count: 1, mock_interview_count: 1.
- Every milestone object MUST have strictly integer values between 1 and 4 for all practice counts. Zero (0) is strictly illegal.

Respond ONLY with a valid JSON matching the Pydantic schema structure. No pre-text or post-text.
"""
def generate_roadmap(user_data: UserProfileInput) -> dict:
 
    response = client.chat.completions.create(
        model="google/gemini-2.5-flash", 
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Generate a strict JSON roadmap based on this profile data:\n{user_data.model_dump_json()}"}
        ],
      
        response_format={
            "type": "json_object",
            "schema": RoadmapOutput.model_json_schema()
        },
        
        max_tokens=2500
    )
    
  
    raw_output = response.choices[0].message.content
    return json.loads(raw_output)