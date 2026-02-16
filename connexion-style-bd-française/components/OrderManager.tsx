import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Lock, Unlock, AlertCircle } from 'lucide-react';

interface OrderManagerProps {
  onNotify?: (message: string, subtext: string) => void;
}

// Simulation des données de commande avec statut des fonds
const initialOrders = [
  { id: 'CMD-8492', buyer: 'tintin@moulinsart.be', items: 'Le Secret de l\'Encre (Tome 1) - Édition Papier', total: 2500, status: 'paid', fundsReleased: false, tracking: '', date: '24/10/2023', address: '26 Rue du Labrador, 1000 Bruxelles, Belgique' },
  { id: 'CMD-8493', buyer: 'asterix@village.ga', items: 'Nuit de Plomb - Collector', total: 4500, status: 'shipped', fundsReleased: true, tracking: 'GAUL-POST-123', date: '23/10/2023', address: 'Village Gaulois, Armorique, France' },
  { id: 'CMD-8494', buyer: 'spirou@dupuis.com', items: 'Ligne d\'Horizon', total: 1200, status: 'delivered', fundsReleased: true, tracking: 'SPIROU-XPRESS-99', date: '20/10/2023', address: 'Hôtel Moustic, Bruxelles' },
];

const OrderManager: React.FC<OrderManagerProps> = ({ onNotify }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [trackingInput, setTrackingInput] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateTracking = (tracking: string): boolean => {
      // Regex simple pour démo: Min 5 chars, Alphanumérique
      return /^[a-zA-Z0-9-]{5,}$/.test(tracking);
  };

  const handleShipOrder = (id: string) => {
    const tracking = trackingInput[id];
    
    if (!tracking) {
        setErrors({ ...errors, [id]: "Requis !" });
        return;
    }

    if (!validateTracking(tracking)) {
        setErrors({ ...errors, [id]: "Format Invalide" });
        return;
    }

    setOrders(orders.map(o => o.id === id ? { ...o, status: 'shipped', fundsReleased: true, tracking: tracking } : o));
    setErrors({ ...errors, [id]: "" });
    
    if (onNotify) {
        onNotify("Colis Expédié !", `Le suivi ${tracking} a été envoyé à l'acheteur.`);
    }
  };

  const handleTrackingChange = (id: string, value: string) => {
    setTrackingInput(prev => ({...prev, [id]: value}));
    if (errors[id]) setErrors({ ...errors, [id]: "" }); // Clear error on typing
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return { color: 'bg-[#FBBC05]', text: 'À PRÉPARER', icon: Clock };
      case 'shipped': return { color: 'bg-[#2563EB]', text: 'EN TRANSIT', icon: Truck };
      case 'delivered': return { color: 'bg-[#34A853]', text: 'LIVRÉ', icon: CheckCircle };
      default: return { color: 'bg-gray-400', text: 'INCONNU', icon: Package };
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-in slide-in-from-right duration-500 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-black text-white p-2 transform -skew-x-12 border-2 border-black shadow-[4px_4px_0px_0px_#2563EB]">
            <Package className="w-8 h-8 transform skew-x-12" />
        </div>
        <div>
            <h2 className="text-5xl text-black uppercase tracking-wide">Gestion des Expéditions</h2>
            <p className="text-black font-bold uppercase tracking-widest text-sm mt-1">
                Suivez vos ventes physiques et gérez les envois
            </p>
        </div>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => {
           const statusStyle = getStatusBadge(order.status);
           const StatusIcon = statusStyle.icon;
           const hasError = !!errors[order.id];

           return (
             <div key={order.id} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] relative group hover:-translate-y-1 transition-transform">
                {/* Header Commande */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-black pb-4 mb-4 gap-4">
                    <div className="flex items-center gap-4">
                        <span className="bg-black text-white px-2 py-0.5 font-['Bangers'] text-lg tracking-wider">{order.id}</span>
                        <div className={`flex items-center gap-2 px-3 py-0.5 border-2 border-black ${statusStyle.color} text-white transform -skew-x-12`}>
                            <StatusIcon className="w-4 h-4 transform skew-x-12" />
                            <span className="transform skew-x-12 font-['Bangers'] text-lg uppercase tracking-wide">{statusStyle.text}</span>
                        </div>
                    </div>
                    
                    {/* Indicateur Escrow */}
                    <div className={`flex items-center gap-2 px-4 py-1 border-2 border-black ${order.fundsReleased ? 'bg-[#34A853]/10 text-[#34A853]' : 'bg-gray-100 text-gray-500'}`}>
                        {order.fundsReleased ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        <span className="font-bold uppercase text-xs">
                            {order.fundsReleased ? 'Fonds Disponibles' : 'Fonds Bloqués (Escrow)'}
                        </span>
                    </div>
                </div>

                {/* Contenu */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <div className="flex items-start gap-3 mb-2">
                            <Package className="w-5 h-5 text-black mt-0.5" />
                            <div>
                                <h4 className="font-bold text-black uppercase text-lg leading-tight">{order.items}</h4>
                                <p className="text-sm font-bold text-[#2563EB] uppercase mt-1">Total: {order.total} IP (Livraison Incluse)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 mt-4 bg-gray-50 p-3 border-2 border-black/10 border-dashed">
                             <MapPin className="w-5 h-5 text-black mt-0.5" />
                             <div>
                                 <span className="block font-black text-xs uppercase text-gray-500 mb-1">Adresse de livraison</span>
                                 <p className="font-bold text-black uppercase leading-snug">{order.address}</p>
                                 <p className="text-xs font-bold text-gray-500 uppercase mt-1">Acheteur: {order.buyer}</p>
                             </div>
                        </div>
                    </div>

                    {/* Actions & Suivi */}
                    <div className="flex flex-col justify-start gap-3 border-l-2 border-black pl-6 md:border-l-2 border-t-2 md:border-t-0 pt-4 md:pt-0">
                        {order.status === 'paid' ? (
                            <div className={`bg-[#FBBC05]/20 p-4 border-2 ${hasError ? 'border-[#EA4335]' : 'border-[#FBBC05]'} border-dashed transition-colors`}>
                                <div className={`flex items-center gap-2 mb-2 ${hasError ? 'text-[#EA4335]' : 'text-[#FBBC05]'}`}>
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="font-black text-xs uppercase">
                                        {hasError ? errors[order.id] : 'Action Requise'}
                                    </span>
                                </div>
                                <label htmlFor={`tracking-${order.id}`} className="sr-only">Numéro de suivi colis</label>
                                <input 
                                    id={`tracking-${order.id}`}
                                    type="text" 
                                    placeholder="N° de Suivi (Requis)" 
                                    className="w-full border-2 border-black px-2 py-1 mb-2 font-mono text-sm uppercase focus:outline-none focus:border-[#2563EB]"
                                    value={trackingInput[order.id] || ''}
                                    onChange={(e) => handleTrackingChange(order.id, e.target.value)}
                                    aria-invalid={hasError}
                                    aria-describedby={`error-${order.id}`}
                                />
                                <button 
                                    onClick={() => handleShipOrder(order.id)}
                                    className="w-full bg-[#2563EB] border-2 border-black px-4 py-2 font-['Bangers'] uppercase text-white shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-sm min-h-[44px]"
                                >
                                    Confirmer & Débloquer
                                </button>
                                <p className="text-[10px] text-gray-500 mt-2 font-bold leading-tight">
                                    * L'argent sera crédité sur votre solde une fois le suivi renseigné.
                                </p>
                            </div>
                        ) : (
                            <div className="bg-[#F0F0F0] p-4 border-2 border-black">
                                <span className="block text-[10px] font-bold uppercase text-gray-500">Numéro de Suivi</span>
                                <span className="font-mono font-bold text-lg text-black">{order.tracking}</span>
                                <div className="mt-2 flex gap-2">
                                     <button className="flex-1 bg-white border-2 border-black py-1 font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors min-h-[44px]">
                                        Bordereau
                                     </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};

export default OrderManager;