const admin = require("firebase-admin");

// Replace the name below with your actual .json file name if it's different
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };