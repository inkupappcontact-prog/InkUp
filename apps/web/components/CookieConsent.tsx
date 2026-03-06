'use client';

import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield } from 'lucide-react';
import ComicButton from './ui/ComicButton';

interface CookieConsentProps {
  onAccept: () => void;
  onRefuse: () => void;
  onCustomize: (preferences: CookiePreferences) => void;
}

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onRefuse, onCustomize }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    const fullPreferences = { ...preferences, analytics: true, marketing: true };
    localStorage.setItem('cookie-consent', JSON.stringify(fullPreferences));
    localStorage.setItem('cookie-preferences', JSON.stringify(fullPreferences));
    onAccept();
    setIsVisible(false);
  };

  const handleRefuse = () => {
    const minimalPreferences = { essential: true, analytics: false, marketing: false };
    localStorage.setItem('cookie-consent', JSON.stringify(minimalPreferences));
    localStorage.setItem('cookie-preferences', JSON.stringify(minimalPreferences));
    onRefuse();
    setIsVisible(false);
  };

  const handleCustomize = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    onCustomize(preferences);
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black shadow-2xl z-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Icon and Title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-[#2563EB] p-3 rounded-lg border-2 border-black">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bangers text-xl text-black">Cookies & RGPD</h3>
              <p className="text-sm text-gray-600">Conformité RGPD</p>
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 text-sm text-gray-700">
            <p className="mb-2">
              <strong>InkUp respecte votre vie privée !</strong> Nous utilisons des cookies pour améliorer
              votre expérience, analyser le trafic et vous proposer des contenus adaptés.
            </p>
            <p>
              Conformément au RGPD, vous avez le contrôle sur vos données.
              <button
                onClick={() => setShowCustomize(!showCustomize)}
                className="text-[#2563EB] font-bold underline ml-1"
              >
                Personnaliser vos préférences
              </button>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <ComicButton
              onClick={handleRefuse}
              className="px-4 py-2 text-sm border-2 border-black bg-gray-100 text-black hover:bg-gray-200"
            >
              Refuser
            </ComicButton>
            <ComicButton
              onClick={handleAccept}
              className="px-4 py-2 text-sm"
            >
              Tout accepter
            </ComicButton>
          </div>
        </div>

        {/* Customization Panel */}
        {showCustomize && (
          <div className="mt-6 p-4 bg-gray-50 border-2 border-black rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#2563EB]" />
              <h4 className="font-bold text-lg">Personnaliser les cookies</h4>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Essential Cookies */}
              <div className="bg-white p-4 border-2 border-black rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold">Cookies essentiels</h5>
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    className="w-4 h-4"
                  />
                </div>
                <p className="text-xs text-gray-600">
                  Nécessaires au fonctionnement du site (authentification, panier, sécurité).
                  Non désactivables conformément au RGPD.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-white p-4 border-2 border-black rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold">Cookies analytiques</h5>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    className="w-4 h-4"
                  />
                </div>
                <p className="text-xs text-gray-600">
                  Pour mesurer l'audience et améliorer nos services (Google Analytics anonymisé).
                  Consentement requis selon le RGPD.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-white p-4 border-2 border-black rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold">Cookies marketing</h5>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    className="w-4 h-4"
                  />
                </div>
                <p className="text-xs text-gray-600">
                  Pour vous proposer des contenus personnalisés et des publicités pertinentes.
                  Consentement requis selon le RGPD.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <ComicButton
                onClick={handleCustomize}
                className="px-4 py-2 text-sm"
              >
                Appliquer mes choix
              </ComicButton>
            </div>
          </div>
        )}

        {/* RGPD Compliance Notice */}
        <div className="mt-4 text-xs text-gray-500 border-t pt-4">
          <p>
            <strong>Conformité RGPD :</strong> Vous disposez d'un droit d'accès, de rectification,
            de suppression et de portabilité sur vos données.
            Pour exercer ces droits : <a href="mailto:privacy@inkup.com" className="text-[#2563EB] underline">privacy@inkup.com</a>
          </p>
          <p className="mt-1">
            <strong>Durée de conservation :</strong> 13 mois maximum pour les cookies analytiques.
            <strong>Sous-traitants :</strong> Google Analytics (anonymisé), Stripe (paiements).
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
