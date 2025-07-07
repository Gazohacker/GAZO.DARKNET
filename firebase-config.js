```js
// firebase-config.js

/**
 * 🔗 Doc Firebase Auth officielle (FR):
 * https://firebase.google.com/docs/auth?authuser=0&_gl=1*1lbx3h2*_ga*MTg1MzI2NjQ2Ni4xNzUxODQzMTUy*_ga_CW55HF8NVT*czE3NTE4NzQxMDgkbzIkZzEkdDE3NTE4NzQxMTgkajUwJGwwJGgw&hl=fr#how_does_it_work
*
 * Ce fichier contient:
 * ✅ La configuration Firebase
 * ✅ L'initialisation de Firestore
 * ✅ La gestion de l’auth par email/mot de passe (inscription + connexion + déconnexion)
 */

const firebaseConfig = {
  apiKey: "AJzaSyFAKEEXAMPLEKey-DoNotUseInProduction",
  authDomain: "cyberlabbazaar.firebaseapp.com",
  projectId: "cyberlabbazaar",
  storageBucket: "cyberlabbazaar.appspot.com",
  messagingSenderId: "999999999999",
  appId: "1:999999999999:web:exampleapikey123"
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Fonction: inscription avec email / mot de passe
function inscription(email, motDePasse) {
  return auth.createUserWithEmailAndPassword(email, motDePasse)
.then(userCredential => {
      console.log("✅ Utilisateur inscrit:", userCredential.user);
})
.catch(error => {
      console.error("❌ Erreur d'inscription:", error.message);
});
}

// Fonction: connexion avec email / mot de passe
function connexion(email, motDePasse) {
  return auth.signInWithEmailAndPassword(email, motDePasse)
.then(userCredential => {
      console.log("✅ Connecté:", userCredential.user);
})
.catch(error => {
      console.error("❌ Erreur de connexion:", error.message);
});
}

// Fonction: déconnexion
function deconnexion() {
  return auth.signOut()
.then(() => {
      console.log("👋 Déconnecté");
})
.catch(error => {
      console.error("❌ Erreur de déconnexion:", error.message);
});
}```
