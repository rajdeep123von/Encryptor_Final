import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyA_fdJtcdLppfqZqOoZ646nRjyJ8idZJ5I",
  authDomain: "survey-master-32b77.firebaseapp.com",
  databaseURL: "https://survey-master-32b77-default-rtdb.firebaseio.com",
  projectId: "survey-master-32b77",
  storageBucket: "survey-master-32b77.appspot.com",
  messagingSenderId: "12296738115",
  appId: "1:12296738115:web:121f52bca9bc244b4a0bf6"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();