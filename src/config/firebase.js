import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // ADD THIS LINE

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5Em68v1pT40jOz96zdw1xCt0zK-NEHFo",
  authDomain: "fintrack-d2a6e.firebaseapp.com",
  projectId: "fintrack-d2a6e",
  storageBucket: "fintrack-d2a6e.firebasestorage.app",
  messagingSenderId: "938710258592",
  appId: "1:938710258592:web:e2b1bc2e9efabbfa760ac5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

export default app;
