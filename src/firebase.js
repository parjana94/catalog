// firebase.js

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, get } from 'firebase/database'; // ✅ get დაემატა

const firebaseConfig = {
  apiKey: "AIzaSyDbGwE2t8ztka8dzXO-3K1hhOEb9GkkStA",
  authDomain: "saojaxo-catalog.firebaseapp.com",
  projectId: "saojaxo-catalog",
  storageBucket: "saojaxo-catalog.firebasestorage.app",
  messagingSenderId: "747006113334",
  appId: "1:747006113334:web:56c34fadf3c40ffad3ca97"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, push, get }; // ✅ get დაემატა ექსპორტშიც
