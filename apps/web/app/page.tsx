'use client';

import Link from 'next/link';
import InkUpLogo from '@/components/ui/InkUpLogo';
import ComicButton from '@/components/ui/ComicButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <InkUpLogo className="mb-8 w-48 h-auto" />
      <h1 className="text-4xl font-bold mb-4 text-blue-500">Bienvenue sur InkUp</h1>
      <p className="text-lg text-center mb-8 max-w-md">
        La plateforme pour les artistes de bande dessinée indépendants et leurs lecteurs passionnés.
        Découvrez, partagez et achetez des BD uniques.
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <ComicButton variant="primary">Se connecter</ComicButton>
        </Link>
        <Link href="/signup">
          <ComicButton variant="secondary">S'inscrire</ComicButton>
        </Link>
      </div>
    </div>
  );
}
