import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBl3EvqRmVId5GsO_y6iuJ1kc0Mvx0-RWg",
    authDomain: "psw-admin-panel.firebaseapp.com",
    databaseURL: "https://psw-admin-panel.firebaseio.com",
    projectId: "psw-admin-panel",
    storageBucket: "",
    messagingSenderId: "946056660894"
  };
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const db = firebase.database();
  export const storage = firebase.storage();
  export const api_base_url = "http://localhost:7001";