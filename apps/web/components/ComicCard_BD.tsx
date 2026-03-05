import React from 'react';

interface ComicCardProps {
  title: string;
  author: string;
  cover: string;
  price: number;
  category: string;
  hasPhysical?: boolean;
  stock?: number;
  isMature?: boolean;
  onRead?: () => void;
}

const ComicCard: React.FC<ComicCardProps> = ({ 
  title, 
  author, 
  cover, 
  price, 
  category, 
  hasPhysical = false, 
  stock = 0, 
  isMature = false,
  onRead 
}) => {
  return (
    <div className="bg-gray-900 border-4 border-[#2563EB] rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img 
          src={cover} 
          alt={title}
          className="w-full h-64 object-cover"
        />
        {isMature && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
            18+
          </div>
        )}
        {hasPhysical && (
          <div className="absolute top-2 left-2 bg-[#2563EB] text-black px-2 py-1 text-xs font-bold rounded">
            Physique
          </div>
        )}
        {hasPhysical && stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Rupture de stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-['Bangers'] text-xl text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-2">par {author}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#2563EB] font-bold text-lg">{price} InkPoints</span>
          <span className="text-gray-400 text-sm">{category}</span>
        </div>
        
        {hasPhysical && stock > 0 && (
          <div className="text-gray-400 text-sm mb-3">
            Stock: {stock} exemplaires
          </div>
        )}
        
        <button 
          onClick={onRead}
          className={`w-full py-2 font-bold transition-colors ${
            hasPhysical && stock === 0 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-[#2563EB] text-black hover:bg-[#FF6B35]'
          }`}
          disabled={hasPhysical && stock === 0}
        >
          {hasPhysical && stock === 0 ? 'Indisponible' : 'Lire'}
        </button>
      </div>
    </div>
  );
};

export default ComicCard;
