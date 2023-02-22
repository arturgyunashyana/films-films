import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCGRG94B4Kh4wNoxufI__btUbMPaHDbeuo",
    authDomain: "film-project-2f919.firebaseapp.com",
    projectId: "film-project-2f919",
    storageBucket: "film-project-2f919.appspot.com",
    messagingSenderId: "847462387187",
    appId: "1:847462387187:web:121178ce610b0199919686"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)