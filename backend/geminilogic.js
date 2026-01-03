const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeWaste(imageBuffer, mimeType) {
  try {
    // UPDATED: Using the exact model name from your successful listModels script
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview", // This matches your account's available models
      generationConfig: { responseMimeType: "application/json" } 
    });
    
    const prompt = `Identify the waste item in this image. 
    Return a JSON object with:
    "itemName": name, "score": 0-100, "category": (Plastic, Metal, Paper, Glass, Organic),
    "prepStep": cleaning instruction, "upcyclingTips": DIY idea.`;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: imageBuffer.toString("base64"), mimeType } }
    ]);
    
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("AI Error:", error.message);
    throw error;
  }
}

module.exports = { analyzeWaste };