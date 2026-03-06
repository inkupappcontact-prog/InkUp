import React, { useState } from 'react';
import { Coins, Heart, MessageSquare, BookOpen, Package, ShoppingCart, Lock, Eye, AlertTriangle } from 'lucide-react';
import ShippingAddressForm from './ShippingAddressForm';
import ContentUnlockModal from './ContentUnlockModal';
import ComicButton from './ui/ComicButton';

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
  const [format, setFormat] = useState<'digital' | 'physical'>('digital');
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showMature, setShowMature] = useState(false);
  const [isPurchased, setIsPurchased] = useState(price === 0);

  const handlePurchase = () => {
    if (format === 'physical') {
      setShowShippingForm(true);
    } else {
      setShowUnlockModal(true);
    }
  };

  const handleUnlock = () => {
    setIsPurchased(true);
    setShowUnlockModal(false);
  };

  const handleShippingSubmit = (_address: unknown) => {
    setShowShippingForm(false);
    // TODO(#ISSUE): implémenter la logique d'achat physique via API
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const getStockStatus = () => {
    if (!hasPhysical) return null;
    if (stock === 0) return <span className="text-red-500 font-bold">Épuisé</span>;
    if (stock < 5) return <span className="text-orange-500 font-bold">Plus que {stock}!</span>;
    return <span className="text-green-500 font-bold">En stock</span>;
  };

  return (
    <div className="bg-white border-4 border-black transform transition-all duration-200 hover:scale-105 hover:rotate-1">
      {/* Header avec badge catégorie */}
      <div className="relative">
        <img
          src={cover}
          alt={title}
          className="w-full h-64 object-cover"
        />

        {/* Badge catégorie */}
        <div className="absolute top-2 left-2 bg-[#2563EB] text-white px-3 py-1 font-bold text-sm border-2 border-black transform -rotate-2">
          {category}
        </div>

        {/* Badge contenu mature */}
        {isMature && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 font-bold text-sm border-2 border-black transform rotate-2">
            18+
          </div>
        )}

        {/* Badge physique */}
        {hasPhysical && (
          <div className="absolute bottom-2 left-2 bg-green-500 text-white px-3 py-1 font-bold text-sm border-2 border-black transform -rotate-2 flex items-center gap-1">
            <Package className="w-4 h-4" />
            Physique
          </div>
        )}

        {/* Overlay pour contenu mature */}
        {isMature && !showMature && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
              <p className="font-bold mb-2">Contenu réservé aux adultes</p>
              <button
                onClick={() => setShowMature(true)}
                className="bg-red-500 text-white px-4 py-2 font-bold border-2 border-black hover:bg-red-600"
              >
                Je confirme avoir 18 ans
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Corps de la carte */}
      <div className="p-4">
        <h3 className="font-['Bangers'] text-xl mb-1">{title}</h3>
        <p className="text-gray-600 mb-3">par {author}</p>

        {/* Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLikeToggle}
              className={`p-2 border-2 border-black transition-colors ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 border-2 border-black bg-white hover:bg-gray-100">
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>

          {getStockStatus()}
        </div>

        {/* Format selector */}
        {hasPhysical && (
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setFormat('digital')}
              className={`flex-1 py-2 px-3 border-2 border-black font-bold text-sm transition-colors ${
                format === 'digital'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-1" />
              Numérique
            </button>
            <button
              onClick={() => setFormat('physical')}
              className={`flex-1 py-2 px-3 border-2 border-black font-bold text-sm transition-colors ${
                format === 'physical'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <Package className="w-4 h-4 inline mr-1" />
              Physique
            </button>
          </div>
        )}

        {/* Prix et actions */}
        <div className="flex items-center justify-between">
          <div>
            {format === 'digital' ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {price === 0 ? 'GRATUIT' : `${price}€`}
                </span>
                {price > 0 && (
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">InkPoints</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {price === 0 ? 'GRATUIT' : `${price}€`}
                </span>
                <span className="text-sm text-gray-600">+ livraison</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isPurchased ? (
              <ComicButton onClick={onRead} className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Lire
              </ComicButton>
            ) : (
              <ComicButton
                onClick={handlePurchase}
                className="flex items-center gap-2"
                disabled={format === 'physical' && stock === 0}
              >
                {format === 'physical' ? (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Commander
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Débloquer
                  </>
                )}
              </ComicButton>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showShippingForm && (
        <ShippingAddressForm
          onSubmit={handleShippingSubmit}
          onCancel={() => setShowShippingForm(false)}
        />
      )}

      {showUnlockModal && (
        <ContentUnlockModal
          title={title}
          price={price}
          onConfirm={handleUnlock}
          onCancel={() => setShowUnlockModal(false)}
        />
      )}
    </div>
  );
};

export default ComicCard;
