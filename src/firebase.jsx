import firebase from "firebase";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyACRp3yUFm81W_LSgAv3mVd38RMlMHIZIo",
  authDomain: "movie-94ede.firebaseapp.com",
  databaseURL: "https://movie-94ede.firebaseio.com",
  projectId: "movie-94ede",
  storageBucket: "movie-94ede.appspot.com",
  messagingSenderId: "959975355267",
  appId: "1:959975355267:web:71f0980b8d2d0f954cfcb6",
  measurementId: "G-W9XWETX8J4"
};
firebase.initializeApp(config);
export default firebase;
