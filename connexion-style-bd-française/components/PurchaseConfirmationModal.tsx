import React, { useState } from 'react';
import { X, Coins, CheckSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import ComicButton from './ComicButton';
import { LEGAL_INFO } from '../constants/legal';

interface PurchaseConfirmationModalProps {
  pack: { price: string; points: number; bonus: string };
  onClose: () => void;
  onConfirm: () => void;
}

const PurchaseConfirmationModal: React.FC<PurchaseConfirmationModalProps> = ({ pack, onClose, onConfirm }) => {
  const [waiveRights, setWaiveRights] = useState(false);
  
  // Extraction valeur numérique pour démo
  const basePoints = Math.floor(pack.points / 1.1); // Approximation pour l'exemple (si 10% bonus)
  const bonusPoints = pack.points - basePoints;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200" role="dialog" aria-modal="true" aria-labelledby="purchase-title">
       <div className="bg-white border-4 border-black w-full max-w-lg shadow-[12px_12px_0px_0px_#2563EB] relative">
          
          {/* Header */}
          <div className="bg-[#FBBC05] border-b-4 border-black p-4 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <Coins className="w-6 h-6 text-black" />
                <h2 id="purchase-title" className="font-['Bangers'] text-2xl uppercase tracking-wide text-black">Confirmation d'Achat</h2>
             </div>
             <button onClick={onClose} className="p-1 hover:bg-black hover:text-white transition-colors border-2 border-black bg-white">
                <X className="w-5 h-5" />
             </button>
          </div>

          <div className="p-6 md:p-8">
             {/* Calcul Transparent */}
             <div className="bg-gray-50 border-2 border-black/10 p-4 mb-6 relative">
                 <div className="absolute -top-3 left-4 bg-black text-white text-[10px] font-bold uppercase px-2 py-0.5">Détail de la transaction</div>
                 
                 <div className="flex items-center justify-between mb-4">
                    <span className="font-['Bangers'] text-4xl text-black">{pack.price}</span>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                    <div className="text-right">
                        <div className="text-sm font-bold text-gray-500 uppercase">Solde crédité</div>
                        <div className="font-['Bangers'] text-4xl text-[#2563EB]">{pack.points} IP</div>
                    </div>
                 </div>

                 <div className="border-t-2 border-dashed border-gray-300 pt-2 flex justify-between text-xs font-bold uppercase text-gray-500">
                    <span>Base: {basePoints} IP</span>
                    <span className="text-[#34A853]">+ {bonusPoints} IP Bonus</span>
                 </div>
                 
                 {/* Mention TVA (Obligation Micro-entreprise) */}
                 <div className="mt-2 text-center">
                    <p className="text-[10px] italic text-gray-500">{LEGAL_INFO.vat_mention}</p>
                 </div>
             </div>

             {/* Clause Légale Rétractation */}
             <div className="bg-[#2563EB]/5 border-l-4 border-[#2563EB] p-4 mb-6">
                 <div className="flex items-start gap-3">
                     <ShieldCheck className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                     <p className="text-xs text-gray-700 leading-relaxed font-medium">
                        Vous achetez un contenu numérique non fourni sur support matériel. 
                        L'exécution commence immédiatement après validation.
                     </p>
                 </div>
             </div>

             {/* Checkbox Renoncement (Obligatoire) */}
             <label className="flex items-start gap-3 cursor-pointer group mb-6 select-none">
                <div className={`w-6 h-6 border-2 border-black flex-shrink-0 flex items-center justify-center transition-colors ${waiveRights ? 'bg-black' : 'bg-white group-hover:bg-gray-100'}`}>
                    {waiveRights && <CheckSquare className="w-4 h-4 text-white" />}
                    <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={waiveRights}
                        onChange={(e) => setWaiveRights(e.target.checked)}
                    />
                </div>
                <span className="text-sm font-bold text-black uppercase leading-tight pt-0.5">
                    Je consens à l'exécution immédiate du contrat et je reconnais perdre mon droit de rétractation.
                </span>
             </label>

             <ComicButton 
                onClick={onConfirm} 
                className={`w-full text-xl ${!waiveRights ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                variant="primary"
             >
                Payer {pack.price}
             </ComicButton>
          </div>
       </div>
    </div>
  );
};

export default PurchaseConfirmationModal;