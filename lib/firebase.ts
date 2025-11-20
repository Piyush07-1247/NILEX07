import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// INSTRUCTION: Replace these values with your actual Firebase Config from the Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase
// checks if apps are already initialized to avoid errors in development reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);