import React, { useState } from 'react';
import { X, FileText, ShieldCheck, Users, CreditCard, Mail, Phone, MapPin } from 'lucide-react';
import ComicButton from './ui/ComicButton';
import { LEGAL_INFO } from '../../../constants/legal';

interface LegalModalProps {
  type: 'cgu' | 'cgv' | 'privacy' | 'mentions';
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const getTitle = () => {
    switch (type) {
      case 'cgu':
        return 'Conditions Générales d\'Utilisation';
      case 'cgv':
        return 'Conditions Générales de Vente';
      case 'privacy':
        return 'Politique de Confidentialité';
      case 'mentions':
        return 'Mentions Légales';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'cgu':
      case 'cgv':
        return <FileText className="w-6 h-6" />;
      case 'privacy':
        return <ShieldCheck className="w-6 h-6" />;
      case 'mentions':
        return <Users className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getContent = () => {
    switch (type) {
      case 'cgu':
        return (
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-bold text-lg mb-3">1. Objet</h3>
              <p>
                Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la plateforme InkUp, 
                mettant en relation les auteurs de bandes dessinées et les lecteurs.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">2. Acceptation</h3>
              <p>
                L'accès et l'utilisation de la plateforme InkUp impliquent l'acceptation pleine et entière des présentes CGU.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">3. Inscription</h3>
              <p>
                L'inscription est gratuite et ouverte à toute personne majeure. L'utilisateur s'engage à fournir 
                des informations exactes et à maintenir ses données à jour.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">4. Contenu</h3>
              <p>
                Les auteurs conservent tous les droits sur leurs œuvres. InkUp agit comme simple intermédiaire 
                et ne revendique aucun droit sur les contenus publiés.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">5. InkPoints</h3>
              <p>
                Les InkPoints sont la monnaie virtuelle de la plateforme. Ils ne peuvent être échangés contre 
                de l'argent réel et n'ont aucune valeur monétaire hors de la plateforme.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">6. Responsabilité</h3>
              <p>
                InkUp s'efforce de maintenir la plateforme accessible mais ne garantit pas une disponibilité continue. 
                La responsabilité d'InkUp est limitée aux dommages directs et prouvés.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">7. Propriété intellectuelle</h3>
              <p>
                Tous les éléments de la plateforme (design, logo, fonctionnalités) sont protégés par le droit 
                de la propriété intellectuelle et appartiennent à InkUp.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">8. Modification</h3>
              <p>
                InkUp se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront 
                notifiées aux utilisateurs par email.
              </p>
            </section>
          </div>
        );

      case 'cgv':
        return (
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-bold text-lg mb-3">1. Prix</h3>
              <p>
                Les prix des œuvres sont fixés par les auteurs et affichés en euros. Les prix sont indiqués 
                TTC et incluent tous les frais applicables.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">2. Paiement</h3>
              <p>
                Le paiement s'effectue par carte bancaire sécurisée ou via les InkPoints. La transaction est 
                considérée comme definitive dès validation du paiement.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">3. Délai de rétractation</h3>
              <p>
                Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique 
                pas aux contenus numériques téléchargés immédiatement après l'achat.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">4. Livraison</h3>
              <p>
                Pour les œuvres physiques, la livraison s'effectue sous 3-5 jours ouvrés. Les frais de port 
                sont offerts dès 25€ d'achat.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">5. Garantie</h3>
              <p>
                Les œuvres physiques sont garanties contre tout défaut de fabrication. En cas de problème, 
                contactez le service client sous 30 jours.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">6. Révocation</h3>
              <p>
                En cas de non-respect des présentes CGV, InkUp se réserve le droit de suspendre ou de résilier 
                le compte de l'utilisateur.
              </p>
            </section>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-bold text-lg mb-3">1. Collecte des données</h3>
              <p>
                Conformément au RGPD (Règlement Général sur la Protection des Données), InkUp collecte uniquement les 
                données strictement nécessaires à la fourniture de ses services :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Données d'identification :</strong> email, nom, pseudonyme</li>
                <li><strong>Données de connexion :</strong> historique des connexions, préférences</li>
                <li><strong>Données de transaction :</strong> achats, paiements, adresses de livraison</li>
                <li><strong>Données techniques :</strong> adresse IP, type de navigateur, données d'utilisation</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">2. Base légale du traitement</h3>
              <p>
                Le traitement de vos données personnelles repose sur les bases légales suivantes :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Consentement :</strong> pour la création de votre compte et les communications marketing</li>
                <li><strong>Exécution contractuelle :</strong> pour la fourniture des services InkUp</li>
                <li><strong>Obligation légale :</strong> pour la facturation et la comptabilité</li>
                <li><strong>Intérêt légitime :</strong> pour l'amélioration de nos services et la sécurité</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">3. Vos droits RGPD</h3>
              <p>
                En tant que personne concernée, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Droit d'accès :</strong> connaître les données que nous détenons sur vous</li>
                <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format lisible</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              </ul>
              <p className="mt-2">
                Pour exercer ces droits, contactez-nous à : <strong>privacy@inkup.com</strong>
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">4. Durée de conservation</h3>
              <p>
                Vos données sont conservées selon les durées suivantes :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Compte actif :</strong> pendant toute la durée de notre relation contractuelle</li>
                <li><strong>Données comptables :</strong> 10 ans (obligation légale)</li>
                <li><strong>Demandes de suppression :</strong> 30 jours après suppression du compte</li>
                <li><strong>Cookies :</strong> 13 mois maximum pour les cookies analytiques</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">5. Sous-traitants</h3>
              <p>
                Nous utilisons les sous-traitants suivants, tous conformes au RGPD :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Supabase Inc.</strong> - Hébergement de base de données (États-Unis - Privacy Shield)</li>
                <li><strong>Stripe Inc.</strong> - Traitement des paiements (États-Unis - Privacy Shield)</li>
                <li><strong>Google Analytics</strong> - Analyse d'audience (anonymisée)</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">6. Cookies et traceurs</h3>
              <p>
                Notre site utilise les cookies suivants :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site (pas de consentement requis)</li>
                <li><strong>Cookies de mesure d'audience :</strong> Google Analytics anonymisé (consentement requis)</li>
                <li><strong>Cookies de paiement :</strong> Stripe (consentement requis lors du paiement)</li>
              </ul>
              <p className="mt-2">
                Vous pouvez gérer vos préférences cookies via notre bandeau cookies.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">7. Sécurité</h3>
              <p>
                InkUp met en œuvre des mesures de sécurité appropriées :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Chiffrement SSL/TLS pour toutes les communications</li>
                <li>Chiffrement des données sensibles dans notre base de données</li>
                <li>Contrôle d'accès strict et authentification renforcée</li>
                <li>Surveillance continue et audits de sécurité réguliers</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">8. Transferts internationaux</h3>
              <p>
                Certains de nos sous-traitants sont situés hors de l'Union Européenne. 
                Tous les transferts sont protégés par :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Clauses contractuelles types de la Commission Européenne</li>
                <li>Certification Privacy Shield pour les entreprises américaines</li>
                <li>Évaluation d'impact sur la protection des données (DPIA)</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">9. Contact et plaintes</h3>
              <p>
                Pour toute question concernant vos données personnelles :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Email :</strong> privacy@inkup.com</li>
                <li><strong>Adresse :</strong> 1 RUE du Bois Joly, 49120 Chemillé-en-Anjou</li>
                <li><strong>Téléphone :</strong> +33 1 XX XX XX XX</li>
              </ul>
              <p className="mt-2">
                Vous avez également le droit d'introduire une plainte auprès de la CNIL :
                <br />
                <strong>CNIL - 3 Place de Fontenoy - 75007 Paris</strong>
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">10. Mise à jour de cette politique</h3>
              <p>
                Cette politique peut être modifiée pour tenir compte des évolutions légales et techniques. 
                Toute modification sera notifiée aux utilisateurs par email et publiée sur cette page.
              </p>
              <p className="mt-2">
                <strong>Date de dernière mise à jour : 12 février 2026</strong>
              </p>
            </section>
          </div>
        );

      case 'mentions':
        return (
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-bold text-lg mb-3">Éditeur</h3>
              <div className="space-y-2">
                <p><strong>Nom :</strong> {LEGAL_INFO.entrepreneur}</p>
                <p><strong>Statut :</strong> Entrepreneur individuel</p>
                <p><strong>Adresse :</strong> {LEGAL_INFO.address}</p>
                <p><strong>SIREN :</strong> {LEGAL_INFO.siren}</p>
                <p><strong>SIRET :</strong> {LEGAL_INFO.siret}</p>
                <p><strong>TVA :</strong> {LEGAL_INFO.vat_mention}</p>
                <p><strong>Code APE :</strong> {LEGAL_INFO.code_ape}</p>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">Hébergement</h3>
              <div className="space-y-2">
                <p><strong>Fournisseur :</strong> Supabase Inc.</p>
                <p><strong>Adresse :</strong> 620 Dory Street, San Francisco, CA 94107, USA</p>
                <p><strong>Téléphone :</strong> +1 (415) 555-0123</p>
                <p><strong>Email :</strong> support@supabase.io</p>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">Directeur de la publication</h3>
              <div className="space-y-2">
                <p><strong>Nom :</strong> {LEGAL_INFO.entrepreneur}</p>
                <p><strong>Email :</strong> contact@inkup.com</p>
                <p><strong>Téléphone :</strong> +33 1 XX XX XX XX</p>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">Propriété intellectuelle</h3>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">Cookies et RGPD</h3>
              <p>
                Ce site utilise des cookies conformément au RGPD. 
                Consultez notre politique de confidentialité pour plus d'informations.
              </p>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg border-2 border-black"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          {getIcon()}
          <h2 className="font-bangers text-3xl text-black">{getTitle()}</h2>
        </div>

        <div className="mb-6">
          {getContent()}
        </div>

        <div className="flex justify-end gap-4">
          <ComicButton 
            onClick={onClose}
            className="px-6 py-2"
          >
            Fermer
          </ComicButton>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;

            <section>
              <h3 className="font-bold text-lg mb-3">Contact</h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <strong>Email :</strong> contact@inkup.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <strong>Téléphone :</strong> +33 6 12 34 56 78
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <strong>Siège social :</strong> {LEGAL_INFO.address}
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">Hébergement</h3>
              <p>
                <strong>Fournisseur :</strong> Supabase Inc.<br/>
                <strong>Adresse :</strong> 7700 Woodland Avenue, Suite 200, San Mateo, CA 94403, USA
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">Propriété intellectuelle</h3>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">Limitation de responsabilité</h3>
              <p>
                InkUp ne pourra être tenue responsable des dommages directs et indirects pouvant découler de 
                l'utilisation de ce site.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">Litiges</h3>
              <p>
                Tout litige relatif à l'utilisation du site InkUp est soumis au droit français. En l'absence 
                d'accord amiable, le litige sera porté devant les tribunaux compétents.
              </p>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-4 border-black max-w-4xl w-full max-h-[90vh] overflow-hidden transform rotate-1">
        {/* Header */}
        <div className="bg-[#2563EB] border-b-4 border-black p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-white bg-opacity-20 p-3 border-2 border-white">
                {getIcon()}
              </div>
              <h2 className="font-['Bangers'] text-2xl">{getTitle()}</h2>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 p-2 border-2 border-white hover:bg-opacity-30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {getContent()}
        </div>

        {/* Footer */}
        <div className="border-t-4 border-black p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className="w-5 h-5 border-2 border-black"
              />
              <span className="font-bold">J'ai lu et j'accepte</span>
            </label>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="border-2 border-black px-6 py-3 font-bold hover:bg-gray-100 transition-colors"
              >
                Fermer
              </button>
              <ComicButton
                onClick={onClose}
                disabled={!isAccepted}
                className="flex items-center gap-2"
              >
                Valider
              </ComicButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
