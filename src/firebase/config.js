import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW4BFbbK-Se-YLw1M2lWZyZdj7Hem3XIU",
  authDomain: "fleet-management-db.firebaseapp.com",
  databaseURL: "https://fleet-management-db-default-rtdb.firebaseio.com",
  projectId: "fleet-management-db",
  storageBucket: "fleet-management-db.firebasestorage.app",
  messagingSenderId: "1065942806413",
  appId: "1:1065942806413:web:eaf51a1f25026262ec17c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// THESE TWO EXPORTS ARE REQUIRED
export const auth = getAuth(app);
export const db = getFirestore(app);