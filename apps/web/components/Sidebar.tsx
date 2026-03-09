import React from 'react';
import { Compass, Book, User, Settings as SettingsIcon, PenTool, LogOut, BarChart3, Upload, Package, Users } from 'lucide-react';
import ComicButton from './ui/ComicButton';
import InkUpLogo from './ui/InkUpLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: { email: string; role: 'reader' | 'author'; balance: number; plan: 'free' | 'premium' };
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, user, onLogout }) => {
  const readerTabs = [
    { id: 'discovery', label: 'Découverte', icon: Compass },
    { id: 'library', label: 'Ma Bibliothèque', icon: Book },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Paramètres', icon: SettingsIcon },
  ];

  const authorTabs = [
    { id: 'discovery', label: 'Découverte', icon: Compass },
    { id: 'library', label: 'Ma Bibliothèque', icon: Book },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 },
    { id: 'upload', label: 'Publier', icon: Upload },
    { id: 'orders', label: 'Commandes', icon: Package },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Paramètres', icon: SettingsIcon },
  ];

  const tabs = user.role === 'author' ? authorTabs : readerTabs;

  return (
    <div className="w-64 bg-white border-r-4 border-black min-h-screen p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b-4 border-black">
        <InkUpLogo className="w-10 h-10" />
        <div>
          <h1 className="font-['Bangers'] text-2xl">InkUp</h1>
          <p className="text-sm text-gray-600 font-['Comic Neue']">
            {user.role === 'author' ? 'Espace Auteur' : 'Espace Lecteur'}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8" aria-label="Menu principal">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold transition-all ${
                isActive
                  ? 'bg-[#2563EB] text-white border-2 border-black transform -rotate-1'
                  : 'hover:bg-gray-100 border-2 border-transparent hover:border-black'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="border-t-4 border-black pt-4">
        <div className="bg-gray-50 border-2 border-black p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center border-2 border-black">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm truncate">{user.email}</p>
              <p className="text-xs text-gray-600">
                {user.plan === 'premium' ? 'Premium' : 'Gratuit'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white border-2 border-black px-3 py-2">
            <span className="text-sm font-bold">Solde</span>
            <span className="font-bold text-[#2563EB]">{user.balance} €</span>
          </div>
        </div>

        <ComicButton
          onClick={onLogout}
          className="w-full flex items-center gap-2 justify-center"
          aria-label="Se déconnecter"
        >
          <LogOut className="w-4 h-4" aria-hidden="true" />
          Déconnexion
        </ComicButton>
      </div>
    </div>
  );
};

export default Sidebar;
