import React from 'react';

interface PrivacyPrefs {
  profilePublic: boolean;
  showEmail: boolean;
  showStats: boolean;
  allowMessages: boolean;
}

interface SettingsPrivacyProps {
  privacy: PrivacyPrefs;
  onToggle: (key: keyof PrivacyPrefs) => void;
}

const PRIVACY_ITEMS: { key: keyof PrivacyPrefs; label: string; description: string }[] = [
  { key: 'profilePublic', label: 'Profil public', description: 'Rendre votre profil visible par tous' },
  { key: 'showEmail', label: "Afficher l'email", description: 'Afficher votre email publiquement' },
  { key: 'showStats', label: 'Statistiques publiques', description: 'Afficher vos statistiques de lecture' },
  { key: 'allowMessages', label: 'Messages', description: 'Autoriser les messages des autres utilisateurs' },
];

const SettingsPrivacy: React.FC<SettingsPrivacyProps> = ({ privacy, onToggle }) => (
  <div className="space-y-6">
    <h3 className="font-['Bangers'] text-xl mb-4">Paramètres de confidentialité</h3>
    <div className="space-y-4">
      {PRIVACY_ITEMS.map(({ key, label, description }) => (
        <div key={key} className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">{label}</p>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <button
            onClick={() => onToggle(key)}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              privacy[key] ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              privacy[key] ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      ))}
    </div>

    <div className="bg-red-50 border-2 border-red-300 p-4">
      <h4 className="font-bold text-red-800 mb-2">Zone de danger</h4>
      <p className="text-sm text-red-600 mb-4">Ces actions sont irréversibles. Soyez prudent.</p>
      <button className="bg-red-500 text-white px-4 py-2 font-bold border-2 border-black hover:bg-red-600">
        Supprimer mon compte
      </button>
    </div>
  </div>
);

export default SettingsPrivacy;
