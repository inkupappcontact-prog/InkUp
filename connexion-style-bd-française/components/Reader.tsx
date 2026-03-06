import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Sun, Moon, Maximize } from 'lucide-react';

interface ReaderProps {
  title: string;
  pages: string[];
  onClose: () => void;
}

const Reader: React.FC<ReaderProps> = ({ title, pages, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Palette de couleurs pour accessibilité (Contraste > 7:1)
  // Dark Mode : Pas de noir pur (#000) pour éviter le "smearing" sur OLED et la fatigue oculaire.
  const theme = isDarkMode
    ? { bg: 'bg-[#1A1A1A]', text: 'text-[#E5E5E5]', ui: 'bg-[#2D2D2D] border-[#404040]', icon: 'text-[#E5E5E5]' }
    : { bg: 'bg-[#F5F5F5]', text: 'text-[#1A1A1A]', ui: 'bg-white border-black', icon: 'text-black' };

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(p => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  const handleZoomIn = () => setZoomLevel(z => Math.min(z + 0.5, 3));
  const handleZoomOut = () => setZoomLevel(z => Math.max(z - 0.5, 1));

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${theme.bg} transition-colors duration-300`}>

      {/* Top Bar Accessible */}
      <header className={`h-16 flex items-center justify-between px-4 border-b-2 ${isDarkMode ? 'border-[#404040]' : 'border-black'} z-50`}>
        <div className="flex items-center gap-4">
            <button
                onClick={onClose}
                className={`w-11 h-11 flex items-center justify-center rounded border-2 ${isDarkMode ? 'border-[#E5E5E5] hover:bg-[#404040]' : 'border-black hover:bg-gray-200'} transition-colors focus:outline-none focus:ring-4 focus:ring-[#2563EB]`}
                aria-label="Fermer le lecteur et retourner au tableau de bord"
            >
                <ArrowLeft className={`w-6 h-6 ${theme.icon}`} />
            </button>
            <h1 className={`font-['Bangers'] text-xl tracking-wide truncate max-w-[200px] sm:max-w-md ${theme.text}`}>
                {title} <span className="text-sm font-sans font-normal opacity-70 ml-2">(Page {currentPage + 1}/{pages.length})</span>
            </h1>
        </div>

        <div className="flex items-center gap-2">
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-11 h-11 flex items-center justify-center rounded border-2 ${isDarkMode ? 'border-[#E5E5E5]' : 'border-black'} ${theme.ui}`}
                aria-label={isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"}
            >
                {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-black" />}
            </button>
        </div>
      </header>

      {/* Zone de Lecture (Scrollable & Zoomable) */}
      <main className="flex-1 overflow-hidden relative flex items-center justify-center p-4">
          <div
            className="transition-transform duration-200 ease-out origin-center shadow-2xl"
            style={{ transform: `scale(${zoomLevel})` }}
          >
              <img
                src={pages[currentPage]}
                alt={`Planche numéro ${currentPage + 1} de ${title}`}
                className="max-h-[80vh] w-auto object-contain border-4 border-black bg-white"
              />
          </div>
      </main>

      {/* Bottom Controls (Large Touch Targets for Accessibility) */}
      <footer className={`h-20 ${theme.ui} border-t-2 ${isDarkMode ? 'border-[#404040]' : 'border-black'} flex items-center justify-center gap-4 sm:gap-8 px-4`}>

          {/* Zoom Controls (Hidden on small mobile if needed, but kept for inclusion) */}
          <div className="hidden sm:flex gap-2 mr-4">
              <button onClick={handleZoomOut} className={`w-11 h-11 flex items-center justify-center border-2 rounded ${theme.icon} ${isDarkMode ? 'border-gray-500' : 'border-black'}`} aria-label="Dézoomer la planche">
                  <ZoomOut className="w-6 h-6" />
              </button>
              <button onClick={handleZoomIn} className={`w-11 h-11 flex items-center justify-center border-2 rounded ${theme.icon} ${isDarkMode ? 'border-gray-500' : 'border-black'}`} aria-label="Zoomer sur la planche">
                  <ZoomIn className="w-6 h-6" />
              </button>
          </div>

          {/* Navigation Principale */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`w-14 h-14 flex items-center justify-center border-2 rounded-full ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95'} ${theme.icon} ${isDarkMode ? 'border-[#E5E5E5] bg-[#404040]' : 'border-black bg-white'}`}
            aria-label="Lire la page précédente"
          >
              <ChevronLeft className="w-8 h-8" />
          </button>

          <div className={`font-bold font-mono text-lg ${theme.text}`}>
             {currentPage + 1} / {pages.length}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === pages.length - 1}
            className={`w-14 h-14 flex items-center justify-center border-2 rounded-full ${currentPage === pages.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95'} ${theme.icon} ${isDarkMode ? 'border-[#E5E5E5] bg-[#404040]' : 'border-black bg-white'}`}
            aria-label="Lire la page suivante"
          >
              <ChevronRight className="w-8 h-8" />
          </button>

      </footer>
    </div>
  );
};

export default Reader;