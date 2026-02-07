/**
 * Hook personnalisé pour gérer l'état d'authentification dans InkUp.
 * Utilise onAuthStateChanged pour écouter les changements d'état utilisateur.
 * Récupère les données supplémentaires depuis Firestore (rôle, balance, etc.).
 * Choix technique : Hook React pour centraliser la logique auth et éviter la répétition.
 */

import { useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

/**
 * Hook pour l'authentification utilisateur.
 * @returns {Object} Objet contenant :
 * - user: Utilisateur Firebase actuel ou null.
 * - userData: Données Firestore de l'utilisateur (rôle, balance, etc.).
 * - loading: Booléen indiquant si l'état est en chargement.
 * - logout: Fonction pour déconnecter l'utilisateur.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Écoute les changements d'état d'authentification (persistance automatique)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Récupération des données utilisateur depuis Firestore
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          // Cas rare : document non trouvé, utiliser valeurs par défaut
          setUserData({ role: 'reader', balance: 0, premium: false });
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsubscribe; // Nettoyage à la destruction du composant
  }, []);

  /**
   * Fonction pour déconnecter l'utilisateur.
   * Utilise signOut de Firebase Auth.
   */
  const logout = async () => {
    await signOut(auth);
  };

  return { user, userData, loading, logout };
}
