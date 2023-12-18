import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsINEJuZ0q3CuUl7dHaxJlNiJAvWv-5Lg",
  authDomain: "todolist-3eefe.firebaseapp.com",
  projectId: "todolist-3eefe",
  storageBucket: "todolist-3eefe.appspot.com",
  messagingSenderId: "607882060746",
  appId: "1:607882060746:web:ec125b09b071c02a1fe533"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};