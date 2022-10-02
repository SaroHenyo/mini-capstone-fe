import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3hEA8ehSAg1pdwYmWmKLPBi2HOMcfQ9k",
    authDomain: "react-emart-9c07c.firebaseapp.com",
    projectId: "react-emart-9c07c",
    storageBucket: "react-emart-9c07c.appspot.com",
    messagingSenderId: "745337420024",
    appId: "1:745337420024:web:0cf2f9425d7161819fe30d"
  };

// Use this to initialize the firebase App
const firebaseapp = firebase.initializeApp(firebaseConfig);

// Use for db
const db = firebaseapp.firestore()
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, googleProvider, facebookProvider } 
  