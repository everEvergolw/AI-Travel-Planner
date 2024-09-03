// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADs-zBFcV2G-tRvZWPCEkR4aPVbG_dBlU",
    authDomain: "meta-falcon-392214.firebaseapp.com",
    projectId: "meta-falcon-392214",
    storageBucket: "meta-falcon-392214.appspot.com",
    messagingSenderId: "593606907087",
    appId: "1:593606907087:web:e8f10598c763cfa44813ba",
    measurementId: "G-LZECMER3Z7"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 
export const db  = getFirestore(app);