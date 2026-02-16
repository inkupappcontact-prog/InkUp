import React, { useState } from 'react';
import ParallelogramInput from './ParallelogramInput';
import ComicButton from './ComicButton';
import { MapPin } from 'lucide-react';

interface ShippingAddressFormProps {
  onSubmit: (address: any) => void;
  onCancel: () => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    city: '',
    zipCode: '',
    country: 'France'
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_0px_#2563EB] max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-4">
        <div className="bg-[#2563EB] text-white p-2 border-2 border-black">
            <MapPin className="w-6 h-6" />
        </div>
        <h3 className="font-['Bangers'] text-3xl uppercase tracking-wide text-black">Lieu de Livraison</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <ParallelogramInput 
            label="Destinataire (Nom complet)" 
            value={formData.fullName} 
            onChange={(e) => handleChange('fullName', e.target.value)} 
            placeholder="Ex: Spirou"
        />
        
        <ParallelogramInput 
            label="Adresse (Rue, Numéro)" 
            value={formData.addressLine1} 
            onChange={(e) => handleChange('addressLine1', e.target.value)} 
            placeholder="Ex: 12 Rue de la Paix"
        />

        <div className="grid grid-cols-2 gap-4">
             <ParallelogramInput 
                label="Code Postal" 
                value={formData.zipCode} 
                onChange={(e) => handleChange('zipCode', e.target.value)} 
                placeholder="75000"
            />
            <ParallelogramInput 
                label="Ville" 
                value={formData.city} 
                onChange={(e) => handleChange('city', e.target.value)} 
                placeholder="Paris"
            />
        </div>

        <div className="mb-6">
            <label className="block text-black font-bold text-xs uppercase tracking-widest mb-2 ml-1">Pays</label>
            <select 
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full h-12 border-2 border-black px-4 font-bold uppercase text-black focus:outline-none focus:border-[#2563EB] focus:shadow-[4px_4px_0px_0px_#2563EB] transition-all bg-white"
            >
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Canada">Canada</option>
            </select>
        </div>

        <div className="flex gap-4 pt-4">
            <button 
                type="button" 
                onClick={onCancel}
                className="flex-1 py-3 border-2 border-black font-['Bangers'] uppercase text-xl hover:bg-black hover:text-white transition-colors"
            >
                Annuler
            </button>
            <ComicButton type="submit" className="flex-1 font-['Bangers'] text-xl">
                Valider l'envoi
            </ComicButton>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressForm;