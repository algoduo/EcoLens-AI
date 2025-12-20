const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function test() {
  try {
    const res = await db.collection('test').add({
      message: "Hello from EcoLens Backend!",
      time: new Date().toISOString()
    });
    console.log("✅ Success! Data saved with ID:", res.id);
  } catch (e) {
    console.error("❌ Error connecting to Firebase:", e);
  }
}

test();