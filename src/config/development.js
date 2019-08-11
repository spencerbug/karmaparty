module.exports = {
  fireConfig: {
    apiKey: process.env.FIREBASE_DEV_API_KEY,
    authDomain: process.env.FIREBASE_DEV_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DEV_DATABASEURL,
    projectId: process.env.FIREBASE_DEV_PROJECTID,
    storageBucket: process.env.FIREBASE_DEV_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_DEV_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_DEV_APP_ID,
  }
}
