import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCi_g_9eUE8B2axyPwihd_GLReVh_V8Gjk",
  authDomain: "dagk-1512023.firebaseapp.com",
  databaseURL: "https://dagk-1512023.firebaseio.com",
  projectId: "dagk-1512023",
  storageBucket: "dagk-1512023.appspot.com",
  messagingSenderId: "732471646264"
};


firebase.initializeApp(config)
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
