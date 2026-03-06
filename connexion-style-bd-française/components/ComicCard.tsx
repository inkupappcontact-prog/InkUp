import React, { useState } from 'react';
import { Coins, Heart, MessageSquare, BookOpen, Package, ShoppingCart, Lock, EyeOff, Eye, AlertTriangle } from 'lucide-react';
import ShippingAddressForm from './ShippingAddressForm';
import ContentUnlockModal from './ContentUnlockModal';

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
  const [matureRevealed, setMatureRevealed] = useState(false);

  const displayPrice = price;
  const isOutOfStock = format === 'physical' && stock <= 0;

  const handleBuy = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (format === 'physical') {
          if (isOutOfStock) return;
          setShowShippingForm(true);
      } else {
          // Si gratuit, lecture directe
          if (price === 0 && onRead) {
              onRead();
          } else {
             // Sinon, ouverture de la modale de confirmation juridique
             setShowUnlockModal(true);
          }
      }
  };

  const handleUnlockConfirm = async () => {
      // Simulation appel API (débit InkPoints)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowUnlockModal(false);
      alert(`Contenu débloqué avec succès ! -${price} IP`);
      if (onRead) onRead();
  };

  const handleShippingSubmit = (address: any) => {
      setShowShippingForm(false);
      alert(`Commande physique validée pour "${title}" !\nExpédition à : ${address.city}`);
  };

  // Barrière d'âge (Soft Gate)
  const toggleMature = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!matureRevealed) {
        // En production, ceci pourrait appeler une API de vérification d'identité si requis par la loi locale
        setMatureRevealed(true);
    }
  };

  return (
    <>
        {showShippingForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in" role="dialog" aria-modal="true">
                <ShippingAddressForm
                    onSubmit={handleShippingSubmit}
                    onCancel={() => setShowShippingForm(false)}
                />
            </div>
        )}

        {showUnlockModal && (
            <ContentUnlockModal
                title={title}
                price={price}
                onConfirm={handleUnlockConfirm}
                onCancel={() => setShowUnlockModal(false)}
            />
        )}

        <article className="group relative" aria-label={`Bande dessinée : ${title} par ${author}`}>
        {/* Case Image */}
        <div className="relative aspect-[3/4] border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000000] group-hover:shadow-[12px_12px_0px_0px_#2563EB] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-200 overflow-hidden">

            <img
                src={cover}
                alt={`Couverture de ${title}`}
                className={`w-full h-full object-cover transition-all duration-300 scale-105 group-hover:scale-110 ${isMature && !matureRevealed ? 'blur-xl' : 'grayscale-[0.2] group-hover:grayscale-0'}`}
            />

            {/* Overlay Mature (Design Sobre et Légal) */}
            {isMature && !matureRevealed && (
                <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center p-4 text-center animate-in fade-in">
                    <AlertTriangle className="w-12 h-12 text-[#EA4335] mb-2" />
                    <h3 className="text-white font-['Bangers'] text-2xl uppercase tracking-wide mb-1">Contenu Sensible</h3>
                    <p className="text-gray-300 text-xs font-bold uppercase mb-4 max-w-[200px]">
                        Cette œuvre contient des thèmes réservés à un public averti.
                    </p>
                    <button
                        onClick={toggleMature}
                        className="bg-transparent border-2 border-white text-white px-4 py-2 font-bold uppercase text-xs hover:bg-white hover:text-black transition-colors"
                    >
                        J'ai plus de 18 ans
                    </button>
                </div>
            )}

            {/* Badge Catégorie */}
            <div className="absolute top-4 left-4 z-10">
                <div className="bg-white border-2 border-black px-3 py-1 transform -skew-x-12 shadow-[3px_3px_0px_0px_#000]">
                    <span className="transform skew-x-12 block text-xs font-['Bangers'] uppercase text-black tracking-wide pt-0.5">{category}</span>
                </div>
            </div>

            {/* Toggle Physique / Digital */}
            {hasPhysical && (
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); setFormat('digital'); }}
                        className={`min-w-[44px] min-h-[44px] flex items-center justify-center border-2 border-black transition-all shadow-[2px_2px_0px_0px_#000] ${format === 'digital' ? 'bg-[#2563EB] text-white scale-110' : 'bg-white text-black hover:bg-gray-100'}`}
                        aria-label="Sélectionner format numérique"
                    >
                        <BookOpen className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setFormat('physical'); }}
                        className={`min-w-[44px] min-h-[44px] flex items-center justify-center border-2 border-black transition-all shadow-[2px_2px_0px_0px_#000] ${format === 'physical' ? 'bg-[#EA4335] text-white scale-110' : 'bg-white text-black hover:bg-gray-100'}`}
                        aria-label="Sélectionner format papier"
                    >
                        <Package className="w-4 h-4" aria-hidden="true" />
                    </button>
                </div>
            )}

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 z-20 pb-20 pointer-events-none group-hover:pointer-events-auto">
                <button
                    onClick={handleBuy}
                    disabled={isOutOfStock || (isMature && !matureRevealed)}
                    aria-label={isOutOfStock ? "Produit en rupture de stock" : `Acheter ${format === 'physical' ? 'la version papier' : 'la version numérique'} de ${title} pour ${price} InkPoints`}
                    className={`
                        w-full min-h-[44px] py-3 border-2 border-black font-['Bangers'] uppercase text-xl shadow-[4px_4px_0px_0px_#000] flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95
                        ${isOutOfStock ? 'bg-gray-300 cursor-not-allowed text-gray-500 border-gray-500 shadow-none' : 'bg-white text-black hover:bg-black hover:text-white'}
                    `}
                >
                    {isOutOfStock ? (
                        <span className="flex items-center gap-2">
                            <Lock className="w-4 h-4" aria-hidden="true" />
                            Rupture
                        </span>
                    ) : (
                        <>
                            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                            <span>{format === 'physical' ? 'Commander' : 'Lire mtn'}</span>
                        </>
                    )}
                </button>
            </div>

            {/* Étiquette Prix */}
            <div className="absolute bottom-4 right-4 z-30 pointer-events-none">
                <div className={`
                px-4 py-2 border-2 border-black transform -skew-x-12 shadow-[4px_4px_0px_0px_#000] transition-colors duration-300
                ${format === 'physical' ? 'bg-[#EA4335]' : (price === 0 ? 'bg-[#34A853]' : 'bg-[#2563EB]')}
                `}>
                    <div className="transform skew-x-12 flex flex-col items-end text-white">
                    <div className="flex items-center gap-2">
                            {price === 0 && format === 'digital' ? (
                                <span className="text-base font-['Bangers'] uppercase tracking-wider mt-0.5 text-black">OFFERT</span>
                            ) : (
                                <>
                                    <Coins className="w-4 h-4 text-white" aria-hidden="true" />
                                    <span className="text-xl font-['Bangers'] mt-0.5 text-white">{displayPrice}</span>
                                </>
                            )}
                    </div>
                    {format === 'physical' && (
                        <span className="text-[10px] font-bold uppercase tracking-wide opacity-90 text-right w-full block text-white">
                            Livraison Incluse
                        </span>
                    )}
                    </div>
                </div>
            </div>
        </div>

        {/* Légende (Bas de Case) */}
        <div className="mt-6 space-y-2 px-1">
            <div className="flex justify-between items-start">
                <h4 className="font-['Bangers'] text-2xl uppercase tracking-wide leading-none text-black group-hover:text-[#2563EB] transition-colors truncate w-3/4">
                    {title}
                </h4>
                {format === 'physical' && (
                    <span className="bg-[#EA4335] text-white text-[10px] font-bold px-1.5 py-0.5 border border-black uppercase transform -rotate-2">
                        Papier
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-[3px] bg-black"></div>
                <p className="text-xs font-bold uppercase tracking-widest text-black group-hover:text-[#2563EB] transition-colors">{author}</p>
            </div>
        </div>
        </article>
    </>
  );
};

export default ComicCard;