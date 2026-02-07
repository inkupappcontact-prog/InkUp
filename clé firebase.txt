// Import des fonctions nécessaires du SDKs
// Nous importons UNIQUEMENT ce qui est nécessaire pour l'authentification et les données
// et qui fonctionne côté serveur ET client.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// !! NOTE : Nous n'importons PAS getAnalytics, c'est la source de l'erreur.

// --- VOTRE CONFIGURATION (Remplacez [VOS CLÉS] par vos vraies informations) ---
// Vous pouvez les trouver dans votre console Firebase -> Paramètres du projet
const firebaseConfig = {
  // CLÉS OBLIGATOIRES POUR LA CONNEXION
  apiKey: "AIzaSyBmnlppr7BlH7Wydc_yqcS8RyQOrUFr-jI", 
  authDomain: "inkup-prod.firebaseapp.com", 
  projectId: "inkup-prod", 
  storageBucket: "inkup-prod.firebasestorage.app", 
  messagingSenderId: "816580244359", 
  appId: "1:816580244359:web:1d21071c51c2857f1a5922", 
  // measurementId: "[VOTRE_MEASUREMENT_ID]" <- Nous laissons Analytics de côté pour l'instant.
};
// --- FIN DE LA CONFIGURATION ---


// Initialisation de Firebase (Sécurisée pour Next.js)
// Cette fonction vérifie si l'application est déjà initialisée (ce qui arrive avec le "hot reload" de Next.js)
// avant d'essayer d'en créer une nouvelle.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporter les services principaux que nous utiliserons dans toute l'application
// C'est cette partie qui corrige le bug "Export 'auth' doesn't exist"
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };