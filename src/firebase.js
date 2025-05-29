import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDbGwE2t8ztka8dzXO-3K1hhOEb9GkkStA",
  authDomain: "saojaxo-catalog.firebaseapp.com",
  databaseURL: "https://saojaxo-catalog-default-rtdb.firebaseio.com", // ✅ ეს დაამატე
  projectId: "saojaxo-catalog",
  storageBucket: "saojaxo-catalog.appspot.com", // ✅ აქაც პატარა შეცდომა直 – უნდა იყოს .app**spot**.com
  messagingSenderId: "747006113334",
  appId: "1:747006113334:web:56c34fadf3c40ffad3ca97"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, push, get };