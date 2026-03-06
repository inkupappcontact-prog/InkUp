import React, { useState } from 'react';
import { Bell, Lock, Palette, Globe, CreditCard, HelpCircle, Trash2 } from 'lucide-react';
import ComicButton from './ComicButton_BD';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('fr');

  return (
    <div className="bg-gray-900 border-4 border-[#2563EB] rounded-lg p-8">
      <h2 className="font-['Bangers'] text-3xl text-[#2563EB] mb-6">Paramètres</h2>

      <div className="space-y-8">
        {/* Notifications */}
        <div className="bg-black border-2 border-[#2563EB] rounded-lg p-6">
          <h3 className="font-bold text-[#2563EB] mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-white">Notifications par email</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 accent-[#2563EB]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-white">Notifications push</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 accent-[#2563EB]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-white">Nouveautés auteurs suivis</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 accent-[#2563EB]"
              />
            </label>
          </div>
        </div>

        {/* Apparence */}
        <div className="bg-black border-2 border-[#2563EB] rounded-lg p-6">
          <h3 className="font-bold text-[#2563EB] mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Apparence
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-white">Mode sombre</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="w-5 h-5 accent-[#2563EB]"
              />
            </label>
            <div>
              <label className="block text-white mb-2">Langue</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-800 border border-[#2563EB] rounded-lg px-4 py-2 text-white"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>

        {/* Confidentialité */}
        <div className="bg-black border-2 border-[#2563EB] rounded-lg p-6">
          <h3 className="font-bold text-[#2563EB] mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Confidentialité
          </h3>
          <div className="space-y-4">
            <button className="w-full text-left text-white hover:text-[#2563EB] transition-colors">
              Modifier le mot de passe
            </button>
            <button className="w-full text-left text-white hover:text-[#2563EB] transition-colors">
              Authentification à deux facteurs
            </button>
            <button className="w-full text-left text-white hover:text-[#2563EB] transition-colors">
              Gérer les données personnelles
            </button>
            <button className="w-full text-left text-white hover:text-[#2563EB] transition-colors">
              Télécharger mes données
            </button>
          </div>
        </div>

        {/* Paiement */}
        <div className="bg-black border-2 border-[#2563EB] rounded-lg p-6">
          <h3 className="font-bold text-[#2563EB] mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Paiement
          </h3>
          <div className="space-y-4">
            <button className="w-full text-left text-white hover:text-[#2563EB] transition-colors">
              Ajouter une carte de crédit
            </button>
            <button className="w-full text-left text-white hover:text-[#2563EB] transition-colors">
              Acheter des InkPoints
            </button>
            <button className="w-full text-left text-white hover:text-[#2563EB] transition-colors">
              Historique des transactions
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="bg-black border-2 border-[#2563EB] rounded-lg p-6">
          <h3 className="font-bold text-[#2563EB] mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Support
          </h3>
          <div className="space-y-4">
            <button className="w-full text-left text-white hover:text-[#2563EB] transition-colors">
              Centre d'aide
            </button>
            <button className="w-full text-left text-white hover:text-[#2563EB] transition-colors">
              Contacter le support
            </button>
            <button className="w-full text-left text-white hover:text-[#2563EB] transition-colors">
              Signaler un problème
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-900 border-2 border-red-600 rounded-lg p-6">
          <h3 className="font-bold text-red-500 mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Zone de danger
          </h3>
          <div className="space-y-4">
            <button className="w-full text-left text-red-400 hover:text-red-300 transition-colors">
              Désactiver le compte
            </button>
            <button className="w-full text-left text-red-400 hover:text-red-300 transition-colors">
              Supprimer le compte
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <ComicButton className="flex-1">
            <span>Sauvegarder</span>
          </ComicButton>
          <button className="flex-1 bg-gray-800 text-white px-6 py-3 font-bold border-2 border-gray-600 hover:bg-gray-700 transition-colors">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
