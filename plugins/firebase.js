import firebase from 'firebase';

const fireConfig = {
  apiKey: "AIzaSyCW-rO0UxHm9YuV_x0nbi5CXoy5vLOTaPk",
  authDomain: "ecommerce-8f3d4.firebaseapp.com",
  databaseURL: "https://ecommerce-8f3d4.firebaseio.com",
  projectId: "ecommerce-8f3d4",
  storageBucket: "ecommerce-8f3d4.appspot.com",
  messagingSenderId: "292362801012",
  appId: "1:292362801012:web:0d2a5c598bcac7ef"
};


let firApp;

//check if firebaase instance is already initialized, otherwise initialize app
if (!fireApp && !firebase.apps.length) {
  fireApp = firebase.initializeApp(fireConfig)
} else {
  fireApp = firebase.app()
}

export default fireApp;
