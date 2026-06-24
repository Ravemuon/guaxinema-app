
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAlzRi2AaxmIUIXvgwzdyAG649RS6bgF_0",
  authDomain: "aaaa-cb4fb.firebaseapp.com",
  databaseURL: "https://aaaa-cb4fb-default-rtdb.firebaseio.com",
  projectId: "aaaa-cb4fb",
  storageBucket: "aaaa-cb4fb.firebasestorage.app",
  messagingSenderId: "742261303442",
  appId: "1:742261303442:web:708b47a69f9873230c5e4b",
  measurementId: "G-Z66WZN7NDQ"
};


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.database();
export const storage = firebase.storage();