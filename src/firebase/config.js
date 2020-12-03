import firebase from "firebase/app"

import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSANGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_MESSANGING_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MESSANGING_MEASUREMENT_ID
})

export const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const auth = app.auth()

export const storage = app.storage()

export const database = app.firestore()

export default app