import React from 'react';

/**
 * SkipLink - Lien d'évitement pour l'accessibilité (WCAG 2.4.1)
 * Permet aux utilisateurs de clavier de contourner la navigation et d'accéder directement au contenu principal
 */
const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                 bg-[#2563EB] text-white px-6 py-3 font-bold border-4 border-black 
                 shadow-[6px_6px_0px_0px_#000] z-50 transform -rotate-1"
    >
      Aller au contenu principal
    </a>
  );
};

export default SkipLink;
