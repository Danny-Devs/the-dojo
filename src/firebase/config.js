import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBbTu3mxDrJqIK6hDqLNTu8nuV3T9rBUwY',
  authDomain: 'thedojosite-c048c.firebaseapp.com',
  projectId: 'thedojosite-c048c',
  storageBucket: 'thedojosite-c048c.appspot.com',
  messagingSenderId: '619935101995',
  appId: '1:619935101995:web:3ffffc4d87e68a4eaf266e',
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
