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
        <title>INKUP - TEST MODIFICATION</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-black font-roboto">{children}</body>
    </html>
  )
}
