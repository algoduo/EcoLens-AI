const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { db } = require('./firebaseAdmin'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows Frontend to talk to Backend
app.use(express.json()); // Allows the server to read JSON data

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API Endpoint: Analyze Waste
app.post('/api/analyze', async (req, res) => {
  try {
    const { item } = req.body;

    if (!item) {
      return res.status(400).json({ error: "Item description is required" });
    }

    // Use the model name we verified in your list earlier
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    const prompt = `Act as an environmental expert for EcoLens AI. 
    Analyze this item: ${item}. 
    Provide: 
    1. Recyclability (Yes/No)
    2. Which bin it belongs in
    3. One creative upcycling DIY idea.
    Keep it concise and helpful.`;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    // SAVE TO FIREBASE: Log the scan history
    const docRef = await db.collection('scans').add({
      item: item,
      analysis: aiResponse,
      timestamp: new Date().toISOString()
    });

    // Send back the data to the user
    res.json({
      id: docRef.id,
      item: item,
      analysis: aiResponse
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Failed to analyze item. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 EcoLens Server is running on http://localhost:${PORT}`);
});