import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCHSwEoWO9euJQJln9JJsLCEesEduhiCV0",
  authDomain: "trolleybag-b5e9f.firebaseapp.com",
  databaseURL: "https://trolleybag-b5e9f.firebaseio.com",
  projectId: "trolleybag-b5e9f",
  storageBucket: "trolleybag-b5e9f.appspot.com",
  messagingSenderId: "72170775422",
  appId: "1:72170775422:web:edd50b51010acdbe55c92f",
  measurementId: "G-Q1355PJVD0"
};

firebase.initializeApp(config);

export default firebase;
