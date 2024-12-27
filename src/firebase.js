// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCy5IG9lqO_3852clKlFPgcbas0z07u6MM",
    authDomain: "student-management-263cb.firebaseapp.com",
    projectId: "student-management-263cb",
    storageBucket: "student-management-263cb.firebasestorage.app",
    messagingSenderId: "746501342919",
    appId: "1:746501342919:web:4e1845307a3af1202760e2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;