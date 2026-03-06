import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, Globe, CreditCard, HelpCircle, LogOut, Save, X, Eye, EyeOff, Moon, Sun } from 'lucide-react';
import ComicButton from './ui/ComicButton';
import ParallelogramInput from './ui/ParallelogramInput';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    updates: false
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showStats: true,
    allowMessages: true
  });

  const sections = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Confidentialité', icon: Shield },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'billing', label: 'Facturation', icon: CreditCard },
    { id: 'help', label: 'Aide', icon: HelpCircle },
  ];

  const handleSave = () => {
    console.log('Sauvegarde des paramètres');
  };

  const renderGeneral = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-['Bangers'] text-xl mb-4">Informations du compte</h3>
        <div className="space-y-4">
          <div>
            <label className="font-bold block mb-2">Nom d'utilisateur</label>
            <ParallelogramInput
              placeholder="pseudo_inkup"
              defaultValue="inkup_lover"
            />
          </div>
          <div>
            <label className="font-bold block mb-2">Email</label>
            <div className="border-2 border-black p-3 bg-gray-50">
              user@example.com
            </div>
          </div>
          <div>
            <label className="font-bold block mb-2">Mot de passe</label>
            <div className="relative">
              <ParallelogramInput
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                defaultValue="password123"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 p-1 hover:bg-gray-100 rounded"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-['Bangers'] text-xl mb-4">Langue et région</h3>
        <div className="space-y-4">
          <div>
            <label className="font-bold block mb-2">Langue</label>
            <select className="w-full border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]">
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div>
            <label className="font-bold block mb-2">Fuseau horaire</label>
            <select className="w-full border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]">
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Europe/London">Europe/London</option>
              <option value="America/New_York">America/New_York</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h3 className="font-['Bangers'] text-xl mb-4">Préférences de notification</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">Email</p>
            <p className="text-sm text-gray-600">Recevoir les notifications par email</p>
          </div>
          <button
            onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              notifications.email ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              notifications.email ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">Notifications push</p>
            <p className="text-sm text-gray-600">Notifications dans le navigateur</p>
          </div>
          <button
            onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              notifications.push ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              notifications.push ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">Marketing</p>
            <p className="text-sm text-gray-600">Offres spéciales et promotions</p>
          </div>
          <button
            onClick={() => setNotifications(prev => ({ ...prev, marketing: !prev.marketing }))}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              notifications.marketing ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              notifications.marketing ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">Mises à jour</p>
            <p className="text-sm text-gray-600">Nouveautés et mises à jour de la plateforme</p>
          </div>
          <button
            onClick={() => setNotifications(prev => ({ ...prev, updates: !prev.updates }))}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              notifications.updates ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              notifications.updates ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <h3 className="font-['Bangers'] text-xl mb-4">Paramètres de confidentialité</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">Profil public</p>
            <p className="text-sm text-gray-600">Rendre votre profil visible par tous</p>
          </div>
          <button
            onClick={() => setPrivacy(prev => ({ ...prev, profilePublic: !prev.profilePublic }))}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              privacy.profilePublic ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              privacy.profilePublic ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">Afficher l'email</p>
            <p className="text-sm text-gray-600">Afficher votre email publiquement</p>
          </div>
          <button
            onClick={() => setPrivacy(prev => ({ ...prev, showEmail: !prev.showEmail }))}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              privacy.showEmail ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              privacy.showEmail ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">Statistiques publiques</p>
            <p className="text-sm text-gray-600">Afficher vos statistiques de lecture</p>
          </div>
          <button
            onClick={() => setPrivacy(prev => ({ ...prev, showStats: !prev.showStats }))}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              privacy.showStats ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              privacy.showStats ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">Messages</p>
            <p className="text-sm text-gray-600">Autoriser les messages des autres utilisateurs</p>
          </div>
          <button
            onClick={() => setPrivacy(prev => ({ ...prev, allowMessages: !prev.allowMessages }))}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              privacy.allowMessages ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              privacy.allowMessages ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      <div className="bg-red-50 border-2 border-red-300 p-4">
        <h4 className="font-bold text-red-800 mb-2">Zone de danger</h4>
        <p className="text-sm text-red-600 mb-4">
          Ces actions sont irréversibles. Soyez prudent.
        </p>
        <button className="bg-red-500 text-white px-4 py-2 font-bold border-2 border-black hover:bg-red-600">
          Supprimer mon compte
        </button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
      <h3 className="font-['Bangers'] text-xl mb-4">Apparence</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">Mode sombre</p>
            <p className="text-sm text-gray-600">Utiliser le thème sombre</p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              isDarkMode ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              isDarkMode ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div>
          <label className="font-bold block mb-2">Taille du texte</label>
          <select className="w-full border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>

        <div>
          <label className="font-bold block mb-2">Thème de couleur</label>
          <div className="grid grid-cols-4 gap-2">
            <button className="w-full h-12 bg-[#2563EB] border-2 border-black rounded"></button>
            <button className="w-full h-12 bg-red-500 border-2 border-black rounded"></button>
            <button className="w-full h-12 bg-green-500 border-2 border-black rounded"></button>
            <button className="w-full h-12 bg-purple-500 border-2 border-black rounded"></button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
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
        <ComicButton className="w-full">
          Passer à Premium
        </ComicButton>
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

  const renderHelp = () => (
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
          <ComicButton className="w-full">
            Contacter le support
          </ComicButton>
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

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneral();
      case 'notifications':
        return renderNotifications();
      case 'privacy':
        return renderPrivacy();
      case 'appearance':
        return renderAppearance();
      case 'billing':
        return renderBilling();
      case 'help':
        return renderHelp();
      default:
        return renderGeneral();
    }
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <div className="bg-white border-4 border-black p-4">
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 font-bold transition-all ${
                    isActive
                      ? 'bg-[#2563EB] text-white border-2 border-black transform -rotate-1'
                      : 'hover:bg-gray-100 border-2 border-transparent hover:border-black'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="bg-white border-4 border-black p-6">
          {renderContent()}

          {/* Save button */}
          <div className="flex gap-3 mt-8 pt-6 border-t-4 border-black">
            <button className="flex-1 border-2 border-black px-4 py-3 font-bold hover:bg-gray-100 transition-colors">
              Annuler
            </button>
            <ComicButton
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Sauvegarder
            </ComicButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
