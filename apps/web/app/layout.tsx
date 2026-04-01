/**
 * Layout racine pour InkUp.
 * Définit la structure HTML de base pour toutes les pages.
 * Choix technique : Layout standard Next.js App Router avec <html> et <body>.
 */

import './globals.css';
import { Roboto, Bangers, Comic_Neue } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const bangers = Bangers({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const comicNeue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${roboto.className}`}>
      <head>
        <title>INKUP - La Révolution de la BD</title>
        <meta
          name="description"
          content="Découvrez des bandes dessinées exclusives et soutenez directement les créateurs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`bg-white text-black antialiased ${bangers.className} ${comicNeue.className}`}>{children}</body>
    </html>
  );
}
