
# Edge Case Validation Matrix (10 Extreme Input Tests)

This matrix logs how the updated system prompt handles extreme user parameters without breaking structural integrity.

---

### 🔹 Stream A: 5 High-Wage Edge Cases

#### Test Case 1: The "Zero Skills" CS Graduate
* **Input Payload:**
```json
{
  "name": "Amit Paul",
  "icp_type": "high_wage",
  "current_role": "B.Com Graduate",
  "target_role": "Full-Stack Developer",
  "urgency_months": 3,
  "skills": ["nothing", "none"],
  "language": "en",
  "story": "Wants high tech salary but knows absolutely nothing about computing."
}

{
  "name": "Karan Malhotra",
  "icp_type": "high_wage",
  "current_role": "QA Tester",
  "target_role": "DevOps Engineer",
  "urgency_months": 0,
  "skills": ["Manual Testing", "SQL"],
  "language": "en",
  "story": "Laid off yesterday. Needs to clear a DevOps interview immediately."
}

{
  "name": "Dr. Shreya Iyer",
  "icp_type": "high_wage",
  "current_role": "Biotech Researcher",
  "target_role": "AI Prompt Engineer",
  "urgency_months": 6,
  "skills": ["Python", "R", "CRISPR Math", "Data Analysis", "SQL", "Machine Learning"],
  "language": "en",
  "story": "Wants to switch to core AI logic optimization."
}

{
  "name": "Vijay Saxena",
  "icp_type": "high_wage",
  "current_role": "1st Year Student",
  "target_role": "System Architect",
  "urgency_months": 24,
  "skills": ["C++ Basics"],
  "language": "en",
  "story": "Has plenty of time, wants a slow structural path to big-tech tier architecture."
}

{
  "name": "Rahul <script>alert(1)</script>",
  "icp_type": "high_wage",
  "current_role": "IT Helpdesk",
  "target_role": "Cybersecurity Penetration Tester",
  "urgency_months": 2,
  "skills": ["%#$@!", "&&||", "DROP TABLE;"],
  "language": "en",
  "story": "Wants to switch to extreme technical exploit payloads logging."
}

// Stream B: 5 Low-Wage / Operational Edge Cases

{
  "name": "राम यादव",
  "icp_type": "low_wage",
  "current_role": "मजदूर",
  "target_role": "ऑफिस हेल्पर / क्लर्क",
  "urgency_months": 2,
  "skills": ["कुछ नहीं"],
  "language": "hi",
  "story": "पढ़ना लिखना बहुत कम आता है। स्मार्टफोन चलाना जानता हूँ, कंप्यूटर सीखकर पक्की ऑफिस वाली नौकरी चाहिए।"
}

{
  "name": "Suresh Kumar",
  "icp_type": "low_wage",
  "current_role": "Auto Driver",
  "target_role": "Data Entry Operator",
  "urgency_months": 3,
  "skills": ["Smartphone", "Driving"],
  "language": "hi",
  "story": "Sir auto chalane me ab bohot dikkat hoti hai, koi badiya office me baithne wali data entry operator ki job dilwa do."
}

{
  "name": "Ramesh Chawla",
  "icp_type": "low_wage",
  "current_role": "Retired Kirana Store Keeper",
  "target_role": "Housing Society Billing Clerk",
  "urgency_months": 1,
  "skills": ["Physical Register Accounting"],
  "language": "hi",
  "story": "Bache ab support nahi kar rahe hain. Kharcha chalane ke liye immediate local computer society billing seekhni hai."
}

{
  "name": "Sunil",
  "icp_type": "low_wage",
  "current_role": "Unemployed",
  "target_role": "E-Commerce Delivery Coordinator",
  "urgency_months": 2,
  "skills": ["Bike"],
  "language": "hi",
  "story": "Garib"
}

{
  "name": "Deepak Thapa",
  "icp_type": "low_wage",
  "current_role": "Night Security Guard",
  "target_role": "Corporate Front-Desk Executive",
  "urgency_months": 4,
  "skills": ["Basics Computer", "English Speaking thodi thodi"],
  "language": "hi",
  "story": "Wants a clean day-shift uniform desk job. Wants to leverage his basic conversational skills."
}