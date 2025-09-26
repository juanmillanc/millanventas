// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAakJB6B8Kz1e0Lw-ZbLjBOvungpSdbcGA",
  authDomain: "millanventas-d1053.firebaseapp.com",
  projectId: "millanventas-d1053",
  storageBucket: "millanventas-d1053.firebasestorage.app",
  messagingSenderId: "749104547817",
  appId: "1:749104547817:web:4f5bb47dc8e374d343ed78",
  measurementId: "G-0C7N6ZS0TW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);