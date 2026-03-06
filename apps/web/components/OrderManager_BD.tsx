import React from 'react';
import { Package, Truck, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const ORDER_AMOUNTS = {
  ENCRE_PHYSIQUE: 2500,
  HORIZON_PHYSIQUE: 3000,
  ETHER_PHYSIQUE: 2800,
} as const;

const OrderManager: React.FC = () => {
  // Simulation de données de commandes
  const orders = [
    {
      id: 'ORD-001',
      date: '2026-02-10',
      customer: 'Jean Dupont',
      product: 'Le Secret de l\'Encre - Édition Physique',
      status: 'shipped',
      trackingNumber: '1Z999AA10123456784',
      amount: ORDER_AMOUNTS.ENCRE_PHYSIQUE,
    },
    {
      id: 'ORD-002',
      date: '2026-02-08',
      customer: 'Marie Martin',
      product: 'Ligne d\'Horizon - Édition Physique',
      status: 'pending',
      trackingNumber: null,
      amount: ORDER_AMOUNTS.HORIZON_PHYSIQUE,
    },
    {
      id: 'ORD-003',
      date: '2026-02-05',
      customer: 'Pierre Durand',
      product: 'Ether Eternel - Édition Physique',
      status: 'delivered',
      trackingNumber: '1Z999AA10123456783',
      amount: ORDER_AMOUNTS.ETHER_PHYSIQUE,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'shipped':
        return 'text-blue-500';
      case 'delivered':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'shipped':
        return 'Expédié';
      case 'delivered':
        return 'Livré';
      case 'cancelled':
        return 'Annulé';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="bg-gray-900 border-4 border-[#2563EB] rounded-lg p-8">
      <h2 className="font-['Bangers'] text-3xl text-[#2563EB] mb-6 flex items-center gap-2">
        <Package className="w-8 h-8" />
        Gestion des Commandes
      </h2>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black border-2 border-[#2563EB] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{orders.length}</div>
          <div className="text-gray-400 text-sm">Total commandes</div>
        </div>
        <div className="bg-black border-2 border-yellow-500 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {orders.filter(o => o.status === 'pending').length}
          </div>
          <div className="text-gray-400 text-sm">En attente</div>
        </div>
        <div className="bg-black border-2 border-blue-500 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">
            {orders.filter(o => o.status === 'shipped').length}
          </div>
          <div className="text-gray-400 text-sm">Expédiées</div>
        </div>
        <div className="bg-black border-2 border-green-500 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-500">
            {orders.filter(o => o.status === 'delivered').length}
          </div>
          <div className="text-gray-400 text-sm">Livrées</div>
        </div>
      </div>

      {/* Liste des commandes */}
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-black border-2 border-[#2563EB] rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-white text-lg">{order.id}</h3>
                  <span className={`flex items-center gap-1 text-sm ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {getStatusText(order.status)}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Date: {order.date}</p>
                <p className="text-white font-medium">{order.product}</p>
                <p className="text-gray-400 text-sm">Client: {order.customer}</p>
                <p className="text-[#2563EB] font-bold">{order.amount} InkPoints</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                {order.trackingNumber && (
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Suivi:</p>
                    <p className="text-white font-mono text-sm">{order.trackingNumber}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <>
                      <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 transition-colors">
                        Expédier
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700 transition-colors">
                        Annuler
                      </button>
                    </>
                  )}

                  {order.status === 'shipped' && (
                    <button className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700 transition-colors">
                      Marquer comme livré
                    </button>
                  )}

                  <button className="bg-gray-700 text-white px-3 py-1 text-sm rounded hover:bg-gray-600 transition-colors">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions globales */}
      <div className="flex gap-4 mt-8">
        <button className="bg-[#2563EB] text-black px-6 py-3 font-bold border-2 border-black hover:bg-[#FF6B35] transition-colors">
          Exporter les commandes
        </button>
        <button className="bg-gray-700 text-white px-6 py-3 font-bold border-2 border-gray-600 hover:bg-gray-600 transition-colors">
          Actualiser
        </button>
      </div>
    </div>
  );
};

export default OrderManager;
