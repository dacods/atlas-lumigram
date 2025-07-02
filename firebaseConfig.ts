// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';      
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj3eb14eevqq2seYRKj85ovCSm714kqCo",
  authDomain: "lumigram-fd85b.firebaseapp.com",
  projectId: "lumigram-fd85b",
  storageBucket: "lumigram-fd85b.firebasestorage.app",
  messagingSenderId: "756067893318",
  appId: "1:756067893318:web:a248958c05404285be8a47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});