// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estates-bf7f0.firebaseapp.com",
  projectId: "mern-estates-bf7f0",
  storageBucket: "mern-estates-bf7f0.appspot.com",
  messagingSenderId: "191900604287",
  appId: "1:191900604287:web:f2eca1785f1289dd5fec4a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
