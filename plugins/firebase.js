import firebase from 'firebase';
const config = require('../config')
const fireConfig = config().fireConfig

let fireApp, adminApp
// adminApp = firebase.initializeApp(fireConfig, 'fireAdmin')
//check if firebaase instance is already initialized, otherwise initialize app
if (!fireApp && !firebase.apps.length) {
  fireApp = firebase.initializeApp(fireConfig)
  adminApp = firebase.initializeApp(fireConfig, 'fireAdmin')
} else {
  fireApp = firebase.app()
  adminApp = firebase.app('fireAdmin')
}

export {
  fireApp,
  adminApp
};
