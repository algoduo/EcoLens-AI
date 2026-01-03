# 🌿 EcoLens AI: Vision-to-Action
**Final Prototype | TechSprint 2026 Hackathon**

[cite_start]EcoLens AI is an intelligent waste management system that leverages **Gemini 3 Flash** Multimodal AI to transform how users perceive waste—turning everyday trash into a resource for creative upcycling[cite: 13, 15].

---

## 💡 The Problem
[cite_start]Recycling contamination and "wish-cycling" cost municipalities millions and damage the environment[cite: 22]. [cite_start]EcoLens AI provides a "second look" at waste to ensure it ends up in the right place—or stays out of the bin entirely[cite: 53].

## ✨ The Solution
* [cite_start]**Instant Classification:** Precise material identification using Gemini 3 Flash[cite: 13].
* [cite_start]**Actionable Guidance:** Clear instructions on which bin to use, helping users avoid recycling errors[cite: 53].
* [cite_start]**Waste-to-Wealth:** A DIY upcycling engine that generates personalized craft ideas to keep waste out of landfills[cite: 53].

## 🚀 Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router) & Tailwind CSS |
| **Backend** | Node.js & Express (Secure Server-Side Architecture) |
| **AI Brain** | Google Gemini 3 Flash (Model: `gemini-3-flash-preview`) |
| **Database** | Firebase Firestore (Impact Tracking & Persistence) |
| **Security** | Dotenv Environment Variables & .gitignore Protection |

---

## ⚙️ Local Development Setup

### 1. Prerequisites
* [cite_start]Node.js (v18+) [cite: 45]
* [cite_start]Google AI Studio API Key [cite: 26, 67]
* [cite_start]Firebase Service Account Key [cite: 60]

### 2. Backend Configuration
```bash
cd backend
npm install
# Security Step: Create a .env file and add your GEMINI_API_KEY
# Place your serviceAccountKey.json in the /backend folder
node server.js'''
3. Frontend Configuration
Bash

cd frontend
npm install
npm run dev
The application will be live at http://localhost:3000.

🔒 Security & Best Practices

Server-Side Architecture: To prevent "Client-Side Danger," all API calls are routed through a secure backend.





Secret Management: API keys and Firebase credentials are stored in environment variables and are not tracked by Git.




Firestore Rules: Database permissions are currently set to "Test Mode" for the hackathon evaluation period.


👥 The Team
Developer A: Backend & AI Integration Specialist

Developer B: Frontend UI/UX (Next.js) & Sustainability Lead