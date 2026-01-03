🌿 EcoLens AI: Vision-to-ActionWinner's Circle Prototype | TechSprint 2026 HackathonEcoLens AI is an intelligent waste management system that leverages Gemini 3 Flash Multimodal AI to transform how users perceive waste—turning everyday trash into a resource for creative upcycling.💡 The ProblemRecycling contamination and "wish-cycling" cost municipalities millions and damage the environment. Most people want to recycle but are confused by local rules. EcoLens AI provides a "second look" at waste to ensure it ends up in the right place—or stays out of the bin entirely.✨ The SolutionInstant Classification: Precise material identification using Gemini 3 Flash.Actionable Guidance: Real-time feedback on whether an item belongs in the Blue (Recyclable), Green (Compost), or Grey (Landfill) bin.Waste-to-Wealth: A DIY upcycling engine that generates personalized craft ideas to extend product life.🚀 Technical StackLayerTechnologyFrontendReact.js & Tailwind CSSBackendNode.js & ExpressAI BrainGoogle Gemini 3 Flash (Model: gemini-3-flash-preview)DatabaseFirebase Firestore (Impact Tracking)SecurityDotenv Environment Management⚙️ Quick Start SetupTo run EcoLens AI locally for evaluation, follow these steps:1. PrerequisitesNode.js (v18+)A Google AI Studio API Key2. Backend ConfigurationBashcd backend
npm install
# Security Step:
cp .env.example .env 
# Edit .env and add your GEMINI_API_KEY
# Ensure serviceAccountKey.json is in the /backend folder
node server.js
3. Frontend ConfigurationBashcd frontend
npm install
npm run dev
The application will be live at http://localhost:3000.🔒 Security & Best PracticesEnvironment Variables: Sensitive keys are managed via .env and are excluded from version control using .gitignore.Database Rules: Firestore is currently in "Test Mode" for the hackathon duration (Exp. Jan 19, 2026).👥 The TeamDeveloper A: Backend & AI Integration SpecialistDeveloper B: Frontend UI/UX & Sustainability Lead