import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDwgpb-2pA_Gc57to_S3AdINUVbYkkyDZw",
    authDomain: "tracker-f21a9.firebaseapp.com",
    projectId: "tracker-f21a9",
    storageBucket: "tracker-f21a9.appspot.com",
    messagingSenderId: "754353663591",
    appId: "1:754353663591:web:c069497d5635510bb12ec2",
    measurementId: "G-PWTC0M0FH9"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)