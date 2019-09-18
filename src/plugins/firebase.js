// import firebase from 'firebase';
var firebase = require("firebase/app")
require("firebase/auth")
require("firebase/database")
require("firebase/storage")

const fireConfig = {
  apiKey: process.env.NUXT_ENV_APIKEY,
  authDomain: process.env.NUXT_ENV_AUTHDOMAIN,
  databaseURL: process.env.NUXT_ENV_DATABASEURL,
  projectId: process.env.NUXT_ENV_PROJECTID,
  storageBucket: process.env.NUXT_ENV_STORAGEBUCKET,
  messagingSenderId: process.env.NUXT_ENV_MESSAGINGSENDERID,
  appId: process.env.NUXT_ENV_APPID
}

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