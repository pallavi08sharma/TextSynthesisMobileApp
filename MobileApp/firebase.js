import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useState,useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import {API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID,MEASUREMENT_ID,APP_ID} from '@env'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
initializeApp(firebaseConfig)
const auth=getAuth()
const db= getFirestore()

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function updateProfileUser(currentUserName,displayNameUser) {
  return updateProfile(auth.currentUser,{displayName:displayNameUser})
}
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

//const db = firebase.firestore();
export {auth,db};