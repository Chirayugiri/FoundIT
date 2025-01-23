require('dotenv').config();
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore, collection } = require('firebase/firestore');
const cloudinary = require('cloudinary').v2;

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, 
  authDomain: "campus-lost-and-found-150fc.firebaseapp.com",
  projectId: "campus-lost-and-found-150fc",
  storageBucket: "campus-lost-and-found-150fc.firebasestorage.app",
  messagingSenderId: "992235304607",
  appId: "1:992235304607:web:ab95a05f75898dea65d4aa"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const foundCollectionRef = collection(db, 'foundReport');
const lostCollectionRef = collection(db, 'lostReport');
const usersCollectionRef = collection(db, 'users');

// Configuration for Cloudinary
cloudinary.config({
  cloud_name: 'dp6kymz9n',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

module.exports = {
  auth, db, cloudinary, foundCollectionRef, usersCollectionRef, lostCollectionRef
}