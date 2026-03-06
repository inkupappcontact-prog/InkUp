import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, BookOpen, Settings } from 'lucide-react';
import ComicButton from './ui/ComicButton';

interface ReaderProps {
  title: string;
  pages: string[];
  onClose: () => void;
}

const Reader: React.FC<ReaderProps> = ({ title, pages, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        prevPage();
        break;
      case 'ArrowRight':
        nextPage();
        break;
      case 'Escape':
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
        break;
      case 'f':
      case 'F':
        handleToggleFullscreen();
        break;
    }
  };

  return (
    <div
      className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'min-h-screen bg-black'} flex flex-col`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="bg-white border-b-4 border-black p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 border-2 border-black hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-['Bangers'] text-xl">{title}</h1>
              <p className="text-sm text-gray-600">
                Page {currentPage + 1} sur {pages.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFullscreen}
              className="p-2 border-2 border-black hover:bg-gray-100"
              title="Plein écran (F)"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button className="p-2 border-2 border-black hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Page précédente */}
        {currentPage > 0 && (
          <button
            onClick={prevPage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition-colors"
            title="Page précédente (←)"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Image */}
        <div className={`${isFullscreen ? 'max-w-full max-h-full' : 'max-w-4xl'} flex items-center justify-center`}>
          <img
            src={pages[currentPage]}
            alt={`Page ${currentPage + 1}`}
            className={`object-contain ${isFullscreen ? 'max-w-full max-h-full' : 'max-w-full max-h-[80vh]'} border-4 border-white`}
          />
        </div>

        {/* Page suivante */}
        {currentPage < pages.length - 1 && (
          <button
            onClick={nextPage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition-colors"
            title="Page suivante (→)"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t-4 border-black p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ComicButton
              onClick={prevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </ComicButton>

            <div className="flex items-center gap-2">
              {[...Array(Math.min(pages.length, 5))].map((_, index) => {
                const pageIndex = index;
                return (
                  <button
                    key={pageIndex}
                    onClick={() => setCurrentPage(pageIndex)}
                    className={`w-3 h-3 rounded-full border-2 border-black ${
                      currentPage === pageIndex ? 'bg-[#2563EB]' : 'bg-gray-300'
                    }`}
                  />
                );
              })}
            </div>

            <ComicButton
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className="flex items-center gap-2"
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </ComicButton>
          </div>

          <div className="text-sm text-gray-600">
            Utilisez les flèches ← → pour naviguer
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
