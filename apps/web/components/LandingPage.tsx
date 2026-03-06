import React, { useState } from 'react';
import { BookOpen, Coins, Users, Star, ArrowRight, PenTool, ChevronRight, ShieldCheck, Lock } from 'lucide-react';
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
      <nav className="border-b-4 border-[#FFD700] px-6 py-4 flex justify-between items-center sticky top-0 bg-black z-50 shadow-lg">
        <div className="flex items-center gap-3">
            <InkUpLogo className="w-12 h-12" />
            <span className="font-bangers text-3xl tracking-wide hidden sm:block text-[#FFD700]">InkUp</span>
        </div>
        <div className="flex gap-4">
             <button
               onClick={onStart}
               className="font-bangers text-xl uppercase hover:text-[#FF6B35] transition-colors min-h-[44px] px-4 py-2 border-2 border-transparent hover:border-[#FFD700] rounded-lg text-white"
             >
                Se Connecter
             </button>
             <ComicButton onClick={onStart} className="hidden sm:flex h-12 px-6 text-lg">
                Commencer
             </ComicButton>
        </div>
      </nav>

      {/* Hero Section BD */}
      <section className="relative py-20 px-6 border-b-4 border-[#FFD700] bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-[#FFD700] text-black px-6 py-3 font-bold border-4 border-[#FFD700] transform -rotate-2 shadow-lg">
                🎨 La Révolution de la BD
              </div>
              <h1 className="font-bangers text-5xl md:text-7xl leading-tight text-[#FFD700]">
                Reconnectez
                <span className="text-[#FF6B35] block transform rotate-2">Auteurs & Lecteurs</span>
              </h1>
              <p className="text-xl text-white font-comic-neue max-w-2xl leading-relaxed">
                Découvrez des bandes dessinées exclusives en haute définition et soutenez directement les créateurs.
                Pas d'intermédiaires, juste de l'art pur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ComicButton onClick={onStart} className="h-14 px-8 text-xl font-bold">
                  <span>Commencer Gratuitement</span>
                </ComicButton>
                <button className="border-4 border-[#FFD700] px-8 py-3 font-bold hover:bg-[#FFD700] hover:text-black transition-colors h-14 text-xl text-white">
                  En Savoir Plus
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FF6B35] rounded-2xl transform rotate-3"></div>
              <div className="relative bg-black border-4 border-[#FFD700] rounded-2xl p-8 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-[#FFD700] to-[#FF6B35] rounded-lg flex items-center justify-center">
                  <div className="text-black text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-2xl font-bold">Découvrez</p>
                    <p className="text-lg">des œuvres uniques</p>
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
            <h2 className="section-title font-bangers text-4xl mb-4">Pourquoi InkUp ?</h2>
            <p className="section-subtitle text-xl text-white font-comic-neue">
              Une plateforme pensée pour les passionnés de BD
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-[#FFD700] shadow-lg">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bangers text-2xl mb-4 text-[#FFD700]">Communauté Active</h3>
              <p className="text-white font-comic-neue leading-relaxed">
                Rejoignez des milliers de passionnés et échangez directement avec vos auteurs préférés.
              </p>
            </div>

            <div className="card transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-[#FFD700] shadow-lg">
                <Coins className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bangers text-2xl mb-4 text-[#FFD700]">InkPoints</h3>
              <p className="text-white font-comic-neue leading-relaxed">
                Achetez une fois, lisez partout. Nos InkPoints vous donnent un accès illimité à votre bibliothèque.
              </p>
            </div>

            <div className="card transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-[#FFD700] shadow-lg">
                <PenTool className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bangers text-2xl mb-4 text-[#FFD700]">Soutien Direct</h3>
              <p className="text-white font-comic-neue leading-relaxed">
                70% des revenus vont directement aux créateurs. Pas de commissions abusives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section BD */}
      <section className="py-20 px-6 border-b-4 border-[#FFD700] bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#FFD700] border-4 border-[#FFD700] p-12 transform rotate-1">
            <div className="bg-black border-4 border-[#FFD700] p-8 transform -rotate-1">
              <h2 className="font-bangers text-4xl mb-6 text-[#FFD700]">
                Prêt à rejoindre l'aventure ?
              </h2>
              <p className="text-xl text-white mb-8 font-comic-neue">
                Des milliers de BD vous attendent. Rejoignez la communauté la plus passionnée de lecteurs et créateurs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ComicButton onClick={onStart} className="h-14 px-8 text-xl font-bold">
                  <span>Commencer Gratuitement</span>
                </ComicButton>
                <button className="border-4 border-[#FFD700] px-8 py-3 font-bold hover:bg-[#FFD700] hover:text-black transition-colors h-14 text-xl text-white">
                  Explorer le Catalogue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Consent Banner - RGPD Compliance */}
      <CookieConsent
        onAccept={() => console.log('All cookies accepted')}
        onRefuse={() => console.log('Non-essential cookies refused')}
        onCustomize={(preferences) => console.log('Custom preferences:', preferences)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
