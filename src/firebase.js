import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUQFlL4mjW-m09hDR33Ihw-ujCnAcB4is",
  authDomain: "vipinsfirebase.firebaseapp.com",
  projectId: "vipinsfirebase",
  storageBucket: "vipinsfirebase.firebasestorage.app",
  messagingSenderId: "374189584727",
  appId: "1:374189584727:web:f865917ecda01ab7258e12",
  measurementId: "G-BPZ71028ER"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
