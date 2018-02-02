import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

firebase.initializeApp({
  apiKey: "AIzaSyCBGrlmTBOlPMbzGrQH4_Spn83VtNOA9W8",
  authDomain: "twfood-3bd9e.firebaseapp.com",
  databaseURL: "https://twfood-3bd9e.firebaseio.com",
  projectId: "twfood-3bd9e",
  storageBucket: "twfood-3bd9e.appspot.com",
  messagingSenderId: "371619992544"
});

export default firebase;