import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCd8gkDmqjQmBpYggtCRbfFcv8tcgYPNdg",
  authDomain: "prepwise-bfd5e.firebaseapp.com",
  projectId: "prepwise-bfd5e",
  storageBucket: "prepwise-bfd5e.firebasestorage.app",
  appId: "1:654801957747:web:7374b120d1086817350606",
  messagingSenderId: "654801957747",
  measurementId: "G-R2Y1TCRTH8",
};
// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
