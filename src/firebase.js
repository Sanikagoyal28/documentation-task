// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAKM-7aUNKA8F-czZ7ml14kSOj_sAhCxBc',
  authDomain: 'documentation-assignment.firebaseapp.com',
  databaseURL: 'https://documentation-assignment-default-rtdb.firebaseio.com',
  projectId: 'documentation-assignment',
  storageBucket: 'documentation-assignment.firebasestorage.app',
  messagingSenderId: '363707276816',
  appId: '1:363707276816:web:88629812644a8b7f5c7495',
  measurementId: 'G-16XHNY8W5D',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };
