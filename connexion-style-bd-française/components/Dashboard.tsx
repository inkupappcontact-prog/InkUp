import React, { useState } from 'react';
import { Book, User, Settings as SettingsIcon, PenTool, LogOut, Coins, Search, Bell, Upload, BarChart3, PieChart, TrendingUp, Layers, Lock, ArrowRightLeft, HardDrive, Calendar, Package } from 'lucide-react';
import Sidebar from './Sidebar';
import ComicCard from './ComicCard';
import ComicButton from './ComicButton';
import UserProfile from './UserProfile';
import Settings from './Settings';
import OrderManager from './OrderManager';
import ParallelogramInput from './ParallelogramInput';
import NotificationToast from './NotificationToast';

interface DashboardProps {
  user: { email: string; role: 'reader' | 'author'; balance: number; plan: 'free' | 'premium' };
  onLogout: () => void;
  onRead?: (title: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onRead }) => {
  const [activeTab, setActiveTab] = useState('discovery');

  // État local pour le formulaire "Nouveau Projet"
  const [newProjectPhysical, setNewProjectPhysical] = useState(false);
  const DEFAULT_PHYSICAL_PRICE = '2500';
  const DEFAULT_PHYSICAL_STOCK = '50';
  const [physicalPrice, setPhysicalPrice] = useState(DEFAULT_PHYSICAL_PRICE);
  const [physicalStock, setPhysicalStock] = useState(DEFAULT_PHYSICAL_STOCK);

  // État Notification
  const [toast, setToast] = useState<{message: string, subtext?: string} | null>(null);

  const showToast = (message: string, subtext?: string) => {
    setToast({ message, subtext });
    const TOAST_DURATION = 5000;
    setTimeout(() => setToast(null), TOAST_DURATION);
  };

  // Simulation de données avec attributs physiques
  const comicsList = [
    { id: '1', title: 'Le Secret de l\'Encre', author: 'Moebius II', cover: 'https://images.unsplash.com/photo-1580136608260-42d1c4101a92?auto=format&fit=crop&q=80&w=400', price: 45, category: 'Sci-Fi', hasPhysical: true, stock: 12 },
    { id: '2', title: 'Nuit de Plomb', author: 'Tardi Fan', cover: 'https://images.unsplash.com/photo-1618519764620-7403abdbf951?auto=format&fit=crop&q=80&w=400', price: 0, category: 'Noir', hasPhysical: false, isMature: true },
    { id: '3', title: 'Ligne d\'Horizon', author: 'Hergé Legacy', cover: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=400', price: 60, category: 'Aventure', hasPhysical: true, stock: 5 },
    { id: '4', title: 'Cyanure & Co', author: 'Franquin Jr', cover: 'https://images.unsplash.com/photo-1543004218-ee141104e14a?auto=format&fit=crop&q=80&w=400', price: 30, category: 'Humour', hasPhysical: false },
    { id: '5', title: 'Ether Eternel', author: 'Uderzo Tribute', cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400', price: 50, category: 'Fantaisie', hasPhysical: true, stock: 0 },
    { id: '6', title: 'Bruit de Fond', author: 'Giraud Style', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400', price: 25, category: 'Western', hasPhysical: false },
  ];

  const LIBRARY_PREVIEW_COUNT = 2;
  const myLibrary = comicsList.slice(0, LIBRARY_PREVIEW_COUNT);
  const weeklyStats = [150, 230, 180, 320, 290, 450, 510]; // Lun -> Dim
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const maxStat = Math.max(...weeklyStats);

  const renderDiscovery = () => (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Hero Banner */}
      <section className="mb-12 relative h-64 bg-white border-4 border-black shadow-[12px_12px_0px_0px_#2563EB] overflow-hidden group">
         <div className="absolute inset-0 halftone opacity-10"></div>
         <img
           src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200"
           className="absolute inset-0 w-full h-full object-cover grayscale opacity-10"
           alt="Hero"
         />
         <div className="absolute inset-0 z-20 p-10 flex flex-col justify-center items-start">
            <div className="inline-block bg-[#34A853] border-2 border-black px-4 py-1 mb-4 shadow-[4px_4px_0px_0px_#000] rotate-[-2deg]">
               <span className="text-white font-['Bangers'] uppercase text-xl tracking-wider">À LA UNE</span>
            </div>
            <h1 className="text-6xl font-black text-black uppercase tracking-wide mb-3 drop-shadow-[2px_2px_0px_#FFFFFF]">LES ÉLUS D'INKUP</h1>
            <div className="bg-white/95 border-l-4 border-[#2563EB] p-3 max-w-xl">
               <p className="text-black font-bold uppercase text-sm tracking-widest leading-relaxed">
                  Découvrez les meilleures planches indépendantes du mois sélectionnées par notre comité.
               </p>
            </div>
            <button className="mt-6 font-['Bangers'] text-xl bg-black text-white border-2 border-black px-8 py-2 uppercase shadow-[6px_6px_0px_0px_#2563EB] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all hover:bg-[#2563EB]">
              LIRE LE DOSSIER
            </button>
         </div>
      </section>

      {/* Grid */}
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-[#2563EB]"></div>
            <h3 className="text-3xl text-black">Dernières Parutions</h3>
         </div>
         <button className="text-lg font-['Bangers'] uppercase tracking-widest text-[#2563EB] hover:underline underline-offset-4 decoration-2">
           Tout afficher
         </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
         {comicsList.map(comic => (
           <ComicCard key={comic.id} {...comic} onRead={() => onRead && onRead(comic.title)} />
         ))}
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="max-w-7xl mx-auto animate-in slide-in-from-right-4 duration-500">
       <div className="flex items-center gap-4 mb-12">
          <Book className="w-8 h-8 text-black" />
          <h2 className="text-5xl text-black">Ma Bibliothèque</h2>
       </div>

       {myLibrary.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {myLibrary.map(comic => (
              <ComicCard key={comic.id} {...comic} price={0} onRead={() => onRead && onRead(comic.title)} />
            ))}
         </div>
       ) : (
         <div className="text-center py-20 border-4 border-dashed border-black/20 bg-gray-50">
            <p className="font-['Bangers'] text-2xl uppercase text-black">Aucune BD achetée pour le moment.</p>
         </div>
       )}
    </div>
  );

  const renderAtelier = () => (
    <div className="max-w-7xl mx-auto animate-in zoom-in-95 duration-500">
       <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
             <PenTool className="w-8 h-8 text-[#2563EB]" />
             <h2 className="text-5xl text-black">Atelier Créateur</h2>
          </div>
          <div className="flex gap-4">
             <div className="hidden md:flex items-center gap-2 border-2 border-black px-4 py-2 bg-[#F8F8F8]">
                <HardDrive className="w-5 h-5 text-black" />
                <span className="font-bold text-xs uppercase tracking-widest text-black">
                  Stockage: {user.plan === 'premium' ? 'ILLIMITÉ / ULTRA-HD' : 'STANDARD (WEBP)'}
                </span>
             </div>
             <ComicButton variant="primary" className="h-12 font-['Bangers'] text-lg tracking-wide">
                <Upload className="w-4 h-4" />
                <span className="mt-1">Nouveau Projet</span>
             </ComicButton>
          </div>
       </div>

       {/* Banner Plan Info */}
       <div className={`mb-8 p-4 border-l-4 ${user.plan === 'premium' ? 'border-[#34A853] bg-[#34A853]/5' : 'border-[#2563EB] bg-[#2563EB]/5'}`}>
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className={`px-2 py-0.5 text-white font-['Bangers'] text-lg uppercase ${user.plan === 'premium' ? 'bg-[#34A853]' : 'bg-[#2563EB]'} transform -skew-x-12`}>
                   <span className="transform skew-x-12 block">{user.plan === 'premium' ? 'PREMIUM' : 'FREE'}</span>
                </div>
                <span className="text-sm font-bold uppercase tracking-wide text-black">
                   Commission InkUp : <span className="text-black font-black text-lg">{user.plan === 'premium' ? '5%' : '15%'}</span>
                </span>
             </div>
             {user.plan === 'free' && (
                <button className="text-xs font-black uppercase text-[#2563EB] hover:underline cursor-pointer" onClick={() => setActiveTab('settings')}>
                   Passer à 5% de commission
                </button>
             )}
          </div>
       </div>

       <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000] mb-12">
            <h3 className="font-['Bangers'] text-3xl uppercase mb-6 text-black border-b-4 border-black inline-block pb-2">Configuration Projet</h3>

            <div className="flex items-center gap-4 mb-6">
                 <div className="flex items-center justify-between cursor-pointer group w-full max-w-md border-2 border-black p-4 bg-gray-50 hover:bg-white" onClick={() => setNewProjectPhysical(!newProjectPhysical)}>
                    <div className="flex items-center gap-3">
                        <Package className={`w-6 h-6 ${newProjectPhysical ? 'text-[#2563EB]' : 'text-gray-400'}`} />
                        <div>
                            <span className="block font-['Bangers'] text-xl uppercase text-black">Activer Vente Physique</span>
                            <span className="text-xs font-bold uppercase text-gray-500">Vendre des exemplaires papier</span>
                        </div>
                    </div>
                    <div className={`w-10 h-6 border-2 border-black flex items-center px-0.5 transition-colors duration-200 relative ${newProjectPhysical ? 'bg-[#34A853]' : 'bg-gray-200'}`}>
                        <div className={`w-4 h-4 border-2 border-black bg-white shadow-sm transition-transform duration-200 ${newProjectPhysical ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                </div>
            </div>

            {newProjectPhysical && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-300 bg-[#2563EB]/5 p-6 border-l-4 border-[#2563EB]">
                     <ParallelogramInput
                        label="Prix Total (IP)"
                        value={physicalPrice}
                        onChange={(e) => setPhysicalPrice(e.target.value)}
                        placeholder="2500"
                    />
                    <ParallelogramInput
                        label="Stock Initial"
                        value={physicalStock}
                        onChange={(e) => setPhysicalStock(e.target.value)}
                        placeholder="50"
                    />

                    <div className="md:col-span-2 flex items-start gap-2 bg-[#FBBC05]/20 p-3 border-2 border-[#FBBC05] border-dashed">
                        <div className="mt-0.5 min-w-[20px] text-[#FBBC05]">★</div>
                        <p className="text-xs font-bold uppercase text-black leading-relaxed">
                            <span className="underline">Important :</span> Le prix indiqué doit inclure vos frais de port moyens.
                            Le client paiera {physicalPrice} IP au total. Aucune surcharge ne sera ajoutée au panier.
                        </p>
                    </div>
                </div>
            )}
       </div>


       {/* --- SECTION STATISTIQUES --- */}
       {user.plan === 'premium' ? (
           /* --- MODE PREMIUM : GRAPHIQUES COMPLETS --- */
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

              {/* 1. Revenus */}
              <div className="p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000] relative bg-[#2563EB] text-white overflow-hidden flex flex-col justify-between">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <span className="font-['Bangers'] uppercase tracking-widest text-xl">Solde Auteur</span>
                        <Coins className="w-6 h-6" />
                    </div>
                    <p className="text-5xl font-['Bangers'] mb-2">{user.balance} IP</p>
                    <div className="flex items-center gap-2 border-t border-white/20 pt-2">
                        <ArrowRightLeft className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">≈ {(user.balance / 100).toFixed(2)} €</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-white text-[#2563EB] font-black uppercase text-xs border-2 border-black hover:bg-black hover:text-white transition-colors relative z-10">
                     Convertir en Euros
                  </button>
                  <Coins className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 rotate-12" />
              </div>

              {/* 2. Graphique Évolution avec Accessibilité Screen Reader */}
              <div className="lg:col-span-2 border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_#000] relative group">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-[#2563EB]" />
                          <h3 className="font-['Bangers'] text-2xl uppercase text-black">Évolution des Lectures</h3>
                      </div>
                      <span className="bg-black text-white px-2 py-0.5 text-xs font-bold uppercase tracking-widest transform -skew-x-12">7 derniers jours</span>
                  </div>

                  {/* Tableau Invisible pour Lecteurs d'Écran (Accessibilité) */}
                  <table className="sr-only">
                    <caption>Nombre de lectures sur les 7 derniers jours</caption>
                    <thead>
                        <tr>
                            {days.map(d => <th key={d}>{d}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {weeklyStats.map((val, i) => <td key={i}>{val} lectures</td>)}
                        </tr>
                    </tbody>
                  </table>

                  <div className="h-48 w-full relative pt-4" aria-hidden="true">
                      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                          <polyline
                             fill="none"
                             stroke="#2563EB"
                             strokeWidth="1.5"
                             points={weeklyStats.map((val, i) => `${(i / (weeklyStats.length - 1)) * 100},${100 - (val / maxStat) * 80}`).join(' ')}
                             vectorEffect="non-scaling-stroke"
                             className="drop-shadow-md"
                          />
                          {weeklyStats.map((val, i) => (
                             <circle
                                key={i}
                                cx={(i / (weeklyStats.length - 1)) * 100}
                                cy={100 - (val / maxStat) * 80}
                                r="1.5"
                                fill="white"
                                stroke="black"
                                strokeWidth="0.5"
                                vectorEffect="non-scaling-stroke"
                                className="hover:scale-150 transition-transform origin-center cursor-pointer"
                             />
                          ))}
                      </svg>
                      <div className="flex justify-between mt-2 text-[10px] font-black uppercase text-black">
                          {days.map(d => <span key={d}>{d}</span>)}
                      </div>
                  </div>
              </div>
           </div>
       ) : (
           /* --- MODE FREE : VUE BLOQUÉE --- */
           <div className="relative mb-16 border-4 border-black bg-gray-100 p-8 overflow-hidden">
               <div className="filter blur-sm select-none opacity-50 grid grid-cols-3 gap-8 pointer-events-none">
                   <div className="h-40 bg-gray-300 border-2 border-gray-400"></div>
                   <div className="h-40 bg-gray-300 border-2 border-gray-400 col-span-2"></div>
                   <div className="h-40 bg-gray-300 border-2 border-gray-400"></div>
                   <div className="h-40 bg-gray-300 border-2 border-gray-400"></div>
               </div>

               <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/30">
                   <div className="border-[6px] border-[#EA4335] p-6 bg-white rotate-[-3deg] shadow-[10px_10px_0px_0px_#000000] max-w-lg text-center">
                       <div className="flex justify-center mb-4">
                           <Lock className="w-12 h-12 text-[#EA4335]" />
                       </div>
                       <h3 className="font-['Bangers'] text-4xl text-[#EA4335] uppercase mb-2 tracking-wide">Accès Refusé</h3>
                       <p className="font-bold text-black uppercase text-sm mb-6 px-4">
                           Les statistiques avancées sont classées secret défense.
                       </p>
                       <button
                           onClick={() => setActiveTab('settings')}
                           className="bg-[#EA4335] text-white px-6 py-3 font-['Bangers'] text-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:scale-105 transition-transform uppercase"
                       >
                           Obtenir l'accréditation Premium
                       </button>
                   </div>
               </div>
           </div>
       )}

       {/* Projects List */}
       <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#2563EB] p-8">
          <h3 className="text-3xl mb-6 border-b-4 border-black pb-2 inline-block text-black">Projets en cours</h3>
          <div className="space-y-4">
             {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border-2 border-black/10 hover:border-black transition-colors bg-[#F8F8F8]">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 border-2 border-black relative overflow-hidden">
                        <img src={`https://picsum.photos/seed/${i+10}/200`} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div>
                         <p className="font-['Bangers'] uppercase text-xl text-black tracking-wide">Projet #{i} - Tome 1</p>
                         <div className="flex gap-2 mt-1">
                             <span className="text-xs bg-black text-white px-1 font-bold uppercase">Numérique</span>
                             {/* Simulation d'un projet ayant une version physique */}
                             {i === 1 && <span className="text-xs bg-[#EA4335] text-white px-1 font-bold uppercase">Physique</span>}
                         </div>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="px-4 py-1 border-2 border-black font-['Bangers'] text-lg uppercase text-black hover:bg-black hover:text-white transition-colors">Éditer</button>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      {/* Toast de Notification Système */}
      {toast && (
          <NotificationToast
            message={toast.message}
            subtext={toast.subtext}
            onClose={() => setToast(null)}
          />
      )}

      {/* Sidebar BD */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        isAuthor={user.role === 'author'}
      />

      {/* Main Content Planche */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* TopBar Interactive */}
        <header className="h-20 border-b-4 border-black flex items-center justify-between px-8 bg-white z-20">
          <div className="flex items-center gap-6">
             <div className="relative group">
                <input
                  type="text"
                  placeholder="RECHERCHER..."
                  className="w-64 h-10 border-2 border-black px-10 font-['Bangers'] text-lg uppercase tracking-wide transform -skew-x-12 focus:outline-none focus:bg-[#2563EB]/5 transition-colors text-black placeholder:text-gray-600 pt-1"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black" />
             </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Solde d'InkPoints */}
             <div className="flex items-center gap-2 bg-[#2563EB] border-2 border-black px-4 py-1.5 shadow-[4px_4px_0px_0px_#000000] transform -skew-x-12 hover:scale-105 transition-transform cursor-pointer">
                <Coins className="w-4 h-4 text-white transform skew-x-12" />
                <span className="text-white font-['Bangers'] text-lg transform skew-x-12 mt-0.5">{user.balance} IP</span>
             </div>

             <button className="w-10 h-10 border-2 border-black flex items-center justify-center transform -skew-x-12 hover:bg-black hover:text-white transition-all text-black">
                <Bell className="w-4 h-4 transform skew-x-12" />
             </button>

             <div className="w-10 h-10 border-2 border-black overflow-hidden transform -skew-x-12">
                <img src={`https://ui-avatars.com/api/?name=${user.email}&background=000&color=fff`} alt="Avatar" className="w-full h-full object-cover transform skew-x-12 scale-125" />
             </div>
          </div>
        </header>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#F8F8F8] custom-scrollbar">
           {activeTab === 'discovery' && renderDiscovery()}
           {activeTab === 'library' && renderLibrary()}
           {activeTab === 'atelier' && renderAtelier()}
           {activeTab === 'orders' && <OrderManager onNotify={showToast} />}
           {activeTab === 'profile' && <UserProfile user={user} />}
           {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;