import React from 'react';

const Reader: React.FC<{ title: string; pages: string[]; onClose: () => void }> = ({ title, pages, onClose }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-black border-b-4 border-[#2563EB] p-4 flex justify-between items-center">
        <h1 className="font-['Bangers'] text-2xl text-[#2563EB]">{title}</h1>
        <button
          onClick={onClose}
          className="bg-[#2563EB] text-black px-4 py-2 font-bold border-2 border-black hover:bg-[#FF6B35] transition-colors"
        >
          Fermer
        </button>
      </div>

      {/* Reader Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="bg-gray-900 border-4 border-[#2563EB] rounded-lg overflow-hidden">
            <img
              src={pages[0]}
              alt={`${title} - Page 1`}
              className="w-full h-auto"
            />
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button className="bg-[#2563EB] text-black px-6 py-2 font-bold border-2 border-black hover:bg-[#FF6B35] transition-colors">
              Page Précédente
            </button>
            <span className="text-white font-bold">1 / {pages.length}</span>
            <button className="bg-[#2563EB] text-black px-6 py-2 font-bold border-2 border-black hover:bg-[#FF6B35] transition-colors">
              Page Suivante
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
