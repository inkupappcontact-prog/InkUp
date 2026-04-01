import React, { useState } from 'react';
import { TIMING } from '@/constants';
import { Upload } from 'lucide-react';
import Sidebar from './Sidebar';
import ComicCard from './ComicCard';
import ComicButton from './ui/ComicButton';
import UserProfile from './UserProfile';
import Settings from './Settings';
import OrderManager from './OrderManager';
import ParallelogramInput from './ui/ParallelogramInput';
import NotificationToast from './NotificationToast';
import SkipLink from './ui/SkipLink';

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
  const [toast, setToast] = useState<{ message: string; subtext?: string } | null>(null);

  const showToast = (message: string, subtext?: string) => {
    setToast({ message, subtext });
    setTimeout(() => setToast(null), TIMING.TOAST_DURATION);
  };

  // Simulation de données avec attributs physiques
  const comics = [
    {
      id: '1',
      title: "Le Secret de l'Encre",
      author: 'Moebius II',
      cover: 'https://images.unsplash.com/photo-1580136608260-42d1c4101a92?auto=format&fit=crop&q=80&w=400',
      price: 45,
      category: 'Sci-Fi',
      hasPhysical: true,
      stock: 12,
    },
    {
      id: '2',
      title: 'Nuit de Plomb',
      author: 'Tardi Fan',
      cover: 'https://images.unsplash.com/photo-1618519764620-7403abdbf951?auto=format&fit=crop&q=80&w=400',
      price: 0,
      category: 'Noir',
      hasPhysical: false,
      isMature: true,
    },
    {
      id: '3',
      title: "Ligne d'Horizon",
      author: 'Hergé Legacy',
      cover: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=400',
      price: 60,
      category: 'Aventure',
      hasPhysical: true,
      stock: 5,
    },
    {
      id: '4',
      title: 'Cyanure & Co',
      author: 'Franquin Jr',
      cover: 'https://images.unsplash.com/photo-1543004218-ee141104e14a?auto=format&fit=crop&q=80&w=400',
      price: 30,
      category: 'Humour',
      hasPhysical: false,
    },
    {
      id: '5',
      title: 'Ether Eternel',
      author: 'Uderzo Tribute',
      cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400',
      price: 50,
      category: 'Fantaisie',
      hasPhysical: true,
      stock: 0,
    },
    {
      id: '6',
      title: 'Bruit de Fond',
      author: 'Giraud Style',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
      price: 25,
      category: 'Western',
      hasPhysical: false,
    },
  ];

  const LIBRARY_PREVIEW_COUNT = 2;
  const myLibrary = comics.slice(0, LIBRARY_PREVIEW_COUNT);
  const weeklyStats = [150, 230, 180, 320, 290, 450, 510]; // Lun -> Dim
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const maxStat = Math.max(...weeklyStats);

  const renderDiscovery = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {comics.map((comic) => (
        <ComicCard
          key={comic.id}
          title={comic.title}
          author={comic.author}
          cover={comic.cover}
          price={comic.price}
          category={comic.category}
          hasPhysical={comic.hasPhysical}
          stock={comic.stock}
          isMature={comic.isMature}
          onRead={() => onRead?.(comic.title)}
        />
      ))}
    </div>
  );

  const renderLibrary = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myLibrary.map((comic) => (
        <ComicCard
          key={comic.id}
          title={comic.title}
          author={comic.author}
          cover={comic.cover}
          price={comic.price}
          category={comic.category}
          hasPhysical={comic.hasPhysical}
          stock={comic.stock}
          onRead={() => onRead?.(comic.title)}
        />
      ))}
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      <div className="card transform rotate-1">
        <h3 className="font-bangers text-2xl mb-4 text-black">📊 Statistiques de la semaine</h3>
        <div className="space-y-2">
          {weeklyStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-12 text-sm font-bold text-black">{days[index]}</span>
              <div className="flex-1 bg-gray-200 h-8 relative">
                <div
                  className="bg-[#2563EB] h-full border-2 border-black transition-all duration-300"
                  style={{ width: `${(stat / maxStat) * 100}%` }}
                >
                  <span className="absolute right-2 top-1 text-xs font-bold text-white">{stat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card transform -rotate-1">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#2563EB]">1,234</p>
            <p className="text-sm font-bold text-black">Lecteurs</p>
          </div>
        </div>
        <div className="card transform rotate-1">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#2563EB]">56</p>
            <p className="text-sm font-bold text-black">Ventes</p>
          </div>
        </div>
        <div className="card transform -rotate-1">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#2563EB]">4.8⭐</p>
            <p className="text-sm font-bold text-black">Note</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <div className="bg-white border-4 border-black p-6">
        <h3 className="font-['Bangers'] text-2xl mb-4 flex items-center gap-2">
          <Upload className="w-8 h-8" />
          Nouveau Projet
        </h3>

        <div className="space-y-4">
          <div>
            <label className="font-bold block mb-2">Titre du Projet</label>
            <ParallelogramInput label="Titre" placeholder="Le Secret de l'Encre..." value="" onChange={() => {}} />
          </div>

          <div>
            <label className="font-bold block mb-2">Description</label>
            <textarea
              className="w-full border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]"
              rows={4}
              placeholder="Une aventure épique dans les méandres du temps..."
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 font-bold">
              <input
                type="checkbox"
                checked={newProjectPhysical}
                onChange={(e) => setNewProjectPhysical(e.target.checked)}
                className="w-5 h-5"
              />
              Version physique disponible
            </label>
          </div>

          {newProjectPhysical && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-2">Prix (€)</label>
                <ParallelogramInput
                  label="Prix (€)"
                  placeholder="2500"
                  value={physicalPrice}
                  onChange={(e) => setPhysicalPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="font-bold block mb-2">Stock</label>
                <ParallelogramInput
                  label="Stock"
                  placeholder="50"
                  value={physicalStock}
                  onChange={(e) => setPhysicalStock(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold block mb-2">Fichier PDF</label>
            <div className="border-4 border-dashed border-black p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-[#2563EB]" />
              <p className="font-bold mb-2">Glissez votre fichier ici</p>
              <p className="text-sm text-gray-600">ou cliquez pour parcourir</p>
            </div>
          </div>

          <ComicButton
            onClick={() => showToast('Projet publié avec succès !', 'Il est maintenant disponible dans le catalogue.')}
            className="w-full"
          >
            Publier le Projet
          </ComicButton>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'discovery':
        return renderDiscovery();
      case 'library':
        return renderLibrary();
      case 'stats':
        return renderStats();
      case 'upload':
        return renderUpload();
      case 'orders':
        return <OrderManager />;
      case 'profile':
        return <UserProfile user={user} />;
      case 'settings':
        return <Settings />;
      default:
        return renderDiscovery();
    }
  };

  const actionTabs = [
    { id: 'overview', label: 'APERÇU' },
    { id: 'save', label: 'SAUVEGARDE' },
    { id: 'history', label: 'HISTORIQUE' },
    { id: 'publish', label: 'PUBLIER' },
  ];

  const pageCards = [
    { id: 'page1', label: '01', title: 'Planche 1', status: 'En cours' },
    { id: 'page2', label: '02', title: 'Planche 2', status: 'Brouillon' },
    { id: 'page3', label: '03', title: 'Planche 3', status: 'Finie' },
    { id: 'page4', label: '04', title: 'Planche 4', status: 'Prête' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-black flex overflow-hidden">
      <SkipLink />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={onLogout} />

      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b-4 border-black px-6 flex items-center justify-between shadow-[0_8px_0_0_rgba(0,0,0,0.95)]">
          <div className="flex items-center gap-4">
            <h1 className="font-bangers text-3xl tracking-wide uppercase">InkUp Studio</h1>
            <span className="text-sm font-bold text-[#2563EB] border-2 border-black px-3 py-1">
              {user.role === 'author' ? 'Espace Auteur' : 'Espace Lecteur'}
            </span>
          </div>
          <div className="flex gap-2">
            {actionTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className="font-bold text-xs uppercase tracking-wider px-4 py-2 border-4 border-black bg-white text-black transform hover:-translate-y-0.5 hover:bg-[#2563EB] hover:text-white"
                aria-label={tab.label}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <aside className="w-20 bg-white border-r-4 border-black p-3 flex flex-col gap-3 items-center justify-start">
            <button
              className="w-12 h-12 bg-[#2563EB] text-white border-4 border-black flex items-center justify-center transform -rotate-1 hover:rotate-0"
              aria-label="Pinceau"
            >
              ✎
            </button>
            <button
              className="w-12 h-12 bg-white text-black border-4 border-black flex items-center justify-center transform rotate-1 hover:rotate-0"
              aria-label="Gomme"
            >
              ⌫
            </button>
            <button
              className="w-12 h-12 bg-white text-black border-4 border-black flex items-center justify-center transform -rotate-1 hover:rotate-0"
              aria-label="Formes"
            >
              ⬛
            </button>
            <button
              className="w-12 h-12 bg-white text-black border-4 border-black flex items-center justify-center transform rotate-1 hover:rotate-0"
              aria-label="Couleur"
            >
              ●
            </button>
            <button
              className="w-12 h-12 bg-white text-black border-4 border-black flex items-center justify-center transform -rotate-1 hover:rotate-0"
              aria-label="Texte"
            >
              T
            </button>
          </aside>

          <main id="main-content" className="flex-1 p-6 overflow-auto" role="main">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(37,99,235,0.4)] rounded-xl p-5 min-h-[55vh]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bangers text-2xl uppercase tracking-wide">Éditeur encre</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wide border-2 border-black px-2 py-1">Progression</span>
                  <div className="h-2 w-40 bg-[#e5e7eb] border-2 border-black relative">
                    <div className="h-full bg-[#2563EB]" style={{ width: '65%' }} />
                  </div>
                  <span className="text-xs font-bold">65%</span>
                </div>
              </div>
              <div className="h-[400px] bg-slate-100 border-4 border-black rounded-lg overflow-auto p-3">
                {renderContent()}
              </div>
            </div>

            <section className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bangers text-2xl uppercase tracking-wide">Pages</h3>
                <button className="text-sm uppercase font-black tracking-wider bg-black text-white border-4 border-black px-4 py-2 hover:bg-[#2563EB] hover:border-[#2563EB]">
                  + Nouvelle Page
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pageCards.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    className="border-4 border-black bg-white shadow-[6px_6px_0_0_rgba(37,99,235,0.3)] p-3 text-left transform hover:-translate-y-1"
                    aria-label={page.title}
                  >
                    <div className="bg-[#f3f4f6] border-2 border-black h-24 mb-2" />
                    <div className="font-bold uppercase text-xs">{page.label}</div>
                    <p className="font-semibold">{page.title}</p>
                    <span className="text-xs text-gray-500 uppercase">{page.status}</span>
                  </button>
                ))}
              </div>
            </section>
          </main>
        </div>

        <footer className="h-20 bg-white border-t-4 border-black flex items-center justify-around px-6">
          <button className="font-bold uppercase tracking-wider p-2 border-4 border-black bg-white hover:bg-[#2563EB] hover:text-white">
            Accueil
          </button>
          <button className="font-bold uppercase tracking-wider p-2 border-4 border-black bg-white hover:bg-[#2563EB] hover:text-white">
            Explorer
          </button>
          <button className="font-bold uppercase tracking-wider p-2 border-4 border-black bg-[#2563EB] text-white">
            Créer
          </button>
          <button className="font-bold uppercase tracking-wider p-2 border-4 border-black bg-white hover:bg-[#2563EB] hover:text-white">
            Bibliothèque
          </button>
          <button className="font-bold uppercase tracking-wider p-2 border-4 border-black bg-white hover:bg-[#2563EB] hover:text-white">
            Profil
          </button>
        </footer>
      </div>

      {toast && <NotificationToast message={toast.message} subtext={toast.subtext} />}
    </div>
  );
};

export default Dashboard;
