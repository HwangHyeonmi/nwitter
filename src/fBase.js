import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCy0VHOictdT4vcwe7qfJIoLTu39MVTxGg",
  authDomain: "nwitter-15b26.firebaseapp.com",
  projectId: "nwitter-15b26",
  storageBucket: "nwitter-15b26.appspot.com",
  messagingSenderId: "855131783183",
  appId: "1:855131783183:web:0e97704fd78a7b575fa37a"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = firebase.storage();