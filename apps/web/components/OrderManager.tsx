import React, { useState } from 'react';
import { Package, Truck, Calendar, User, MapPin } from 'lucide-react';
import ComicButton from './ui/ComicButton';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  title: string;
  format: 'digital' | 'physical';
  price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  trackingNumber?: string;
  address?: string;
}

const OrderManager: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'Jean Dupont',
      customerEmail: 'jean.dupont@email.com',
      title: 'Le Secret de l\'Encre',
      format: 'physical',
      price: 45,
      status: 'processing',
      date: '2024-02-08',
      address: '123 rue de la BD, 75001 Paris'
    },
    {
      id: 'ORD-002',
      customerName: 'Marie Curie',
      customerEmail: 'marie.curie@email.com',
      title: 'Nuit de Plomb',
      format: 'digital',
      price: 0,
      status: 'delivered',
      date: '2024-02-07'
    },
    {
      id: 'ORD-003',
      customerName: 'Pierre Martin',
      customerEmail: 'pierre.martin@email.com',
      title: 'Ligne d\'Horizon',
      format: 'physical',
      price: 60,
      status: 'shipped',
      date: '2024-02-06',
      trackingNumber: 'FR123456789',
      address: '456 avenue des Livres, 69000 Lyon'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En traitement';
      case 'shipped':
        return 'Expédié';
      case 'delivered':
        return 'Livré';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    console.log(`Mise à jour du statut ${orderId} vers ${newStatus}`);
    // Implémenter la mise à jour du statut
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-4 border-black p-6">
        <h2 className="font-['Bangers'] text-3xl mb-4 flex items-center gap-3">
          <Package className="w-8 h-8" />
          Gestion des Commandes
        </h2>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-4 border-black p-3 font-bold focus:outline-none focus:border-[#2563EB]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="processing">En traitement</option>
            <option value="shipped">Expédié</option>
            <option value="delivered">Livré</option>
          </select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border-4 border-black p-4 transform -rotate-1">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-6 h-6 text-[#2563EB]" />
            <span className="font-bold">Total</span>
          </div>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-white border-4 border-black p-4 transform rotate-1">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-6 h-6 text-yellow-500" />
            <span className="font-bold">En cours</span>
          </div>
          <p className="text-2xl font-bold">
            {orders.filter(o => o.status === 'processing' || o.status === 'shipped').length}
          </p>
        </div>
        <div className="bg-white border-4 border-black p-4 transform -rotate-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-green-500" />
            <span className="font-bold">Aujourd'hui</span>
          </div>
          <p className="text-2xl font-bold">
            {orders.filter(o => o.date === new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
        <div className="bg-white border-4 border-black p-4 transform -rotate-1">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-6 h-6 text-purple-500" />
            <span className="font-bold">Physiques</span>
          </div>
          <p className="text-2xl font-bold">
            {orders.filter(o => o.format === 'physical').length}
          </p>
        </div>
      </div>

      {/* Liste des commandes */}
      <div className="bg-white border-4 border-black p-6">
        <h3 className="font-['Bangers'] text-2xl mb-4">Liste des commandes</h3>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border-4 border-black p-4 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Infos commande */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg">{order.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold border-2 border-gray-300">
                      {order.format === 'physical' ? 'Physique' : 'Numérique'}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{order.customerName}</span>
                      <span className="text-gray-500">({order.customerEmail})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span>{order.title}</span>
                      <span className="font-bold text-[#2563EB]">{order.price === 0 ? 'GRATUIT' : `${order.price}€`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{order.date}</span>
                    </div>
                    {order.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{order.address}</span>
                      </div>
                    )}
                    {order.trackingNumber && (
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Suivi: {order.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {order.status === 'pending' && (
                    <ComicButton
                      onClick={() => handleUpdateStatus(order.id, 'processing')}
                      className="text-sm"
                    >
                      Traiter
                    </ComicButton>
                  )}
                  {order.status === 'processing' && (
                    <ComicButton
                      onClick={() => handleUpdateStatus(order.id, 'shipped')}
                      className="text-sm"
                    >
                      Expédier
                    </ComicButton>
                  )}
                  {order.status === 'shipped' && (
                    <ComicButton
                      onClick={() => handleUpdateStatus(order.id, 'delivered')}
                      className="text-sm"
                    >
                      Marquer comme livré
                    </ComicButton>
                  )}
                  <button className="border-2 border-black px-3 py-1 text-sm font-bold hover:bg-gray-100 transition-colors">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-bold">Aucune commande trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManager;
