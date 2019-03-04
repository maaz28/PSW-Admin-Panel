import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCnVkoC2huB1dkhckDS9asn7XxzMKrPhnQ",
    authDomain: "buildability-fe26b.firebaseapp.com",
    databaseURL: "https://buildability-fe26b.firebaseio.com",
    projectId: "buildability-fe26b",
    storageBucket: "buildability-fe26b.appspot.com",
    messagingSenderId: "39614072054"
  };
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const api_base_url = "http://localhost:4000";
  export const db = firebase.database();