const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function list() {
  try {
    // This fetches the list of models your specific key can see
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    
    console.log("Your available models:");
    if (data.models) {
        data.models.forEach(m => console.log(`- ${m.name.replace('models/', '')}`));
    } else {
        console.log("No models found. Your API key might be invalid or restricted.");
        console.log("Error details:", data);
    }
  } catch (e) {
    console.error("Fetch error:", e);
  }
}

list();