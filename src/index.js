import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App/App";
import { Provider } from "react-redux";
import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from "firebase/app";

const rootReducer = combineReducers({
  firebase: firebaseReducer
});

const config = {
  userProfile: "users", // firebase root where user profiles are stored
  enableLogging: false // enable/disable Firebase's database logging
};
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, config))(
  createStore
);
const store = createStoreWithFirebase(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
