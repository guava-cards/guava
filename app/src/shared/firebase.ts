import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC6_1QDwi-ISMZsWG2zsEGd2nCyy1t2BUI',
  authDomain: 'guava-cards.firebaseapp.com',
  projectId: 'guava-cards',
  storageBucket: 'guava-cards.appspot.com',
  messagingSenderId: '470799796122',
  appId: '1:470799796122:web:0250e0eab8ab6080c3dc23',
  measurementId: 'G-L1FQL3700T',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
