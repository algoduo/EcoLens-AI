require('dotenv').config();
const { analyzeImage } = require('./geminiLogic');
const fs = require('fs');

async function runTest() {
  try {
    console.log("Reading test.jpg...");
    const imageBuffer = fs.readFileSync('./test.jpg'); 
    
    console.log("Waiting for Gemini's analysis...");
    const result = await analyzeImage(imageBuffer, "image/jpeg");
    
    console.log("✅ SUCCESS! Here is the JSON data:");
    console.log(JSON.stringify(result, null, 2)); 
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

runTest();