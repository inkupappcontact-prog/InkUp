import React, { useState } from 'react';
import { TIMING } from '@/constants';
import { Compass, Book, User, Settings as SettingsIcon, PenTool, LogOut, Coins, Search, Bell, Upload, BarChart3, PieChart, TrendingUp, Layers, Lock, ArrowRightLeft, HardDrive, Calendar, Package, Plus } from 'lucide-react';
import Sidebar from './Sidebar';
import ComicCard from './ComicCard';
import ComicButton from './ui/ComicButton';
import UserProfile from './UserProfile';
import Settings from './Settings';
import OrderManager from './OrderManager';
import ParallelogramInput from './ui/ParallelogramInput';
import NotificationToast from './NotificationToast';
import { supabase } from '@/lib/supabase';

interface DashboardProps {
  user: { email: string; role: 'reader' | 'author'; balance: number; plan: 'free' | 'premium' };
  onLogout: () => void;
  onRead?: (title: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onRead }) => {
  const activeTabStyle = "text-black";
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
    setTimeout(() => setToast(null), TIMING.TOAST_DURATION);
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {comicsList.map(comic => (
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
      {myLibrary.map(comic => (
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
            <ParallelogramInput
              placeholder="Le Secret de l'Encre..."
              value=""
              onChange={() => {}}
            />
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
                  placeholder="2500"
                  value={physicalPrice}
                  onChange={setPhysicalPrice}
                />
              </div>
              <div>
                <label className="font-bold block mb-2">Stock</label>
                <ParallelogramInput
                  placeholder="50"
                  value={physicalStock}
                  onChange={setPhysicalStock}
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
            onClick={() => showToast("Projet publié avec succès !", "Il est maintenant disponible dans le catalogue.")}
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

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={onLogout}
      />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>

      {toast && (
        <NotificationToast
          message={toast.message}
          subtext={toast.subtext}
        />
      )}
    </div>
  );
};

export default Dashboard;
