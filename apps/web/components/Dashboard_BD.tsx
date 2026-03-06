import React, { useState } from 'react';
import { TIMING } from '@/constants';
import { Book, User, Settings as SettingsIcon, PenTool, LogOut, Coins, Search, Bell, Upload, BarChart3, PieChart, TrendingUp, Layers, Lock, ArrowRightLeft, HardDrive, Calendar, Package } from 'lucide-react';
import Sidebar from './Sidebar_BD';
import ComicCard from './ComicCard_BD';
import ComicButton from './ComicButton_BD';
import UserProfile from './UserProfile_BD';
import Settings from './Settings_BD';
import OrderManager from './OrderManager_BD';
import ParallelogramInput from './ParallelogramInput_BD';
import NotificationToast from './NotificationToast_BD';

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
    setTimeout(() => setToast(null), TIMING.TOAST_DURATION);
  };

  // Simulation de données avec attributs physiques
  const comics = [
    { id: '1', title: 'Le Secret de l\'Encre', author: 'Moebius II', cover: 'https://images.unsplash.com/photo-1580136608260-42d1c4101a92?auto=format&fit=crop&q=80&w=400', price: 45, category: 'Sci-Fi', hasPhysical: true, stock: 12 },
    { id: '2', title: 'Nuit de Plomb', author: 'Tardi Fan', cover: 'https://images.unsplash.com/photo-1618519764620-7403abdbf951?auto=format&fit=crop&q=80&w=400', price: 0, category: 'Noir', hasPhysical: false, isMature: true },
    { id: '3', title: 'Ligne d\'Horizon', author: 'Hergé Legacy', cover: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=400', price: 60, category: 'Aventure', hasPhysical: true, stock: 5 },
    { id: '4', title: 'Cyanure & Co', author: 'Franquin Jr', cover: 'https://images.unsplash.com/photo-1543004218-ee141104e14a?auto=format&fit=crop&q=80&w=400', price: 30, category: 'Humour', hasPhysical: false },
    { id: '5', title: 'Ether Eternel', author: 'Uderzo Tribute', cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400', price: 50, category: 'Fantaisie', hasPhysical: true, stock: 0 },
    { id: '6', title: 'Bruit de Fond', author: 'Giraud Style', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400', price: 25, category: 'Western', hasPhysical: false },
  ];

  const LIBRARY_PREVIEW_COUNT = 2;
  const myLibrary = comics.slice(0, LIBRARY_PREVIEW_COUNT);
  const weeklyStats = [150, 230, 180, 320, 290, 450, 510]; // Lun -> Dim
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const maxStat = Math.max(...weeklyStats);

  const renderDiscovery = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {comics.map(comic => (
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
          isMature={comic.isMature}
          onRead={() => onRead?.(comic.title)}
        />
      ))}
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      <div className="bg-gray-900 border-4 border-[#2563EB] rounded-lg p-6">
        <h3 className="font-['Bangers'] text-2xl text-[#2563EB] mb-4">Statistiques de la semaine</h3>
        <div className="space-y-4">
          {weeklyStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="text-white font-bold w-12">{days[index]}</span>
              <div className="flex-1 bg-gray-800 rounded-full h-8 relative">
                <div
                  className="bg-[#2563EB] h-full rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(stat / maxStat) * 100}%` }}
                >
                  <span className="text-black font-bold text-sm">{stat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border-4 border-[#2563EB] rounded-lg p-6 text-center">
          <Coins className="w-12 h-12 text-[#2563EB] mx-auto mb-2" />
          <h4 className="text-white font-bold text-xl">{user.balance}</h4>
          <p className="text-gray-400">InkPoints</p>
        </div>
        <div className="bg-gray-900 border-4 border-[#2563EB] rounded-lg p-6 text-center">
          <Book className="w-12 h-12 text-[#2563EB] mx-auto mb-2" />
          <h4 className="text-white font-bold text-xl">{myLibrary.length}</h4>
          <p className="text-gray-400">BD possédées</p>
        </div>
        <div className="bg-gray-900 border-4 border-[#2563EB] rounded-lg p-6 text-center">
          <TrendingUp className="w-12 h-12 text-[#2563EB] mx-auto mb-2" />
          <h4 className="text-white font-bold text-xl">+15%</h4>
          <p className="text-gray-400">Ce mois-ci</p>
        </div>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="bg-gray-900 border-4 border-[#2563EB] rounded-lg p-8">
      <h3 className="font-['Bangers'] text-3xl text-[#2563EB] mb-6">Nouveau Projet</h3>
      <form className="space-y-6">
        <ParallelogramInput
          label="Titre de l'œuvre"
          placeholder="Le titre de votre BD..."
          value=""
          onChange={() => {}}
        />
        <ParallelogramInput
          label="Description"
          placeholder="Décrivez votre œuvre..."
          value=""
          onChange={() => {}}
        />
        <ParallelogramInput
          label="Prix (InkPoints)"
          placeholder="100"
          value=""
          onChange={() => {}}
        />

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={newProjectPhysical}
              onChange={(e) => setNewProjectPhysical(e.target.checked)}
              className="w-5 h-5 accent-[#2563EB]"
            />
            <span className="text-white font-bold">Proposer une version physique</span>
          </label>

          {newProjectPhysical && (
            <div className="space-y-4 pl-8 border-l-4 border-[#2563EB]">
              <ParallelogramInput
                label="Prix physique (InkPoints)"
                placeholder="2500"
                value={physicalPrice}
                onChange={(e) => setPhysicalPrice(e.target.value)}
              />
              <ParallelogramInput
                label="Stock initial"
                placeholder="50"
                value={physicalStock}
                onChange={(e) => setPhysicalStock(e.target.value)}
              />
            </div>
          )}
        </div>

        <ComicButton type="submit" className="w-full h-14 text-xl">
          <span>Publier l'œuvre</span>
        </ComicButton>
      </form>
    </div>
  );

  const renderProfile = () => <UserProfile user={user} />;
  const renderSettings = () => <Settings />;
  const renderOrders = () => <OrderManager />;

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={onLogout} />

      <main className="flex-1 p-8">
        {toast && <NotificationToast message={toast.message} subtext={toast.subtext} />}

        {activeTab === 'discovery' && renderDiscovery()}
        {activeTab === 'library' && renderLibrary()}
        {activeTab === 'stats' && renderStats()}
        {activeTab === 'upload' && renderUpload()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'orders' && renderOrders()}
      </main>
    </div>
  );
};

export default Dashboard;
