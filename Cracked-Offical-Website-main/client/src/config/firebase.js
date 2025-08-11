import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa0g6e83ip7n_6vnQ5eRvKDtBEgJLOMzY",
  authDomain: "studywebsite-4f6b9.firebaseapp.com",
  projectId: "studywebsite-4f6b9",
  storageBucket: "studywebsite-4f6b9.firebasestorage.app",
  messagingSenderId: "623504682709",
  appId: "1:623504682709:web:144ddf4c904c5aa0e9fc5c",
  measurementId: "G-MHXJWJ3RKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
