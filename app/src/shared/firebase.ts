import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyC6_1QDwi-ISMZsWG2zsEGd2nCyy1t2BUI',
    authDomain: 'guava-cards.firebaseapp.com',
    projectId: 'guava-cards',
    storageBucket: 'guava-cards.appspot.com',
    messagingSenderId: '470799796122',
    appId: '1:470799796122:web:0250e0eab8ab6080c3dc23',
    measurementId: 'G-L1FQL3700T',
  })
}

export { firebase }
