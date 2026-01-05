// frontend/src/lib/auth.ts (or wherever your register logic lives)
import { auth, db } from "../firebaseConfig"; // Direct link to the config
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; // Use serverTimestamp for accuracy

export const registerUser = async (email, password, name) => {
  try {
    // 1. Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Automatically create their dashboard profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      displayName: name,
      email: email,
      ecoLevel: 1,      
      points: 0,        
      totalScans: 0,    // Added to support your dynamic badges
      createdAt: serverTimestamp() // Better than new Date() for database sync
    });

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};