import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAyPgGZM_tlPObN5IlCV_E36wMspcfK-2g",
  authDomain: "challenge-3c812.firebaseapp.com",
  databaseURL: "https://challenge-3c812.firebaseio.com",
  projectId: "challenge-3c812",
  storageBucket: "challenge-3c812.appspot.com",
  messagingSenderId: "914152595823",
  appId: "1:914152595823:web:038b54d82025396c56c89a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export { db, auth };
