// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCUo-TiE-MHmKRM2vuNOe6xJQALd6HekA",
  authDomain: "advancedschoolmanegmentsystem.firebaseapp.com",
  projectId: "advancedschoolmanegmentsystem",
  storageBucket: "advancedschoolmanegmentsystem.appspot.com",
  messagingSenderId: "286391088342",
  appId: "1:286391088342:web:d7b354dec52ff4e2778577"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);