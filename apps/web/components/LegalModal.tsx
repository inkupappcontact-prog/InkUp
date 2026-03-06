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
                Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme
                InkUp, spécialisée dans la distribution de bandes dessinées numériques et physiques.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">2. Acceptation</h3>
              <p>
                L'utilisation de la plateforme InkUp implique l'acceptation pleine et entière des présentes CGU.
                En cas de non-acceptation, l'utilisateur doit cesser d'utiliser le service.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">3. Inscription</h3>
              <p>
                L'inscription est gratuite et réservée aux personnes majeures disposant de la capacité juridique
                pour contracter. Chaque utilisateur s'engage à fournir des informations exactes et à maintenir
                ses identifiants confidentiels.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">4. Contenu</h3>
              <p>
                Les utilisateurs s'engagent à respecter les droits d'auteur et la propriété intellectuelle.
                Tout contenu contrefaisant ou illégal sera immédiatement supprimé et pourra entraîner
                la résiliation du compte.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">5. Responsabilité</h3>
              <p>
                InkUp s'efforce d'assurer la disponibilité du service mais ne peut garantir une
                continuité absolue. La responsabilité d'InkUp est limitée aux dommages directs
                prévus par la loi.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">6. Propriété intellectuelle</h3>
              <p>
                Tous les éléments de la plateforme (logos, textes, graphismes, structure) sont
                protégés par le droit d'auteur et ne peuvent être reproduits sans autorisation.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">7. Modification</h3>
              <p>
                InkUp se réserve le droit de modifier les présentes CGU à tout moment.
                Les modifications seront notifiées aux utilisateurs par email.
              </p>
            </section>
          </div>
        );

      case 'cgv':
        return (
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-bold text-lg mb-3">1. Objet</h3>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les ventes de bandes dessinées
                numériques et physiques proposées par InkUp.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">2. Produits</h3>
              <p>
                Les bandes dessinées numériques sont disponibles en téléchargement immédiat.
                Les exemplaires physiques sont expédiés sous 48h en France métropolitaine.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">3. Prix</h3>
              <p>
                Les prix sont indiqués en euros TTC et incluent tous les frais applicables.
                InkUp se réserve le droit de modifier ses prix à tout moment.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">4. Paiement</h3>
              <p>
                Le paiement est sécurisé via Stripe. Les cartes bancaires acceptées sont :
                Visa, Mastercard, American Express. Le paiement est débité lors de la validation de la commande.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">5. Livraison</h3>
              <p>
                Les livraisons sont effectuées par La Poste. Les délais de livraison sont de 2-5 jours ouvrés.
                En cas de perte, un nouvel exemplaire sera expédié sans frais supplémentaires.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-3">6. Rétractation</h3>
              <p>
                Conformément au Code de la consommation, l'utilisateur dispose d'un délai de 14 jours
                pour exercer son droit de rétractation. Pour les contenus numériques, ce droit s'applique
                uniquement si le téléchargement n'a pas été effectué.
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
              <h3 className="font-bold text-lg mb-3">8. Contact et plaintes</h3>
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
              <h3 className="font-bold text-lg mb-3">9. Mise à jour de cette politique</h3>
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
