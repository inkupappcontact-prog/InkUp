import React, { useState } from 'react';
import { X, Lock, Coins, BookOpen } from 'lucide-react';
import ComicButton from './ui/ComicButton';

interface ContentUnlockModalProps {
  title: string;
  price: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const ContentUnlockModal: React.FC<ContentUnlockModalProps> = ({
  title,
  price,
  onConfirm,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simuler un traitement
    await new Promise(resolve => setTimeout(resolve, 1500));
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-4 border-black max-w-md w-full transform rotate-1">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#2563EB] p-3 border-2 border-black">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-['Bangers'] text-xl">Débloquer le contenu</h3>
                <p className="text-sm text-gray-600">{title}</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 border-2 border-black hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Contenu */}
          <div className="space-y-4">
            <div className="bg-gray-50 border-2 border-black p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">Prix de déverrouillage</span>
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-2xl font-bold">
                    {price === 0 ? 'GRATUIT' : `${price} €`}
                  </span>
                </div>
              </div>

              {price > 0 && (
                <p className="text-sm text-gray-600">
                  Ce montant sera débité de votre solde InkPoints
                </p>
              )}
            </div>

            <div className="bg-[#2563EB] bg-opacity-10 border-2 border-[#2563EB] p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#2563EB] mt-1" />
                <div>
                  <p className="font-bold text-sm mb-1">Ce que vous obtenez</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Accès illimité à cette œuvre</li>
                    <li>• Lecture sur tous vos appareils</li>
                    <li>• Support au créateur</li>
                    <li>• Mises à jour gratuites</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 border-2 border-black px-4 py-3 font-bold hover:bg-gray-100 transition-colors"
              disabled={isProcessing}
            >
              Annuler
            </button>
            <ComicButton
              onClick={handleConfirm}
              className="flex-1 flex items-center justify-center gap-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  {price === 0 ? (
                    <>
                      <BookOpen className="w-4 h-4" />
                      Lire Gratuitement
                    </>
                  ) : (
                    <>
                      <Coins className="w-4 h-4" />
                      Débloquer
                    </>
                  )}
                </>
              )}
            </ComicButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentUnlockModal;
