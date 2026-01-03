const express = require('express');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
require('dotenv').config();
const { analyzeWaste } = require('./geminilogic');

// Initialize Firebase with your local serviceAccountKey.json
try {
  const serviceAccount = require("./serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("✅ Firebase Admin initialized successfully");
} catch (e) {
  console.error("❌ Firebase Init Failed: Ensure 'serviceAccountKey.json' exists.");
}

const db = admin.firestore();
const app = express();
app.use(cors()); // Enable CORS for local cross-port communication
const upload = multer(); // Memory storage for temporary image handling

app.post('/api/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image file provided" });

    console.log("📸 Starting analysis for:", req.file.originalname);

    // Step 1: AI Analysis
    const analysis = await analyzeWaste(req.file.buffer, req.file.mimetype);
    console.log("✨ AI identified:", analysis.itemName);

    // Step 2: Save to Firestore for persistent history
    const scanData = {
      ...analysis,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection('scans').add(scanData);
    console.log("💾 Saved to Firestore with ID:", docRef.id);

    res.json(analysis);
  } catch (error) {
    // Log detailed error to the terminal for debugging
    console.error("❌ BACKEND CRITICAL ERROR:", error.message);
    res.status(500).json({ 
      error: "The AI analysis or database save failed.",
      message: error.message 
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 EcoLens AI Backend live on port ${PORT}`));