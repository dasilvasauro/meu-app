// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0dZ5CmXk94tSwlyK5IOMHgNuft3k04t8",
  authDomain: "focus-quest-fd3a4.firebaseapp.com",
  projectId: "focus-quest-fd3a4",
  storageBucket: "focus-quest-fd3a4.firebasestorage.app",
  messagingSenderId: "956586130719",
  appId: "1:956586130719:web:56584b01221a7d5ac4442a",
  measurementId: "G-B5WPLRJ35T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);