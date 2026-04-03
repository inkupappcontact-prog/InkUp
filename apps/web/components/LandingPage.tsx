/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { BookOpen, Coins, Users, PenTool } from 'lucide-react';
import ComicButton from './ui/ComicButton';
import InkUpLogo from './ui/InkUpLogo';
import LegalModal from './LegalModal';
import CookieConsent from './CookieConsent';
import Footer from './Footer';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [showLegal, setShowLegal] = useState<'cgu' | 'cgv' | 'privacy' | 'mentions' | null>(null);

  return (
    <div className="min-h-screen bg-black font-comic-neue text-white overflow-x-hidden">
      {showLegal && <LegalModal type={showLegal} onClose={() => setShowLegal(null)} />}

      {/* Navigation BD */}
      <nav
        className="border-b-4 border-[#2563EB] px-6 py-4 flex justify-between items-center sticky top-0 bg-black z-50 shadow-lg"
        aria-label="Navigation principale"
      >
        <div className="flex items-center gap-3">
          <InkUpLogo className="w-12 h-12" aria-hidden="true" />
        </div>
        <div className="flex gap-4">
          <button
            onClick={onStart}
            className="font-bangers text-xl uppercase hover:text-[#2563EB] transition-colors min-h-[44px] px-4 py-2 border-2 border-transparent hover:border-[#2563EB] rounded-lg text-white"
            aria-label="Se connecter à mon compte"
          >
            Se Connecter
          </button>
          <ComicButton
            onClick={onStart}
            className="hidden sm:flex h-12 px-6 text-lg"
            aria-label="Commencer à utiliser InkUp"
          >
            Commencer
          </ComicButton>
        </div>
      </nav>

      {/* Hero Section BD */}
      <section className="relative py-20 px-6 border-b-4 border-[#2563EB] bg-gradient-to-br from-black via-black to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-[#2563EB] text-black px-6 py-3 font-bold border-4 border-[#2563EB] transform -rotate-2 shadow-lg">
                🎨 La Révolution de la BD
              </div>
              <h1 className="font-bangers text-5xl md:text-7xl leading-tight text-white">
                Reconnectez
                <span className="text-[#2563EB] block transform rotate-2">Auteurs & Lecteurs</span>
              </h1>
              <p className="text-xl text-white font-comic-neue max-w-2xl leading-relaxed">
                Découvrez des bandes dessinées exclusives en haute définition et soutenez directement les créateurs. Pas
                d&apos;intermédiaires, juste de l&apos;art pur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ComicButton onClick={onStart} className="h-14 px-8 text-xl font-bold">
                  <span>Commencer Gratuitement</span>
                </ComicButton>
                <button className="border-4 border-[#2563EB] px-8 py-3 font-bold bg-transparent text-[#2563EB] hover:bg-[#2563EB] hover:text-black transition-colors h-14 text-xl">
                  En Savoir Plus
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#2563EB] rounded-2xl transform rotate-3"></div>
              <div className="relative bg-black border-4 border-[#2563EB] rounded-2xl p-8 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-[#2563EB] to-[#2563EB] rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-[#2563EB]" />
                    <p className="text-2xl font-bold text-white">Découvrez</p>
                    <p className="text-lg text-white">des œuvres uniques</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features BD */}
      <section className="section">
        <div className="max-w-6xl mx-auto">
          <div className="section-header">
            <h2 className="section-title font-bangers text-4xl mb-4 text-white">Pourquoi InkUp ?</h2>
            <p className="section-subtitle text-xl text-white font-comic-neue">
              Une plateforme pensée pour les passionnés de BD
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-white-bg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#2563EB] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-[#2563EB] shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 
                className="font-bangers text-2xl mb-4 card-title-black"
                style={{ color: '#000000', backgroundColor: 'transparent', textDecoration: 'none', textShadow: 'none' }}
              >Communauté Active</h3>
              <p 
                className="font-comic-neue leading-relaxed card-text-black"
                style={{ color: '#000000', backgroundColor: 'transparent', textDecoration: 'none' }}
              >Rejoignez des milliers de passionnés et échangez directement avec vos auteurs préférés.</p>
            </div>

            <div className="card card-white-bg transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#2563EB] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-[#2563EB] shadow-lg">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 
                className="font-bangers text-2xl mb-4 card-title-black"
                style={{ color: '#000000', backgroundColor: 'transparent', textDecoration: 'none', textShadow: 'none' }}
              >InkPoints</h3>
              <p 
                className="font-comic-neue leading-relaxed card-text-black"
                style={{ color: '#000000', backgroundColor: 'transparent', textDecoration: 'none' }}
              >Achetez une fois, lisez partout. Nos InkPoints vous donnent un accès illimité à votre bibliothèque.</p>
            </div>

            <div className="card card-white-bg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#2563EB] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-[#2563EB] shadow-lg">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <h3 
                className="font-bangers text-2xl mb-4 card-title-black"
                style={{ color: '#000000', backgroundColor: 'transparent', textDecoration: 'none', textShadow: 'none' }}
              >Soutien Direct</h3>
              <p 
                className="font-comic-neue leading-relaxed card-text-black"
                style={{ color: '#000000', backgroundColor: 'transparent', textDecoration: 'none' }}
              >70% des revenus vont directement aux créateurs. Pas de commissions abusives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section BD */}
      <section className="py-20 px-6 border-b-4 border-[#2563EB] bg-gradient-to-br from-black via-black to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#2563EB] border-4 border-[#2563EB] p-12 transform rotate-1">
            <div className="bg-black border-4 border-[#2563EB] p-8 transform -rotate-1">
              <h2 className="font-bangers text-4xl mb-6 text-white">Prêt à rejoindre l'aventure ?</h2>
              <p className="text-xl text-white mb-8 font-comic-neue">
                Des milliers de BD vous attendent. Rejoignez la communauté la plus passionnée de lecteurs et créateurs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ComicButton onClick={onStart} className="h-14 px-8 text-xl font-bold">
                  <span>Commencer Gratuitement</span>
                </ComicButton>
                <button className="border-4 border-[#2563EB] px-8 py-3 font-bold bg-transparent text-[#2563EB] hover:bg-[#2563EB] hover:text-black transition-colors h-14 text-xl">
                  Explorer le Catalogue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Consent Banner - RGPD Compliance */}
      <CookieConsent onAccept={() => {}} onRefuse={() => {}} onCustomize={() => {}} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
