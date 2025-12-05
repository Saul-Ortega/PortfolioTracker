import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgcWknJL3rd6jhNKf0jOuWaD32ybxXPzU",
  authDomain: "portfoliotracker-e5bab.firebaseapp.com",
  projectId: "portfoliotracker-e5bab",
  storageBucket: "portfoliotracker-e5bab.firebasestorage.app",
  messagingSenderId: "763069824854",
  appId: "1:763069824854:web:d181441ab884b626c4e0f7",
  measurementId: "G-QB4JPBKR0G"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);