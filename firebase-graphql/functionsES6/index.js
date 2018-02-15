// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


import { https } from 'firebase-functions'
import setupGraphQLServer from './graphql/server'

/* CF for Firebase with graphql-server-express */
const graphQLServer = setupGraphQLServer()

// https://us-central1-<project-name>.cloudfunctions.net/api
export const api = https.onRequest(graphQLServer)
