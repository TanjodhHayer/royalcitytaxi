import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // <-- Added doc and getDoc imports
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Client-side Firebase config, including the necessary fields for authentication
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,  // Public API key
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app only if it's not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export client-side Firestore and Authentication instances
export const db = getFirestore(app);
export const auth = getAuth(app);  // Client-side authentication

// Function to check if the user is an admin (client-side)
export const checkIfAdmin = async (): Promise<boolean> => {
  const user = auth.currentUser; // Get the current user directly from client-side auth
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        return userData.admin === true; // Return true if the admin field is true
      } else {
        return false; // Return false if no user data found
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return false;
    }
  }
  return false; // Return false if no user is logged in
};

export { sendPasswordResetEmail };
