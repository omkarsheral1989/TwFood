import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: "AIzaSyCyfMa1zkydaN8zTi7lWOoUI9I7gEDpx6o",
  authDomain: "temp-51f90.firebaseapp.com",
  databaseURL: "https://temp-51f90.firebaseio.com",
  projectId: "temp-51f90",
  storageBucket: "temp-51f90.appspot.com",
  messagingSenderId: "818180391362"
});

export default firebase;