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

// ⚠️ S'assurer que firebase est initialisé avant ce fichier
// const auth = firebase.auth();  ← inutile ici si déjà défini globalement
// const db = firebase.firestore(); ← idem

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
      alert("✅ Compte créé avec succès!");
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
});
}

// 🛡️ Vérifie si utilisateur a accès à une page protégée
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
```
