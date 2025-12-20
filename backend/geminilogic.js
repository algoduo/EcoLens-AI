const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeWaste(item) {
  try {
    // Use the exact string from your 'Your available models' list
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    const prompt = `Identify this waste item: ${item}. 
    1. Is it recyclable? 
    2. Which bin does it go in? 
    3. Give one creative DIY upcycling idea.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    console.log("🤖 EcoLens AI Analysis (powered by Gemini Flash):");
    console.log(response.text());
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

analyzeWaste("a rusted metal cookie tin");