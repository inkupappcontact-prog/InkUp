import React from 'react';
import { X, Scale, FileText, ShieldCheck, Info } from 'lucide-react';
import { LEGAL_INFO } from '../constants/legal';

interface LegalModalProps {
  type: 'cgu' | 'cgv' | 'privacy' | 'mentions';
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const getContent = () => {
    switch(type) {
      case 'mentions':
        return {
          title: "Mentions Légales",
          icon: Info,
          content: (
             <div className="space-y-6">
                <section>
                    <h3 className="font-bold uppercase text-lg mb-2">1. Éditeur du site</h3>
                    <p>
                        Le site <strong>{LEGAL_INFO.trade_name}</strong> est édité par l'entreprise individuelle <strong>{LEGAL_INFO.entrepreneur}</strong>.<br/>
                        <strong>Siège social :</strong> {LEGAL_INFO.address}<br/>
                        <strong>SIRET :</strong> {LEGAL_INFO.siret}<br/>
                        <strong>SIREN :</strong> {LEGAL_INFO.siren}<br/>
                        <strong>Code APE :</strong> {LEGAL_INFO.ape_code}<br/>
                        <strong>Email :</strong> {LEGAL_INFO.contact_email}<br/>
                        {LEGAL_INFO.vat_mention}
                    </p>
                </section>
                <section>
                    <h3 className="font-bold uppercase text-lg mb-2">2. Hébergement</h3>
                    <p>
                        Le site est hébergé par :<br/>
                        <strong>{LEGAL_INFO.host_name}</strong><br/>
                        Adresse : {LEGAL_INFO.host_address}
                    </p>
                </section>
             </div>
          )
        };
      case 'cgu':
        return {
          title: "Conditions Générales d'Utilisation",
          icon: Scale,
          content: (
            <div className="space-y-4">
              <p><strong>1. Objet :</strong> Les présentes CGU régissent l'utilisation de la plateforme {LEGAL_INFO.trade_name} et l'achat de monnaie virtuelle "InkPoints".</p>
              <p><strong>2. InkPoints & Rétractation :</strong> Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour la fourniture de contenus numériques non fournis sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur. En validant l'achat de InkPoints, l'utilisateur accepte l'accès immédiat au service et renonce expressément à son droit de rétractation. Les InkPoints ne sont ni remboursables, ni échangeables contre des devises réelles.</p>
              <p><strong>3. Propriété Intellectuelle :</strong> Les auteurs conservent 100% des droits moraux sur leurs œuvres. En publiant sur {LEGAL_INFO.trade_name}, ils accordent une licence de distribution numérique non-exclusive.</p>
              <p><strong>4. Modération :</strong> {LEGAL_INFO.trade_name} se réserve le droit de supprimer tout contenu haineux, illégal ou violant le droit d'auteur.</p>
            </div>
          )
        };
      case 'cgv':
        return {
          title: "Conditions Générales de Vente (Physique)",
          icon: FileText,
          content: (
            <div className="space-y-4">
              <p><strong>1. Prix :</strong> Les prix sont indiqués en InkPoints et incluent la livraison ("Frais de port"). {LEGAL_INFO.vat_mention}.</p>
              <p><strong>2. Livraison :</strong> Les délais sont indicatifs. Le transfert des risques s'effectue à la livraison.</p>
              <p><strong>3. Droit de Retour :</strong> Pour les produits physiques, l'acheteur dispose d'un délai de 14 jours après réception pour exercer son droit de retour. Les frais de retour sont à la charge de l'acheteur, sauf mention contraire de l'auteur.</p>
              <p><strong>4. Litiges :</strong> En cas de non-réception, les fonds séquestrés (Escrow) seront remboursés à l'acheteur après enquête.</p>
            </div>
          )
        };
      case 'privacy':
        return {
          title: "Politique de Confidentialité (RGPD)",
          icon: ShieldCheck,
          content: (
            <div className="space-y-4">
              <p><strong>1. Responsable de traitement :</strong> {LEGAL_INFO.entrepreneur}, {LEGAL_INFO.address}.</p>
              <p><strong>2. Données collectées :</strong> Email, IP, Historique de lecture, Adresse de livraison (si achat physique).</p>
              <p><strong>3. Finalité :</strong> Gestion du compte, Exécution du contrat de vente, Lutte contre la fraude.</p>
              <p><strong>4. Vos Droits :</strong> Vous disposez d'un droit d'accès, de rectification et d'effacement ("Droit à l'oubli"). Contact: {LEGAL_INFO.contact_email}.</p>
              <p><strong>5. Sous-traitants :</strong> Stripe (Paiement), Supabase (Hébergement). Aucune donnée n'est revendue à des tiers publicitaires.</p>
            </div>
          )
        };
    }
  };

  const { title, icon: Icon, content } = getContent();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white border-4 border-black w-full max-w-2xl max-h-[80vh] flex flex-col shadow-[12px_12px_0px_0px_#2563EB]">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-black bg-[#F0F0F0]">
            <div className="flex items-center gap-3">
                <Icon className="w-8 h-8 text-[#2563EB]" aria-hidden="true" />
                <h2 id="modal-title" className="font-['Bangers'] text-2xl uppercase tracking-wide">{title}</h2>
            </div>
            <button
                onClick={onClose}
                className="p-2 border-2 border-black bg-white hover:bg-[#EA4335] hover:text-white transition-colors"
                aria-label="Fermer la fenêtre"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Content Scrollable */}
        <div className="p-8 overflow-y-auto text-black leading-relaxed text-lg" tabIndex={0}>
            {content}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-4 border-black bg-white flex justify-end">
             <button
                onClick={onClose}
                className="font-['Bangers'] uppercase text-xl border-2 border-black px-6 py-2 shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:bg-black active:text-white"
             >
                J'ai lu et compris
             </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;