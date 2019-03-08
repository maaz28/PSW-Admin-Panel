import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCI8SYNxG5dVkm5WzzJ3dvDz2fS1SDFroU",
    authDomain: "pinksaltworks-a4004.firebaseapp.com",
    databaseURL: "https://pinksaltworks-a4004.firebaseio.com",
    projectId: "pinksaltworks-a4004",
    storageBucket: "pinksaltworks-a4004.appspot.com",
    messagingSenderId: "195459407092"
  };
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const db = firebase.database();
  export const storage = firebase.storage();
  export const api_base_url = "http://192.168.0.116:7001";