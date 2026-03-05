import React from 'react';
import { X, Scale, FileText, ShieldCheck, Info } from 'lucide-react';

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
             <div className="space-y-6 text-sm text-white">
                <section>
                    <h3 className="font-bold uppercase text-lg mb-2 text-[#2563EB]">1. Éditeur du site</h3>
                    <p>
                        Le site <strong>InkUp</strong> est édité par l'entreprise individuelle <strong>Blouin Flavian</strong>.<br/>
                        <strong>Siège social :</strong> 1 RUE du Bois Joly, 49120 Chemillé-en-Anjou, FRANCE<br/>
                        <strong>SIRET :</strong> 993 076 116 00017<br/>
                        <strong>SIREN :</strong> 993 076 116<br/>
                        <strong>Code APE :</strong> 6201Z<br/>
                        <strong>Email :</strong> contact@inkup.com<br/>
                        TVA non applicable, art. 293 B du CGI
                    </p>
                </section>
                <section>
                    <h3 className="font-bold uppercase text-lg mb-2 text-[#2563EB]">2. Hébergement</h3>
                    <p>
                        Le site est hébergé par :<br/>
                        <strong>Vercel Inc.</strong><br/>
                        Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA
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
            <div className="space-y-4 text-sm text-white">
              <p><strong>1. Objet :</strong> Les présentes CGU régissent l'utilisation de la plateforme InkUp et l'achat de monnaie virtuelle "InkPoints".</p>
              <p><strong>2. InkPoints & Rétractation :</strong> Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour la fourniture de contenus numériques non fournis sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur. En validant l'achat de InkPoints, l'utilisateur accepte l'accès immédiat au service et renonce expressément à son droit de rétractation. Les InkPoints ne sont ni remboursables, ni échangeables contre des devises réelles.</p>
              <p><strong>3. Propriété Intellectuelle :</strong> Les auteurs conservent 100% des droits moraux sur leurs œuvres. En publiant sur InkUp, ils accordent une licence de distribution numérique non-exclusive.</p>
              <p><strong>4. Responsabilité :</strong> InkUp agit comme intermédiaire technique. La plateforme n'est responsable que des dysfonctionnements techniques avérés et prouvés.</p>
              <p><strong>5. Modération :</strong> Tout contenu non conforme à la loi française sera supprimé sans préavis.</p>
            </div>
          )
        };
      case 'privacy':
        return {
          title: "Politique de Confidentialité",
          icon: ShieldCheck,
          content: (
            <div className="space-y-4 text-sm text-white">
              <p><strong>1. Données collectées :</strong> Email, nom, pseudonyme, préférences, données de connexion, transactions.</p>
              <p><strong>2. Base légale :</strong> Consentement (création compte), exécution contractuelle (fourniture service), obligation légale (facturation).</p>
              <p><strong>3. Durée de conservation :</strong> Compte actif : durée de la relation. Données comptables : 10 ans. Cookies : 13 mois maximum.</p>
              <p><strong>4. Vos droits RGPD :</strong> Accès, rectification, effacement, limitation, portabilité, opposition. Contact : privacy@inkup.com</p>
              <p><strong>5. Sous-traitants :</strong> Supabase (base de données), Stripe (paiements), Google Analytics (anonymisé).</p>
              <p><strong>6. Sécurité :</strong> Chiffrement SSL/TLS, contrôle d'accès strict, surveillance continue.</p>
            </div>
          )
        };
      default:
        return {
          title: "Conditions Générales de Vente",
          icon: FileText,
          content: (
            <div className="space-y-4 text-sm text-white">
              <p><strong>1. Objet :</strong> Les présentes CGV régissent la vente de bandes dessinées numériques et physiques sur la plateforme InkUp.</p>
              <p><strong>2. Prix :</strong> Les prix sont indiqués en euros TTC. InkUp se réserve le droit de modifier ses prix à tout moment.</p>
              <p><strong>3. Paiement :</strong> Le paiement est sécurisé via Stripe. Les cartes acceptées : Visa, Mastercard, American Express.</p>
              <p><strong>4. Livraison :</strong> Numérique : immédiate. Physique : 2-5 jours ouvrés (France métropolitaine).</p>
              <p><strong>5. Rétractation :</strong> 14 jours pour les exemplaires physiques. Non applicable aux contenus numériques.</p>
            </div>
          )
        };
    }
  };

  const { title, icon: Icon, content } = getContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-4 border-[#2563EB] rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#2563EB] rounded-lg border-2 border-[#2563EB] transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#2563EB] p-3 rounded-lg">
            <Icon className="w-6 h-6 text-black" />
          </div>
          <h2 className="font-['Bangers'] text-3xl text-white">{title}</h2>
        </div>

        <div className="mb-6">
          {content}
        </div>

        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="bg-[#2563EB] text-black px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
