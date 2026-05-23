import os
import json
from schema import UserProfileInput, VisionProfile
from generator import generate_roadmap

from dotenv import load_dotenv
load_dotenv()

riya_profile = UserProfileInput(
    icp_type="high_wage",
    name="Riya Sharma",
    current_role="Final year CS student",
    target_role="Software Engineer",
    urgency_months=6,
    skills=["Python basics", "HTML", "SQL"],
    language="en",
    vision_profile=VisionProfile(
        current_life="Studying for placements, no internship yet",
        main_blocker="No real project experience",
        vision_12mo="Working at a product company, building real features",
        top_motivation="Want to prove the CS degree was worth it"
    )
)


arjun_profile = UserProfileInput(
    icp_type="low_wage",
    name="Arjun Yadav",
    current_role="Delivery partner",
    target_role="Data entry executive",
    urgency_months=3,
    skills=["Basic smartphone use", "Some Excel"],
    language="hi",
    vision_profile=VisionProfile(
        current_life="Delivering 10 hours a day no fixed salary",
        main_blocker="No computer skills no idea where to start",
        vision_12mo="Office job fixed salary stability",
        top_motivation="Stability for my family"
    )
)

def run_test_pipeline():
    print("=" * 60)
    print("🚀 RUNNING AI ROADMAP GENERATOR (FREE POC VERSION)")
    print("=" * 60)
    
   
    print(f"\n[🔄 Processing] Generating roadmap for {riya_profile.name} (ICP-A)...")
    try:
        riya_roadmap = generate_roadmap(riya_profile)
        print(f"✅ Success! Generated 7 milestones for {riya_profile.name}.")
        print(json.dumps(riya_roadmap, indent=2, ensure_ascii=False))
    except Exception as e:
        print(f"❌ Error generating roadmap for Riya: {e}")
        
    print("-" * 60)
    
  
    print(f"\n[🔄 Processing] Generating roadmap for {arjun_profile.name} (ICP-B)...")
    try:
        arjun_roadmap = generate_roadmap(arjun_profile)
        print(f"✅ Success! Generated 7 milestones for {arjun_profile.name}.")
        print(json.dumps(arjun_roadmap, indent=2, ensure_ascii=False))
    except Exception as e:
        print(f"❌ Error generating roadmap for Arjun: {e}")

if __name__ == "__main__":
   
    if not os.environ.get("OPENROUTER_API_KEY"):
        print("⚠️ Warning: OPENROUTER_API_KEY environment variable not found.")
        print("Please set your OpenRouter API Key before executing.")
    else:
        run_test_pipeline()