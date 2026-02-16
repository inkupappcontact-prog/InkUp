import React from 'react';
import InkUpLogo from './InkUpLogo';
import { LEGAL_INFO } from '../constants/legal';
import { Lock } from 'lucide-react';

interface FooterProps {
  onLegalClick: (type: 'mentions' | 'cgu' | 'cgv' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  return (
    <footer className="bg-white pt-12 pb-8 px-6 text-center border-t-8 border-black">
      <InkUpLogo className="w-16 h-16 mx-auto mb-6 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all" />
      <p className="font-['Bangers'] text-xl uppercase text-[#1A1A1A] mb-8">InkUp - La Plateforme BD de demain</p>
      
      {/* Navigation Légale : Empilée sur mobile, ligne sur desktop */}
      <nav className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm font-bold uppercase text-[#374151] mb-10">
          <button 
            onClick={() => onLegalClick('mentions')} 
            className="hover:text-[#1A1A1A] hover:underline hover:scale-105 transition-all py-2 md:py-0"
          >
            Mentions Légales
          </button>
          <button 
            onClick={() => onLegalClick('cgu')} 
            className="hover:text-[#1A1A1A] hover:underline hover:scale-105 transition-all py-2 md:py-0"
          >
            CGU
          </button>
          <button 
            onClick={() => onLegalClick('cgv')} 
            className="hover:text-[#1A1A1A] hover:underline hover:scale-105 transition-all py-2 md:py-0"
          >
            CGV
          </button>
          <button 
            onClick={() => onLegalClick('privacy')} 
            className="hover:text-[#1A1A1A] hover:underline hover:scale-105 transition-all py-2 md:py-0"
          >
            Confidentialité
          </button>
          <a 
            href={`mailto:${LEGAL_INFO.contact_email}`} 
            className="hover:text-[#1A1A1A] hover:underline hover:scale-105 transition-all py-2 md:py-0"
          >
            Contact Support
          </a>
      </nav>

      {/* Badge de Sécurité Stripe */}
      <div 
         className="flex justify-center items-center gap-2 mb-8 bg-gray-50 inline-flex px-4 py-2 border border-gray-200 rounded mx-auto"
         role="img"
         aria-label="Paiements 100% sécurisés par Stripe"
      >
         <Lock className="w-4 h-4 text-[#34A853]" aria-hidden="true" />
         <span className="text-xs font-bold text-[#374151] uppercase">
            Paiements 100% Sécurisés par <span className="text-[#635BFF] font-black">Stripe</span>
         </span>
      </div>

      {/* Mentions Légales Détaillées */}
      <div className="mt-8 text-xs font-mono text-[#374151] leading-relaxed flex flex-col items-center gap-1">
        <p>
            © {new Date().getFullYear()} {LEGAL_INFO.trade_name} par {LEGAL_INFO.entrepreneur}. Tous droits réservés.
        </p>
        <p>
            {LEGAL_INFO.status} • SIRET : {LEGAL_INFO.siret}
        </p>
        <p>
            Siège social : {LEGAL_INFO.address}
        </p>
        <p className="text-[10px] mt-2 italic opacity-80 font-semibold">
            {LEGAL_INFO.vat_mention}
        </p>
      </div>
    </footer>
  );
};

export default Footer;