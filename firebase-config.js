```js
// js/firebase-config.js

/**
 * 🔐 Configuration Firebase classique pour CyberBazaar
 * ➤ À utiliser dans un projet HTML avec <script>
 * ➤ Initialise Firebase, Auth et Firestore
 */

const firebaseConfig = {
  apiKey: "TA_CLE_API", // Ex: "AIzaSyA..."
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJET", // Ex: "cyberlab-bazaar"
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "TON_SENDER_ID", // Ex: "1234567890"
  appId: "TON_APP_ID" // Ex: "1:1234567890:web:abcd1234"
};

// ✅ Initialisation Firebase
firebase.initializeApp(firebaseConfig);

// 🔒 Authentification
const auth = firebase.auth();

// 📦 Firestore
const db = firebase.firestore();
```
