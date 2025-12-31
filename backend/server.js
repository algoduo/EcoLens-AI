const express = require('express');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
require('dotenv').config();
const { analyzeWaste } = require('./geminiLogic');

// Initialize Firestore
admin.initializeApp({
  projectId: "ecolens-ai" 
});
const db = admin.firestore();

const app = express();
app.use(cors()); // Allow Frontend (3001) to talk to Backend (5000)
const upload = multer(); // Handle image data

app.post('/api/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image file provided" });

    // Step 1: Perform AI Analysis
    const analysis = await analyzeWaste(req.file.buffer, req.file.mimetype);

    // Step 2: Store in Firestore for History
    const scanRecord = {
      ...analysis,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection('scans').add(scanRecord);

    // Step 3: Send result to UI
    res.json(analysis);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Analysis or database save failed." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 EcoLens Backend live on port ${PORT}`));