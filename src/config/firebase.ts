// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBCXmLDVohlwR7pNCDXwGDT-jfn-cqowPE',
  authDomain: 'artist-portfolio-dd0b8.firebaseapp.com',
  projectId: 'artist-portfolio-dd0b8',
  storageBucket: 'gs://artist-portfolio-dd0b8',
  messagingSenderId: '434746963738',
  appId: '1:434746963738:web:e2076005ab966845c31ea3',
  measurementId: 'G-EQ220XGLYL',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
export const storage = getStorage(app)
