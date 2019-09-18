const functions = require('firebase-functions');
const {
    Nuxt
} = require('nuxt');

//load env variables to firebase
const config = functions.config();
for (const key in config.envs) {
    process.env["NODE_ENV_" + key.toUpperCase()] = config.envs[key];
}

const nuxtConfig = require('./nuxt.config.firebase.js')

const nuxt = new Nuxt(nuxtConfig);

exports.ssr = functions.https.onRequest(nuxt.render);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});