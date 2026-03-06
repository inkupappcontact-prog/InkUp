import React from 'react';
import ComicButton from '@/components/ui/ComicButton';

const SettingsHelp: React.FC = () => (
  <div className="space-y-6">
    <h3 className="font-['Bangers'] text-xl mb-4">Aide et support</h3>

    <div className="space-y-4">
      <div className="border-2 border-black p-4">
        <h4 className="font-bold mb-2">FAQ</h4>
        <p className="text-sm text-gray-600 mb-3">
          Trouvez des réponses aux questions les plus fréquentes
        </p>
        <button className="text-sm font-bold text-[#2563EB] hover:underline">
          Voir la FAQ →
        </button>
      </div>

      <div className="border-2 border-black p-4">
        <h4 className="font-bold mb-2">Contactez le support</h4>
        <p className="text-sm text-gray-600 mb-3">
          Notre équipe est là pour vous aider
        </p>
        <ComicButton className="w-full">Contacter le support</ComicButton>
      </div>

      <div className="border-2 border-black p-4">
        <h4 className="font-bold mb-2">Signaler un problème</h4>
        <p className="text-sm text-gray-600 mb-3">
          Trouvez un bug ? Faites-le nous savoir
        </p>
        <button className="text-sm font-bold text-[#2563EB] hover:underline">
          Signaler un problème →
        </button>
      </div>
    </div>
  </div>
);

export default SettingsHelp;
