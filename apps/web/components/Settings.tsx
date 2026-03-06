import React, { useState } from 'react';
import { Bell, Shield, Palette, CreditCard, HelpCircle, Save } from 'lucide-react';
import ComicButton from './ui/ComicButton';
import SettingsGeneral from './settings/SettingsGeneral';
import SettingsNotifications from './settings/SettingsNotifications';
import SettingsPrivacy from './settings/SettingsPrivacy';
import SettingsAppearance from './settings/SettingsAppearance';
import SettingsBilling from './settings/SettingsBilling';
import SettingsHelp from './settings/SettingsHelp';

type NotificationPrefs = { email: boolean; push: boolean; marketing: boolean; updates: boolean };
type PrivacyPrefs = { profilePublic: boolean; showEmail: boolean; showStats: boolean; allowMessages: boolean };

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('inkup_lover');
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    email: true, push: false, marketing: true, updates: false,
  });
  const [privacy, setPrivacy] = useState<PrivacyPrefs>({
    profilePublic: true, showEmail: false, showStats: true, allowMessages: true,
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
    // TODO(#ISSUE): implémenter la sauvegarde via API
  };

  const handleNotificationToggle = (key: keyof NotificationPrefs) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyToggle = (key: keyof PrivacyPrefs) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <SettingsGeneral
            username={username}
            onUsernameChange={(e) => setUsername(e.target.value)}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(prev => !prev)}
          />
        );
      case 'notifications':
        return <SettingsNotifications notifications={notifications} onToggle={handleNotificationToggle} />;
      case 'privacy':
        return <SettingsPrivacy privacy={privacy} onToggle={handlePrivacyToggle} />;
      case 'appearance':
        return <SettingsAppearance isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(prev => !prev)} />;
      case 'billing':
        return <SettingsBilling />;
      case 'help':
        return <SettingsHelp />;
      default:
        return (
          <SettingsGeneral
            username={username}
            onUsernameChange={(e) => setUsername(e.target.value)}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(prev => !prev)}
          />
        );
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
