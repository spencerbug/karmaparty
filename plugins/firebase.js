import firebase from 'firebase';
const config = require('../config')
const fireConfig = config().fireConfig

let fireApp = null;

//check if firebaase instance is already initialized, otherwise initialize app
if (!fireApp && !firebase.apps.length) {
  fireApp = firebase.initializeApp(fireConfig)
} else {
  fireApp = firebase.app()
}

export default fireApp;
