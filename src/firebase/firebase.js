import { initializeApp } from "firebase/app"

import {
    getFirestore
} from "firebase/firestore"

const firebaseConfig = {

    apiKey: "AIzaSyC0z-hiJm8Nl1GBMU9VkCVLBNyQpxVUQtk",

    authDomain: "flowers-crochet.firebaseapp.com",

    projectId: "flowers-crochet",

    storageBucket: "flowers-crochet.firebasestorage.app",

    messagingSenderId: "1013839900110",

    appId: "1:1013839900110:web:16a62a62e97f81ef5c8f9f",

    measurementId: "G-NP3TTDNTZW"

}

const app =
    initializeApp(firebaseConfig)

export const db =
    getFirestore(app)