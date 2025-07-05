// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBP_2veGR7KJ4WkdkgZa0T8E2gFloUJafg",
  authDomain: "smart-due-tracker.firebaseapp.com",
  projectId: "smart-due-tracker",
  storageBucket: "smart-due-tracker.firebasestorage.app",
  messagingSenderId: "240232636013",
  appId: "1:240232636013:web:d253d418f3d10618a4a964"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth and provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export const db = getFirestore(app);