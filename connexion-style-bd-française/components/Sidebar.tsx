import React from 'react';
import { Compass, Book, User, Settings, PenTool, LogOut, Package } from 'lucide-react';
import InkUpLogo from './InkUpLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isAuthor: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, isAuthor }) => {
  const menuItems = [
    { id: 'discovery', label: 'Découverte', icon: Compass },
    { id: 'library', label: 'Ma Bibliothèque', icon: Book },
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  if (isAuthor) {
    // Insérer Atelier et Commandes après Découverte
    menuItems.splice(1, 0, 
        { id: 'atelier', label: 'Mon Atelier', icon: PenTool },
        { id: 'orders', label: 'Commandes', icon: Package }
    );
  }

  return (
    <aside className="w-64 border-r-4 border-black bg-white flex flex-col h-full relative z-30">
      <div className="p-6 border-b-4 border-black">
         <InkUpLogo className="w-full h-auto scale-90" />
      </div>

      <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full h-12 flex items-center gap-4 px-4 border-2 transform -skew-x-12 transition-all duration-150 relative group
                ${isActive 
                  ? 'bg-black border-black text-white shadow-[6px_6px_0px_0px_#2563EB] translate-x-1.5' 
                  : 'bg-white border-black text-black hover:bg-[#F0F0F0]'}
              `}
            >
              <Icon className={`w-5 h-5 transform skew-x-12 ${isActive ? 'text-[#2563EB]' : 'text-black'}`} />
              <span className="transform skew-x-12 font-['Bangers'] uppercase text-lg tracking-wider mt-0.5">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#2563EB] transform skew-x-12"></div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t-4 border-black space-y-4">
        {/* Upgrade Auteur Premium */}
        {!isAuthor && (
          <button className="w-full p-4 border-2 border-[#2563EB] bg-[#2563EB]/5 transform -skew-x-12 hover:bg-[#2563EB] hover:text-white transition-all group">
             <div className="transform skew-x-12 text-center">
                <p className="font-['Bangers'] text-xl uppercase mb-1 group-hover:text-white text-[#2563EB]">Devenir Auteur</p>
                <p className="text-[10px] font-bold uppercase tracking-widest group-hover:text-white text-[#2563EB]">Monétisez vos BD</p>
             </div>
          </button>
        )}

        <button 
          onClick={onLogout}
          className="w-full h-12 flex items-center justify-center gap-3 border-2 border-black transform -skew-x-12 hover:bg-black hover:text-white transition-all text-black font-['Bangers'] uppercase text-lg"
        >
          <LogOut className="w-4 h-4 transform skew-x-12" />
          <span className="transform skew-x-12 mt-1">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;