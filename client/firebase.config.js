import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvy_-yF27FkuGButWu3sEwF48M-w0XxTk",
  authDomain: "raw-check.firebaseapp.com",
  projectId: "raw-check",
  storageBucket: "raw-check.firebasestorage.app",
  messagingSenderId: "18145760345",
  appId: "1:18145760345:web:f6281c927f544ed1944d48",
  measurementId: "G-HLNZ2SGBCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
