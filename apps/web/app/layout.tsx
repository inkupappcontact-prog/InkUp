/**
 * Layout racine pour InkUp.
 * Définit la structure HTML de base pour toutes les pages.
 * Choix technique : Layout standard Next.js App Router avec <html> et <body>.
 */

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <title>INKUP - La Révolution de la BD</title>
        <meta name="description" content="Découvrez des bandes dessinées exclusives et soutenez directement les créateurs" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Bangers&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white text-black font-roboto antialiased">{children}</body>
    </html>
  )
}
