module.exports = {
  fireConfig: {
    apiKey: process.env.FIREBASE_PROD_API_KEY,
    authDomain: process.env.FIREBASE_PROD_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_PROD_DATABASEURL,
    projectId: process.env.FIREBASE_PROD_PROJECTID,
    storageBucket: process.env.FIREBASE_PROD_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_PROD_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_PROD_APP_ID,
  }
}
