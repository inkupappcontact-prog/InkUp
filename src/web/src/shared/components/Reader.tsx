'use client';

/**
 * Composant Reader pour l'affichage et la navigation dans une BD dans InkUp.
 * Simule le chargement des images depuis le dossier exemple de livre et bd.
 * Implémente une navigation simple avec boutons Précédent/Suivant et affichage du numéro de page.
 * Choix technique : Composant React fonctionnel avec useState pour la navigation, Tailwind CSS pour un style propre (fond noir, image centrée, navigation discrète).
 */

import { useState } from 'react';
import Image from 'next/image';

/**
 * Composant principal du lecteur de BD.
 * Gère l'état de la page actuelle et affiche l'image correspondante.
 */
export default function Reader() {
  // État pour la page actuelle (commence à 1)
  const [currentPage, setCurrentPage] = useState(1);

  // Nombre réel d'images disponibles
  const totalPages = 1;

  // Chemins vers les images réelles dans public/
  const pages = ['/test-bd/Capture d’écran 2025-10-24 173427.png'];

  // Sécurité : éviter le crash si le tableau est vide
  if (!pages || pages.length === 0) {
    return <div>Chargement de la BD...</div>;
  }

  /**
   * Fonction pour aller à la page précédente.
   * Vérifie que la page actuelle n'est pas la première.
   */
  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * Fonction pour aller à la page suivante.
   * Vérifie que la page actuelle n'est pas la dernière.
   */
  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* En-tête avec bouton retour et numéro de page */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <button
          onClick={() => window.history.back()}
          className="text-white hover:text-gray-300"
        >
          ← Retour
        </button>
        <span className="text-white">
          Page {currentPage} / {totalPages}
        </span>
        <div></div> {/* Espace pour équilibrer le layout */}
      </div>

      {/* Contenu principal : image centrée */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 p-2 rounded shadow-lg">
          <Image
            src={pages[currentPage - 1]} // Index basé sur 0
            alt={`Page ${currentPage}`}
            width={400}
            height={600}
            className="w-full h-auto max-h-[80vh] rounded"
          />
        </div>
      </div>

      {/* Navigation en bas : boutons discrets */}
      <div className="bg-gray-800 text-white p-4 flex justify-between">
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Précédent
        </button>
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
