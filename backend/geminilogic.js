const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeWaste(imageBuffer, mimeType) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });
    
    const prompt = `Identify the waste item in this image. 
    Return a JSON object with these exact keys:
    "itemName": name of the item,
    "score": recyclability score 0-100,
    "category": (Plastic, Metal, Paper, Glass, or Organic),
    "prepStep": one cleaning instruction,
    "upcyclingTips": one creative DIY idea.`;

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