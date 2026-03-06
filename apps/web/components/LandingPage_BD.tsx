import React, { useState } from 'react';
import { BookOpen, Coins, Users, Zap, Star, ArrowRight, PenTool, ChevronRight, ShieldCheck, Lock } from 'lucide-react';
import ComicButton from './ComicButton_BD';
import InkUpLogo from './InkUpLogo_BD';
import LegalModal from './LegalModal_BD';
import Footer from './Footer_BD';
import { LEGAL_INFO } from './constants/legal_BD';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [showLegal, setShowLegal] = useState<'cgu' | 'cgv' | 'privacy' | 'mentions' | null>(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {showLegal && <LegalModal type={showLegal} onClose={() => setShowLegal(null)} />}

      {/* Navigation */}
      <nav className="border-b-4 border-[#2563EB] px-6 py-4 flex justify-between items-center sticky top-0 bg-black z-50">
        <div className="flex items-center gap-2">
            <InkUpLogo className="w-12 h-12" />
            <span className="font-['Bangers'] text-3xl tracking-wide hidden sm:block text-[#2563EB]">InkUp</span>
        </div>
        <div className="flex gap-4">
             <button onClick={onStart} className="font-['Bangers'] text-xl uppercase hover:text-[#FF6B35] transition-colors min-h-[44px]">
                Se Connecter
             </button>
             <ComicButton onClick={onStart} className="hidden sm:flex h-10 px-6 text-lg">
                Commencer
             </ComicButton>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative border-b-4 border-[#2563EB] overflow-hidden bg-black">
         <div className="absolute inset-0 halftone opacity-10 pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
                <div className="inline-block bg-[#2563EB] text-black px-4 py-1 border-2 border-[#2563EB] transform -skew-x-12 shadow-[4px_4px_0px_0px_#000] mb-6">
                    <span className="transform skew-x-12 font-['Bangers'] text-xl tracking-wider">BÊTA OUVERTE</span>
                </div>
                <h1 className="font-['Bangers'] text-6xl lg:text-8xl leading-[0.9] mb-6 drop-shadow-[3px_3px_0px_#2563EB]">
                    LA NOUVELLE ÈRE DE LA <span className="text-[#2563EB]">BD DIGITALE</span>
                </h1>
                <p className="text-xl font-bold border-l-4 border-[#2563EB] pl-4 mb-8 max-w-lg text-white">
                    Une plateforme équitable pour les auteurs, une expérience immersive pour les lecteurs. Fini les abonnements, payez ce que vous lisez.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <ComicButton onClick={onStart} className="h-14 px-8 text-xl">
                        <span>Commencer Gratuitement</span>
                    </ComicButton>
                    <button className="border-4 border-[#2563EB] px-8 py-3 font-bold hover:bg-[#2563EB] hover:text-black transition-colors h-14 text-xl text-white">
                        Explorer le Catalogue
                    </button>
                </div>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#FF6B35] rounded-2xl transform rotate-3"></div>
                <div className="relative bg-black border-4 border-[#2563EB] rounded-2xl p-8 shadow-2xl">
                    <div className="aspect-video bg-gradient-to-br from-[#2563EB] to-[#FF6B35] rounded-lg flex items-center justify-center">
                        <div className="text-black text-center">
                            <BookOpen className="w-16 h-16 mx-auto mb-4" />
                            <p className="text-2xl font-bold">Découvrez</p>
                            <p className="text-lg">des œuvres uniques</p>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 border-b-4 border-[#2563EB] bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Bangers'] text-5xl mb-4 text-[#2563EB]">Pourquoi InkUp ?</h2>
            <p className="text-xl text-white font-['Comic Neue']">
              Une plateforme pensée pour les passionnés de BD
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 border-4 border-[#2563EB] rounded-2xl p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#2563EB] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-[#2563EB] shadow-lg">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-['Bangers'] text-2xl mb-4 text-[#2563EB]">Communauté Active</h3>
              <p className="text-white font-['Comic Neue'] leading-relaxed">
                Rejoignez des milliers de passionnés et échangez directement avec vos auteurs préférés.
              </p>
            </div>

            <div className="bg-gray-900 border-4 border-[#2563EB] rounded-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#2563EB] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-[#2563EB] shadow-lg">
                <Coins className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-['Bangers'] text-2xl mb-4 text-[#2563EB]">InkPoints</h3>
              <p className="text-white font-['Comic Neue'] leading-relaxed">
                Achetez une fois, lisez partout. Nos InkPoints vous donnent un accès illimité à votre bibliothèque.
              </p>
            </div>

            <div className="bg-gray-900 border-4 border-[#2563EB] rounded-2xl p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#2563EB] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-[#2563EB] shadow-lg">
                <PenTool className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-['Bangers'] text-2xl mb-4 text-[#2563EB]">Soutien Direct</h3>
              <p className="text-white font-['Comic Neue'] leading-relaxed">
                70% des revenus vont directement aux créateurs. Pas de commissions abusives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-b-4 border-[#2563EB] bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#2563EB] border-4 border-[#2563EB] p-12 transform rotate-1">
            <div className="bg-black border-4 border-[#2563EB] p-8 transform -rotate-1">
              <h2 className="font-['Bangers'] text-4xl mb-6 text-[#2563EB]">
                Prêt à rejoindre l'aventure ?
              </h2>
              <p className="text-xl text-white mb-8 font-['Comic Neue']">
                Des milliers de BD vous attendent. Rejoignez la communauté la plus passionnée de lecteurs et créateurs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ComicButton onClick={onStart} className="h-14 px-8 text-xl">
                  <span>Commencer Gratuitement</span>
                </ComicButton>
                <button className="border-4 border-[#2563EB] px-8 py-3 font-bold hover:bg-[#2563EB] hover:text-black transition-colors h-14 text-xl text-white">
                  Explorer le Catalogue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
