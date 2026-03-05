import React, { useState } from 'react';
import { Bell, Shield, Coins, TrendingUp, Check, X, Star, CreditCard, Trash2, Download, FileText, Mail, Code } from 'lucide-react';
import ComicButton from './ComicButton';
import PurchaseConfirmationModal from './PurchaseConfirmationModal';
import { getWelcomeEmailHtml } from '../utils/emailTemplates';

const Settings: React.FC = () => {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [selectedPack, setSelectedPack] = useState<{ price: string; points: number; bonus: string } | null>(null);

  const handlePurchase = () => {
      // Logique API Stripe ici
      alert("Redirection vers Stripe sécurisée...");
      setSelectedPack(null);
  };

  const handlePreviewEmail = () => {
      const html = getWelcomeEmailHtml("Jean Dupont");
      const win = window.open("", "EmailPreview", "width=650,height=800,scrollbars=yes");
      if (win) {
          win.document.write(html);
          win.document.close();
      }
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 pb-20">
      
      {selectedPack && (
          <PurchaseConfirmationModal 
            pack={selectedPack} 
            onClose={() => setSelectedPack(null)} 
            onConfirm={handlePurchase} 
          />
      )}

      <div className="flex items-center gap-4 mb-12 border-b-4 border-black pb-6">
        <div className="bg-[#2563EB] text-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
            <SettingsIcon className="w-8 h-8" />
        </div>
        <h2 className="text-6xl text-black uppercase tracking-wide">Réglages & Conformité</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* COLONNE GAUCHE : PARAMÈTRES (4 cols) */}
        <div className="lg:col-span-4 space-y-10">
            {/* Section Notifications */}
            <section className="bg-white border-4 border-black p-6 relative shadow-[8px_8px_0px_0px_#000]">
                <div className="absolute -top-5 left-4 bg-white border-2 border-black px-4 py-1">
                    <h3 className="font-['Bangers'] text-xl uppercase tracking-wider flex items-center gap-2 text-black">
                        <Bell className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                        Alertes
                    </h3>
                </div>
                <div className="space-y-4 mt-2">
                    <ComicToggle label="Emails Hibou" checked={notifEmail} onChange={setNotifEmail} />
                    <ComicToggle label="Notifs Push" checked={notifPush} onChange={setNotifPush} />
                </div>
            </section>
            
            {/* Section RGPD : Mes Données */}
            <section className="bg-white border-4 border-black p-6 relative shadow-[8px_8px_0px_0px_#000]">
                <div className="absolute -top-5 left-4 bg-white border-2 border-black px-4 py-1">
                    <h3 className="font-['Bangers'] text-xl uppercase tracking-wider flex items-center gap-2 text-black">
                        <Shield className="w-4 h-4 text-[#34A853]" aria-hidden="true" />
                        Mes Données
                    </h3>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                    <p className="text-xs font-bold text-gray-700">Conformément au RGPD, vous pouvez récupérer l'intégralité de vos données.</p>
                    <button className="flex items-center justify-center gap-2 bg-white border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors font-bold uppercase text-sm">
                        <Download className="w-4 h-4" />
                        Exporter (JSON)
                    </button>
                </div>
            </section>

             {/* Section Admin / CRM (Pour la démo) */}
             <section className="bg-white border-4 border-black p-6 relative shadow-[8px_8px_0px_0px_#000]">
                <div className="absolute -top-5 left-4 bg-black text-white border-2 border-black px-4 py-1">
                    <h3 className="font-['Bangers'] text-xl uppercase tracking-wider flex items-center gap-2">
                        <Code className="w-4 h-4 text-[#FBBC05]" aria-hidden="true" />
                        Outils Admin
                    </h3>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                    <p className="text-xs font-bold text-gray-700">Outils de test pour l'équipe CRM.</p>
                    <button 
                        onClick={handlePreviewEmail}
                        className="flex items-center justify-center gap-2 bg-[#F0F0F0] border-2 border-black px-4 py-2 hover:bg-[#2563EB] hover:text-white transition-colors font-bold uppercase text-sm"
                    >
                        <Mail className="w-4 h-4" />
                        Preview Email Bienvenue
                    </button>
                </div>
            </section>

            {/* Zone Danger (Droit à l'oubli) */}
             <section className="border-4 border-[#EA4335] bg-[#EA4335]/5 p-6 relative">
                <div className="absolute -top-5 left-4 bg-[#EA4335] text-white border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_#000]">
                    <h3 className="font-['Bangers'] text-xl uppercase tracking-wider flex items-center gap-2">
                        Droit à l'oubli
                    </h3>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                    <p className="text-xs font-medium text-black leading-tight">Suppression définitive du compte et anonymisation des transactions passées.</p>
                    <button 
                        className="bg-white border-2 border-[#EA4335] text-[#EA4335] p-2 hover:bg-[#EA4335] hover:text-white transition-colors shadow-[3px_3px_0px_0px_#000] flex justify-center gap-2 font-black uppercase text-sm"
                        aria-label="Supprimer mon compte définitivement"
                        onClick={() => alert("Action irréversible. Un email de confirmation a été envoyé.")}
                    >
                        <Trash2 className="w-5 h-5" />
                        Supprimer mon compte
                    </button>
                </div>
            </section>
        </div>

        {/* COLONNE DROITE : FINANCES & FACTURES (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
            
            {/* 1. PORTE-MONNAIE INKPOINTS */}
            <section className="bg-black border-4 border-black p-8 text-white shadow-[8px_8px_0px_0px_#2563EB] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Coins className="w-48 h-48 transform -rotate-12" aria-hidden="true" />
                </div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-['Bangers'] text-3xl uppercase tracking-wide text-[#FBBC05] mb-1">Porte-Monnaie</h3>
                            <p className="text-sm text-[#FBBC05] font-bold uppercase">Système de recharge avec bonus</p>
                        </div>
                        <div className="text-right">
                             <div className="text-6xl font-['Bangers'] leading-none">150 <span className="text-2xl text-[#2563EB]">IP</span></div>
                             <div className="text-xs font-bold uppercase text-white mt-1">≈ 1.50 €</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { price: '5€', points: 550, bonus: '+10% OFFERT' },
                            { price: '10€', points: 1100, bonus: '+10% OFFERT', popular: true },
                            { price: '20€', points: 2200, bonus: '+10% OFFERT' }
                        ].map((pack, i) => (
                            <button 
                                key={i} 
                                onClick={() => setSelectedPack(pack)}
                                className={`
                                    relative border-2 p-4 flex flex-col items-center transition-all group min-h-[44px] cursor-pointer
                                    ${pack.popular ? 'bg-[#2563EB] border-white text-white shadow-[4px_4px_0px_0px_#FFF] scale-105 z-10' : 'bg-white border-black text-black hover:bg-gray-100'}
                                `}
                                aria-label={`Acheter ${pack.points} InkPoints pour ${pack.price}`}
                            >
                                {pack.popular && (
                                    <div className="absolute -top-3 bg-[#FBBC05] text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black transform rotate-2">
                                        Populaire
                                    </div>
                                )}
                                <span className="font-['Bangers'] text-2xl">{pack.points} IP</span>
                                <span className={`text-[10px] font-bold uppercase mb-2 ${pack.popular ? 'text-white' : 'text-[#2563EB]'}`}>{pack.bonus}</span>
                                <div className={`w-full border-t-2 border-dashed my-2 ${pack.popular ? 'border-white/30' : 'border-black/10'}`}></div>
                                <span className="font-black text-lg">{pack.price}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. MES FACTURES */}
            <section className="bg-white border-4 border-black p-8 relative shadow-[8px_8px_0px_0px_#000]">
                 <div className="absolute -top-5 left-8 bg-[#FBBC05] text-black border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_#000]">
                    <h3 className="font-['Bangers'] text-xl uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Mes Factures
                    </h3>
                </div>

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-black font-['Bangers'] text-lg uppercase">
                                <th className="p-2 text-black">Date</th>
                                <th className="p-2 text-black">N° Facture</th>
                                <th className="p-2 text-black">Montant</th>
                                <th className="p-2 text-black">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold text-sm text-gray-700">
                            {[
                                { date: '24/10/2023', ref: 'INV-2023-001', amount: '10.00 €' },
                                { date: '12/09/2023', ref: 'INV-2023-002', amount: '5.00 €' },
                            ].map((inv, idx) => (
                                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-2">{inv.date}</td>
                                    <td className="p-2">{inv.ref}</td>
                                    <td className="p-2">{inv.amount}</td>
                                    <td className="p-2">
                                        <button className="text-[#2563EB] hover:underline flex items-center gap-1 uppercase text-xs font-black">
                                            <Download className="w-3 h-3" /> PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
      </div>
    </div>
  );
};

const ComicToggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, checked, onChange }) => (
    <div 
        className="flex items-center justify-between cursor-pointer group min-h-[44px]" 
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') onChange(!checked); }}
    >
        <span className="font-bold text-sm uppercase tracking-wide text-black group-hover:text-[#2563EB] transition-colors select-none">{label}</span>
        <div className={`w-10 h-6 border-2 border-black flex items-center px-0.5 transition-colors duration-200 relative shadow-[2px_2px_0px_0px_#000] ${checked ? 'bg-[#34A853]' : 'bg-gray-200'}`}>
            <div className={`w-4 h-4 border-2 border-black bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
        </div>
    </div>
);

const SettingsIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

export default Settings;