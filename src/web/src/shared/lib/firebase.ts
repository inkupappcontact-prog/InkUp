/**
 * Configuration et initialisation de Firebase pour InkUp.
 * Ce fichier centralise la configuration des services Firebase utilisés : Auth, Firestore et Storage.
 * Choix technique : Firebase pour rapidité de développement et scalabilité serverless.
 * Note : Analytics est désactivé pour éviter les erreurs et simplifier le MVP.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuration Firebase récupérée depuis les variables d'environnement
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Protection contre les clés manquantes
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  console.error('Firebase config missing: check .env.local for NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID');
  throw new Error('Firebase configuration is missing. Please set the environment variables in .env.local.');
}

// Initialisation sécurisée pour éviter les doublons (important pour Next.js hot reload)
let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (e) {
  console.error('Firebase init error:', e);
  throw e;
}

// Export des services pour utilisation dans l'app
export const auth = getAuth(app); // Authentification utilisateur
export const db = getFirestore(app); // Base de données Firestore
export const storage = getStorage(app); // Stockage des fichiers (images BD)
export const googleProvider = new GoogleAuthProvider(); // Provider pour connexion Google

export default app;
