/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { X, Package, Truck, MapPin, CreditCard } from 'lucide-react';
import ComicButton from './ui/ComicButton';
import ParallelogramInput from './ui/ParallelogramInput';

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ShippingAddressFormProps {
  onSubmit: (address: Address) => void;
  onCancel: () => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ onSubmit, onCancel }) => {
  const [address, setAddress] = useState<Address>({
    street: '',
    city: '',
    postalCode: '',
    country: 'France',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simuler un traitement
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onSubmit(address);
    setIsProcessing(false);
  };

  const handleInputChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-4 border-black max-w-lg w-full transform rotate-1">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#2563EB] p-3 border-2 border-black">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-['Bangers'] text-xl">Adresse de livraison</h3>
                <p className="text-sm text-gray-600">Où souhaitez-vous recevoir votre commande ?</p>
              </div>
            </div>
            <button onClick={onCancel} className="p-2 border-2 border-black hover:bg-gray-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-bold block mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Adresse complète
              </label>
              <ParallelogramInput
                placeholder="123 rue de la BD"
                value={address.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-2">Ville</label>
                <ParallelogramInput
                  placeholder="Paris"
                  value={address.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="font-bold block mb-2">Code postal</label>
                <ParallelogramInput
                  placeholder="75001"
                  value={address.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-2">Pays</label>
              <select
                value={address.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]"
              >
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Canada">Canada</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Info livraison */}
            <div className="bg-[#2563EB] bg-opacity-10 border-2 border-[#2563EB] p-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#2563EB] mt-1" />
                <div>
                  <p className="font-bold text-sm mb-1">Informations de livraison</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Livraison sous 3-5 jours ouvrés</li>
                    <li>• Frais de port offerts dès 25€ d'achat</li>
                    <li>• Suivi de colis inclus</li>
                    <li>• Emballage soigné et écologique</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 border-2 border-black px-4 py-3 font-bold hover:bg-gray-100 transition-colors"
                disabled={isProcessing}
              >
                Annuler
              </button>
              <ComicButton
                type="submit"
                className="flex-1 flex items-center justify-center gap-2"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Confirmer la commande
                  </>
                )}
              </ComicButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
