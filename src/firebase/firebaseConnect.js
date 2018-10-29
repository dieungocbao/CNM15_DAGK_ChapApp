import * as firebase from 'firebase/app'

var config = {
    apiKey: "AIzaSyDut3P7n3Q9nuYORlfOZ2z7tTUwN4rEkcc",
    authDomain: "chatapp-c4c08.firebaseapp.com",
    databaseURL: "https://chatapp-c4c08.firebaseio.com",
    projectId: "chatapp-c4c08",
    storageBucket: "",
    messagingSenderId: "285591580962"
};
export const firebaseConnect = firebase.initializeApp(config)