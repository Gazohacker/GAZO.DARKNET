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

// ⚠️ S'assurer que firebase est bien initialisé avant ce fichier
// const auth = firebase.auth(); ← déjà défini dans firebase-config.js
// const db = firebase.firestore(); ← idem

// ✅ Inscription (appelée dans register.html)
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
      alert("✅ Compte créé avec succès!");
      window.location.href = "dashboard.html";
})
.catch(err => {
      console.error("❌ Erreur inscription:", err.message);
      alert("Erreur: " + err.message);
});
}

// 🔓 Connexion (appelée dans login.html)
function connecter(email, password) {
  auth.signInWithEmailAndPassword(email, password)
.then(cred => {
      return db.collection("users").doc(cred.user.uid).get();
})
.then(doc => {
      if (doc.exists) {
        const role = doc.data().role;
        redirigerParRole(role);
} else {
        throw new Error("Utilisateur non trouvé dans Firestore.");
}
})
.catch(err => {
      console.error("❌ Erreur connexion:", err.message);
      alert("Erreur: " + err.message);
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
      console.log("👋 Déconnecté avec succès");
      window.location.href = "login.html";
})
.catch(err => {
      console.error("❌ Erreur déconnexion:", err.message);
      alert("Erreur: " + err.message);
});
}

// 🛡️ Vérifie si utilisateur connecté a accès à une page protégée
function verifierAccesAutorise(rolesAutorises = []) {
  auth.onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get()
.then(doc => {
          if (doc.exists) {
            const role = doc.data().role;
            if (!rolesAutorises.includes(role)) {
              alert("⛔ Accès refusé pour ce rôle.");
              window.location.href = "login.html";
}
} else {
            alert("⛔ Utilisateur non reconnu.");
            window.location.href = "login.html";
}
})
.catch(err => {
          console.error("❌ Erreur de vérification:", err.message);
          window.location.href = "login.html";
});
} else {
      // Non connecté
      window.location.href = "login.html";
}
});
}

// 🔑 Connexion avec Google
function connexionGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
.then(result => {
      const user = result.user;

      return db.collection("users").doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        pseudo: user.displayName || "AgentX",
        role: "client",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
}, { merge: true});
})
.then(() => {
      window.location.href = "dashboard.html";
})
.catch(error => {
      console.error("❌ Connexion Google échouée:", error.message);
      alert("Erreur: " + error.message);
});
}
```
