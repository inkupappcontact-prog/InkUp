import React, { useState } from 'react';
import { X, Lock, AlertCircle, Loader2, Coins } from 'lucide-react';
import ComicButton from './ComicButton';

interface ContentUnlockModalProps {
  title: string;
  price: number;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

const ContentUnlockModal: React.FC<ContentUnlockModalProps> = ({ title, price, onConfirm, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onConfirm();
      // La fermeture est gérée par le parent ou après succès
    } catch (error) {
      console.error("Erreur transaction", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="unlock-title">
      <div className="bg-white border-4 border-black w-full max-w-md shadow-[12px_12px_0px_0px_#EA4335] relative flex flex-col">

        {/* Header : Contraste Élevé & Titre Explicite */}
        <div className="bg-[#EA4335] border-b-4 border-black p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <Lock className="w-6 h-6" />
                <h2 id="unlock-title" className="font-['Bangers'] text-2xl uppercase tracking-wide">Confirmer votre lecture</h2>
            </div>
            <button
                onClick={onCancel}
                disabled={isLoading}
                className="p-1 hover:bg-black hover:text-white transition-colors border-2 border-black bg-white text-black disabled:opacity-50"
                aria-label="Fermer"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col">

            {/* Résumé Produit & Prix */}
            <div className="mb-6 text-center">
                <p className="text-sm font-bold uppercase text-gray-500 mb-1">Vous allez débloquer</p>
                <h3 className="font-['Bangers'] text-2xl text-black mb-4 leading-tight">{title}</h3>

                <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 transform -skew-x-12 border-2 border-transparent shadow-[4px_4px_0px_0px_#000000]">
                    <Coins className="w-6 h-6 text-[#FBBC05] transform skew-x-12" />
                    <span className="font-['Bangers'] text-3xl transform skew-x-12 mt-1">{price} IP</span>
                </div>
            </div>

            {/* Mentions Légales (Article L221-28) */}
            <div className="bg-gray-100 border-l-4 border-black p-4 mb-8 text-left">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-[#1A1A1A] leading-relaxed text-justify">
                        <strong>Renoncement au droit de rétractation :</strong><br/>
                        En cliquant sur "Confirmer", vous accéderez immédiatement au contenu numérique.
                        Vous reconnaissez expressément que l'exécution du contrat commence dès cet instant
                        et que vous renoncez ainsi à votre droit de rétractation conformément à l'article
                        L221-28 du Code de la consommation.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-auto grid grid-cols-2 gap-4">
                <button
                    onClick={onCancel}
                    disabled={isLoading}
                    className="h-[50px] border-2 border-black bg-white text-black font-['Bangers'] text-xl uppercase hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                    Annuler
                </button>

                <button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className="h-[50px] border-2 border-black bg-[#EA4335] text-white font-['Bangers'] text-xl uppercase shadow-[4px_4px_0px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#000000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:shadow-none disabled:transform-none"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Traitement...</span>
                        </>
                    ) : (
                        <span>Confirmer</span>
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContentUnlockModal;