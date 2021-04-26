import firebase from 'firebase/app';
import 'firebase/storage'

  var firebaseConfig = {
    apiKey: "AIzaSyBE517VUZxEBnffh9QaTL5SoDcpxwrTfyM",
    authDomain: "blood-bank-app-27673.firebaseapp.com",
    projectId: "blood-bank-app-27673",
    storageBucket: "blood-bank-app-27673.appspot.com",
    messagingSenderId: "848781150247",
    appId: "1:848781150247:web:335f4ba07d840fb98b2602",
    measurementId: "G-E4QM9C2G54"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const Storage=firebase.storage();
  
export default Storage;