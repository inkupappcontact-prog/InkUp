import React from 'react';
import { Compass, Book, User, Settings as SettingsIcon, PenTool, LogOut, BarChart3, Upload, Package, CreditCard } from 'lucide-react';

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
    { id: 'stats', label: 'Statistiques', icon: BarChart3 },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Paramètres', icon: SettingsIcon },
  ];

  const authorTabs = [
    { id: 'discovery', label: 'Découverte', icon: Compass },
    { id: 'library', label: 'Ma Bibliothèque', icon: Book },
    { id: 'upload', label: 'Publier', icon: Upload },
    { id: 'orders', label: 'Commandes', icon: Package },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Paramètres', icon: SettingsIcon },
  ];

  const tabs = user.role === 'author' ? authorTabs : readerTabs;

  return (
    <div className="w-64 bg-gray-900 border-r-4 border-[#2563EB] min-h-screen p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
          <PenTool className="w-6 h-6 text-black" />
        </div>
        <span className="font-['Bangers'] text-xl text-[#2563EB]">InkUp</span>
      </div>

      {/* User Info */}
      <div className="bg-black border-2 border-[#2563EB] rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-black" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">{user.email}</p>
            <p className="text-gray-400 text-xs">{user.role === 'author' ? 'Auteur' : 'Lecteur'}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Solde:</span>
          <span className="text-[#2563EB] font-bold">{user.balance} IP</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Plan:</span>
          <span className="text-white font-bold capitalize">{user.plan}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#2563EB] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Déconnexion</span>
      </button>
    </div>
  );
};

export default Sidebar;
