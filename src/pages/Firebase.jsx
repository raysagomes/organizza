import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc  } from 'firebase/firestore';

const firebase = require('firebase/app');
require('firebase/firestore');


const firebaseConfig = {
  apiKey: "AIzaSyBYtd65V1OEd1zbvEtUw68_LQc1SuYsfoY",
  authDomain: "organiza-ccdb9.firebaseapp.com",
  projectId: "organiza-ccdb9",
  storageBucket: "organiza-ccdb9.appspot.com",
  messagingSenderId: "50251489559",
  appId: "1:50251489559:web:3db77066505108dbbd1752",
  measurementId: "G-XD9XDHB81L"

  
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);
export const auth = getAuth (firebaseApp);
export const firestore = getFirestore(firebaseApp);



