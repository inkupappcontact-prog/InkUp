import React from 'react';
import { CreditCard } from 'lucide-react';
import ComicButton from '@/components/ui/ComicButton';

const SettingsBilling: React.FC = () => (
  <div className="space-y-6">
    <h3 className="font-['Bangers'] text-xl mb-4">Facturation</h3>

    <div className="bg-gray-50 border-2 border-black p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-bold">Plan actuel</p>
          <p className="text-sm text-gray-600">Gratuit</p>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 font-bold border-2 border-green-300">
          Actif
        </span>
      </div>
      <ComicButton className="w-full">Passer à Premium</ComicButton>
    </div>

    <div>
      <h4 className="font-bold mb-2">Moyens de paiement</h4>
      <div className="border-2 border-black p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5" />
            <div>
              <p className="font-bold">•••• 4242</p>
              <p className="text-sm text-gray-600">Expire 12/25</p>
            </div>
          </div>
          <button className="text-sm font-bold text-[#2563EB] hover:underline">
            Supprimer
          </button>
        </div>
      </div>
      <button className="mt-2 text-sm font-bold text-[#2563EB] hover:underline">
        + Ajouter une carte
      </button>
    </div>

    <div>
      <h4 className="font-bold mb-2">Historique des paiements</h4>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 border-2 border-black">
          <div>
            <p className="font-bold">Plan Premium</p>
            <p className="text-sm text-gray-600">15 janvier 2024</p>
          </div>
          <span className="font-bold">9.99€</span>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsBilling;
