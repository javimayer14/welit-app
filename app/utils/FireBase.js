import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDtkVn8tdGkq9nrPVcFh9oJuFUIAlKON4c",
  authDomain: "welit-3d309.firebaseapp.com",
  databaseURL: "https://welit-3d309.firebaseio.com",
  projectId: "welit-3d309",
  storageBucket: "welit-3d309.appspot.com",
  messagingSenderId: "78012021760",
  appId: "1:78012021760:web:ede0b65e21f10c0541ece5"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
