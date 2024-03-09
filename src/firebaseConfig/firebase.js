// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmqITu8m_P6qiLpGSDpTeR3b5SnrFLWZM",
  authDomain: "jugueterialy.firebaseapp.com",
  projectId: "jugueterialy",
  storageBucket: "jugueterialy.appspot.com",
  messagingSenderId: "365073473203",
  appId: "1:365073473203:web:298fb4363c403a0e025ac6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);