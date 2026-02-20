import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, CreditCard, HelpCircle } from 'lucide-react';
import ComicButton from './ui/ComicButton';
import ParallelogramInput from './ui/ParallelogramInput';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    updates: false
  });

  const sections = [
    { id: 'general', label: 'Général', icon: SettingsIcon },
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
        <h3 className="font-['Bangers'] text-xl mb-4 text-black">Informations du compte</h3>
        <div className="space-y-4">
          <div>
            <ParallelogramInput
              label="NOM D'UTILISATEUR"
              placeholder="pseudo_inkup"
              value="inkup_lover"
              onChange={() => {}}
            />
          </div>
          <div>
            <label className="font-bold block mb-2 text-black">Email</label>
            <div className="border-2 border-black p-3 bg-gray-50 text-black">
              flavian.bouin@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-['Bangers'] text-xl mb-4 text-black">Préférences de notification</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="font-bold text-black">{key}</span>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                className="w-5 h-5"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-['Bangers'] text-xl mb-4 text-black">Paramètres de confidentialité</h3>
        <p className="text-black">Vos paramètres de confidentialité sont configurés pour protéger vos données.</p>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-['Bangers'] text-xl mb-4 text-black">Apparence</h3>
        <p className="text-black">Personnalisez l'apparence de l'application.</p>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-['Bangers'] text-xl mb-4 text-black">Facturation</h3>
        <p className="text-black">Aucune information de facturation pour le moment.</p>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-['Bangers'] text-xl mb-4 text-black">Aide</h3>
        <p className="text-black">Contactez-nous à support@inkup.com pour toute question.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'general': return renderGeneral();
      case 'notifications': return renderNotifications();
      case 'privacy': return renderPrivacy();
      case 'appearance': return renderAppearance();
      case 'billing': return renderBilling();
      case 'help': return renderHelp();
      default: return renderGeneral();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-['Bangers'] text-4xl mb-8 text-black">PARAMÈTRES</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-4 rounded-lg font-bold transition-colors ${
                    activeSection === section.id 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black border-2 border-black hover:bg-gray-100'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-lg border-2 border-black">
              {renderContent()}
              
              <div className="mt-8 flex justify-end space-x-4">
                <ComicButton variant="secondary" onClick={() => {}}>
                  Annuler
                </ComicButton>
                <ComicButton onClick={handleSave}>
                  Sauvegarder
                </ComicButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
