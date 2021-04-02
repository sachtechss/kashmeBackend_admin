import firebase from "firebase";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAlQc2bVagaa845o3AQ9ATkZnvR8slSkoo",
    authDomain: "yellow-cow-5ee20.firebaseapp.com",
    databaseURL: "https://yellow-cow-5ee20.firebaseio.com",
    projectId: "yellow-cow-5ee20",
    storageBucket: "yellow-cow-5ee20.appspot.com",
    messagingSenderId: "1056487033088",
    appId: "1:1056487033088:web:968ffd14b03cebd1af8be5",
    measurementId: "G-TC7XSE80WQ"
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};
