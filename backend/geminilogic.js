const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Initialize with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeWaste(imageBuffer, mimeType) {
  try {
    // UPDATED: Using the Gemini 3 Flash model identifier
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });
    
    const prompt = `Identify the waste item in this image. 
    Return a JSON object with these exact keys:
    "itemName": name of the item,
    "score": recyclability score 0-100,
    "category": (Plastic, Metal, Paper, Glass, or Organic),
    "prepStep": one cleaning instruction,
    "upcyclingTips": one creative DIY idea.`;

    // Gemini 3 Flash handles multi-modal input (text + image) natively
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: imageBuffer.toString("base64"), mimeType } }
    ]);
    
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Gemini 3 Flash Error:", error.message);
    throw error;
  }
}

module.exports = { analyzeWaste };