```js
// js/auth.js

/**
 * 🔐 Authentification Firebase complète
 * Basée sur: https://firebase.google.com/docs/auth?hl=fr
 * Contient:
 * ✅ Inscription
 * ✅ Connexion
 * ✅ Déconnexion
 * ✅ Rôles + redirection personnalisée
 * ✅ Sécurisation d’accès aux pages
 */

const auth = firebase.auth();
const db = firebase.firestore();

// ✅ Inscription (à utiliser sur register.html)
function inscrire(email, password, pseudo, role = "client") {
  auth.createUserWithEmailAndPassword(email, password)
.then(cred => {
      return db.collection("users").doc(cred.user.uid).set({
        uid: cred.user.uid,
        email,
        pseudo,
        role,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
});
})
.then(() => {
      alert("✅ Compte créé!");
      window.location.href = "dashboard.html";
})
.catch(err => {
      console.error("❌ Erreur inscription:", err.message);
      alert("Erreur: " + err.message);
});
}

// 🔓 Connexion
function connecter(email, password) {
  auth.signInWithEmailAndPassword(email, password)
.then(cred => {
      return db.collection("users").doc(cred.user.uid).get();
})
.then(doc => {
      const role = doc.data().role;
      redirigerParRole(role);
})
.catch(err => {
      console.error("❌ Erreur connexion:", err.message);alert("Erreur: " + err.message);
});
}

// 🔁 Redirection selon rôle
function redirigerParRole(role) {
  switch (role) {
    case "admin":
      window.location.href = "admin.html";
      break;
    case "vendeur":
      window.location.href = "vendor-dashboard.html";
      break;
    default:
      window.location.href = "dashboard.html";
}
}

// 🚪 Déconnexion
function deconnecter() {
  auth.signOut()
.then(() => {
      console.log("👋 Déconnecté");
      window.location.href = "login.html";
});
}

// 🛡️ Vérifie si utilisateur a accès
function verifierAccesAutorise(rolesAutorises = []) {
  auth.onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(doc => {
        const role = doc.data().role;
        if (!rolesAutorises.includes(role)) {
          alert("⛔ Accès refusé.");
          window.location.href = "login.html";
}
});
} else {
      window.location.href = "login.html";
}
});
}
```
