# 🌿 EcoLens AI: Vision-to-Action

**EcoLens AI** is an intelligent waste management prototype built for the **TechSprint 2025 Hackathon**. We leverage Multimodal AI to transform how users perceive waste—turning everyday trash into a resource for creative upcycling.

---

## 💡 The Problem
Recycling contamination and "wish-cycling" (recycling things that shouldn't be recycled) cost municipalities millions and damage the environment. Most people *want* to recycle but are confused by local rules or simply see waste as useless.

## ✨ The Solution
EcoLens AI provides a "second look" at waste. By analyzing items through the lens of AI, we provide:
- **Instant Classification:** Precise material identification.
- **Actionable Guidance:** Clear instructions on which bin to use.
- **Waste-to-Wealth:** Creative DIY upcycling ideas to extend the life of every product.

---

## 🚀 Key Features
- **AI-Powered Identification:** Uses Google Gemini 3 Flash to identify waste materials from text or image descriptions.
- **Dynamic Recyclability Scoring:** Real-time feedback on whether an item belongs in the Blue (Recycling), Green (Compost), or Grey (Landfill) bin.
- **DIY Upcycling Engine:** Generates personalized, easy-to-follow craft ideas to keep waste out of landfills.
- **Persistent Scan History:** Securely saves user activity to a Firebase Firestore database for impact tracking.

---

## 🛠️ Technical Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (Component-based UI) |
| **Backend** | Node.js & Express (RESTful API) |
| **AI Brain** | Google Gemini 3 Flash (Multimodal LLM) |
| **Database** | Firebase Firestore (NoSQL Cloud Storage) |
| **Deployment** | Git & GitHub (Version Control) |

---

## ⚙️ Local Development Setup

To run this project locally for testing and evaluation, follow these steps:

### 1. Prerequisites
- **Node.js** (v18+)
- **Git**

### 2. Backend Installation
1. `cd backend`
2. `npm install`
3. Add a `.env` file with your `GEMINI_API_KEY`.
4. Add your `serviceAccountKey.json` for Firebase authentication.
5. `node server.js` (Running on http://localhost:5000)

### 3. Frontend Installation
1. `cd frontend`
2. `npm install`
3. `npm start` (Running on http://localhost:3000)

---

## 👥 The Team
- **Developer A:** Backend & AI Integration Specialist
- **Developer B:** Frontend UI/UX Developer
