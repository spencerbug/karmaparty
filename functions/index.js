const functions = require('firebase-functions');
const {
    Nuxt
} = require('nuxt')
const express = require('express')

const app = express()

const config = {
    dev: false,
    buildDir: '.nuxt',
    build: {
        publicPath: 'public',
    }
}

const nuxt = new Nuxt(config);

app.use(nuxt.render);

function handleRequest(req, res) {
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
    nuxt.renderRoute('/').then(result => {
        res.send(result.html)
    }).catch(e => {
        res.send(e)
    })
}
app.get('*', handleRequest)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.ssr = functions.https.onRequest(app);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});