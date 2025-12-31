const express = require('express');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
require('dotenv').config();
const { analyzeWaste } = require('./geminiLogic');

// Initialize Firebase Admin (The 'Memory' of EcoLens)
admin.initializeApp({
  projectId: "ecolens-ai" 
});
const db = admin.firestore();

const app = express();
app.use(cors()); // Allows Developer B's frontend to talk to your server
const upload = multer(); // Processes image uploads from the camera

// THE MAIN ENDPOINT: This is the 'Contract' with Developer B
app.post('/api/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image found" });

    // Step 1: Get AI Analysis from Gemini
    const analysis = await analyzeWaste(req.file.buffer, req.file.mimetype);

    // Step 2: Save the 'Scan' to the Database for User History
    const scanData = {
      ...analysis,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection('scans').add(scanData);

    // Step 3: Send results back to the UI
    res.json(analysis);
  } catch (error) {
    console.error("Critical Error:", error);
    res.status(500).json({ error: "The AI analysis or database save failed." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 EcoLens AI Backend live on port ${PORT}`));