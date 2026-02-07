/**
 * Page d'inscription pour InkUp.
 * Permet aux nouveaux utilisateurs de créer un compte avec email/mot de passe ou Google.
 * Crée un document utilisateur dans Firestore avec rôle sélectionné.
 * Choix technique : Client component pour interactions dynamiques, validation côté client.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/shared/lib/firebase';

/**
 * Composant de la page d'inscription.
 * Gère la soumission des formulaires et la création d'utilisateur.
 */
export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  /**
   * Validation basique de l'email.
   * @param {string} email - Adresse email à valider.
   * @returns {boolean} True si valide.
   */
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  /**
   * Gestionnaire pour l'inscription avec email.
   * Valide les entrées, crée l'utilisateur, enregistre en Firestore, redirige.
   * @param {React.FormEvent} e - Événement de formulaire.
   */
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Email invalide');
      return;
    }
    if (password.length < 6) {
      setError('Mot de passe trop court (min 6 caractères)');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Création du document utilisateur avec rôle
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: isAuthor ? 'author' : 'reader',
        balance: 0,
        premium: false,
        profile: {},
      });
      router.push('/'); // Redirection vers l'accueil après succès
    } catch (err: any) {
      setError(err.message); // Affichage de l'erreur Firebase
    }
  };

  /**
   * Gestionnaire pour l'inscription avec Google.
   * Utilise signInWithPopup, crée le document utilisateur par défaut.
   */
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'reader', // Rôle par défaut pour Google
        balance: 0,
        premium: false,
        profile: {},
      });
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // JSX avec formulaire et gestion d'erreurs
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">S'inscrire sur InkUp</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleEmailSignup}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="isAuthor"
              name="isAuthor"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={isAuthor}
              onChange={(e) => setIsAuthor(e.target.checked)}
            />
            <label htmlFor="isAuthor" className="ml-2 block text-sm text-gray-900">
              Je suis auteur
            </label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              S'inscrire
            </button>
          </div>
        </form>
        <div>
          <button
            onClick={handleGoogleSignup}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            S'inscrire avec Google
          </button>
        </div>
      </div>
    </div>
  );
}
