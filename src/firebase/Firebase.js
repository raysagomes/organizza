import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc  } from 'firebase/firestore';
import React from 'react';

const firebase = require('firebase/app');
require('firebase/firestore');


const firebaseConfig = {
  apiKey: "",
  authDomain: "organiza-ccdb9.firebaseapp.com",
  projectId: "organiza",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""

  
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const db = getDatabase(firebaseApp);

export default firebaseApp;