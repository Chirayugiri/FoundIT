import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "campus-lost-and-found-150fc.firebaseapp.com",
  projectId: "campus-lost-and-found-150fc",
  storageBucket: "campus-lost-and-found-150fc.firebasestorage.app",
  messagingSenderId: "992235304607",
  appId: "1:992235304607:web:ab95a05f75898dea65d4aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const foundCollectionRef = collection(db, 'foundReport');
export const usersCollectionRef = collection(db, 'users');