'use client';

/**
 * Page d'accueil d'InkUp.
 * Affiche l'état de connexion de l'utilisateur, liens vers fonctionnalités, accès au dashboard pour auteurs.
 * Utilise le hook useAuth pour gérer l'affichage conditionnel.
 * Choix technique : Client component pour interactions dynamiques, Tailwind pour styling.
 */

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/shared/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { Upload, LogOut } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  console.log("Utilisateur actuel :", user);

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div className="bg-white text-black min-h-screen flex items-center justify-center">Chargement...</div>;

  if (!user) return null;

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-zinc-900 border-violet-500">
        <CardContent className="text-center">
          <h1 className="text-white text-4xl font-bold mb-8">Bienvenue, {user.displayName || user.email}!</h1>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-xl transition-all hover:scale-105 mb-4"><span><Upload className="inline mr-2" />Publier un Chapitre</span></Button>
          <Button variant="outline" onClick={() => signOut(auth)}><span><LogOut className="inline mr-2" />Se déconnecter</span></Button>
        </CardContent>
      </Card>
    </div>
  );
}
