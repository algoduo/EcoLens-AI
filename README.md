# 🌿 EcoLens AI: Vision-to-Action
**Final Prototype | TechSprint 2026 Hackathon**

EcoLens AI is an intelligent waste management system that leverages **Gemini 3 Flash** Multimodal AI to transform how users perceive waste—turning everyday trash into a resource for creative upcycling.

---

## 💡 The Problem
Recycling contamination and "wish-cycling" cost municipalities millions and damage the environment. Most people want to recycle but are confused by local rules. EcoLens AI provides a "second look" at waste to ensure it ends up in the right place—or stays out of the bin entirely.

## ✨ The Solution
* **Instant Classification:** Precise material identification using Gemini 3 Flash.
* **Actionable Guidance:** Real-time feedback on whether an item belongs in the **Blue (Recyclable)**, **Green (Compost)**, or **Grey (Landfill)** bin.
* **Waste-to-Wealth:** A DIY upcycling engine that generates personalized craft ideas to extend product life.

## 🚀 Technical Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js (App Router) & Tailwind CSS |
| **Backend** | Node.js & Express |
| **AI Brain** | Google Gemini 3 Flash (Model: `gemini-3-flash-preview`) |
| **Database** | Firebase Firestore (Impact Tracking) |
| **Security** | Dotenv Environment Management |

---

## ⚙️ Local Development Setup

### 1. Prerequisites
* Node.js (v18+)
* Google AI Studio API Key
* Firebase Service Account Key

### 2. Backend Configuration
```bash
cd backend
npm install
# Security Step: Rename .env.example to .env and add your key
# Ensure serviceAccountKey.json is placed in the /backend folder
node server.js
3. Frontend Configuration
Bash

cd frontend
npm install
npm run dev
The application will be live at http://localhost:3000.

🔒 Security
Sensitive keys are managed via .env and serviceAccountKey.json.

Both are excluded from version control via .gitignore to prevent unauthorized API usage.

👥 The Team
Developer A: Backend & AI Integration Specialist

Developer B: Frontend UI/UX (Next.js) & Sustainability Lead