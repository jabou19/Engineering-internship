// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIyEyXiZ3kPbWagwtbV5yKycZdambG6W8",
  authDomain: "updropp-40d5b.firebaseapp.com",
  databaseURL: "https://updropp-40d5b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "updropp-40d5b",
  storageBucket: "updropp-40d5b.appspot.com",
  messagingSenderId: "843129721487",
  appId: "1:843129721487:web:928433db88df4a41b816fa",
  measurementId: "G-ZT6FMT1KG7"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAurth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
export const firebaseGetDB = getDatabase(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);