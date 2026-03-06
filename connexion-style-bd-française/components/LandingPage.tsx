import React, { useState } from 'react';
import { BookOpen, Coins, Users, Zap, Star, ArrowRight, PenTool, ChevronRight, ShieldCheck, Lock } from 'lucide-react';
import ComicButton from './ComicButton';
import InkUpLogo from './InkUpLogo';
import LegalModal from './LegalModal';
import Footer from './Footer';
import { LEGAL_INFO } from '../constants/legal';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [showLegal, setShowLegal] = useState<'cgu' | 'cgv' | 'privacy' | 'mentions' | null>(null);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {showLegal && <LegalModal type={showLegal} onClose={() => setShowLegal(null)} />}

      {/* Navigation */}
      <nav className="border-b-4 border-black px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2">
            <InkUpLogo className="w-12 h-12" />
            <span className="font-['Bangers'] text-3xl tracking-wide hidden sm:block">InkUp</span>
        </div>
        <div className="flex gap-4">
             <button onClick={onStart} className="font-['Bangers'] text-xl uppercase hover:text-[#2563EB] transition-colors min-h-[44px]">
                Se Connecter
             </button>
             <ComicButton onClick={onStart} className="hidden sm:flex h-10 px-6 text-lg">
                Commencer
             </ComicButton>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative border-b-4 border-black overflow-hidden bg-[#F0F0F0]">
         <div className="absolute inset-0 halftone opacity-10 pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
                <div className="inline-block bg-[#2563EB] text-white px-4 py-1 border-2 border-black transform -skew-x-12 shadow-[4px_4px_0px_0px_#000] mb-6">
                    <span className="transform skew-x-12 font-['Bangers'] text-xl tracking-wider">BÊTA OUVERTE</span>
                </div>
                <h1 className="font-['Bangers'] text-6xl lg:text-8xl leading-[0.9] mb-6 drop-shadow-[3px_3px_0px_#FFFFFF]">
                    LA NOUVELLE ÈRE DE LA <span className="text-[#2563EB]">BD DIGITALE</span>
                </h1>
                <p className="text-xl font-bold border-l-4 border-black pl-4 mb-8 max-w-lg">
                    Une plateforme équitable pour les auteurs, une expérience immersive pour les lecteurs. Fini les abonnements, payez ce que vous lisez.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <ComicButton onClick={onStart} className="text-2xl px-8 py-4">
                        Créer mon compte
                    </ComicButton>
                    <button onClick={onStart} className="px-8 py-4 border-2 border-black bg-white font-['Bangers'] text-xl uppercase tracking-wide hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_#000] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] min-h-[44px]">
                        Découvrir les titres
                    </button>
                </div>
            </div>
            <div className="relative hidden lg:block">
                {/* Abstract Comic Panel Composition */}
                <div className="relative w-full aspect-square">
                    <div className="absolute top-0 right-0 w-3/4 h-3/4 border-4 border-black bg-white shadow-[12px_12px_0px_0px_#2563EB] rotate-3 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Comic Art 1" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000] -rotate-6 z-10 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Comic Art 2" />
                    </div>
                    {/* Badge */}
                    <div className="absolute top-1/2 left-1/4 bg-[#EA4335] text-white p-6 border-4 border-black rounded-full w-32 h-32 flex items-center justify-center text-center transform -rotate-12 shadow-[8px_8px_0px_0px_#000] z-20">
                        <span className="font-['Bangers'] text-2xl leading-none">100% INDÉ</span>
                    </div>
                </div>
            </div>
         </div>
      </header>

      {/* Features Grid */}
      <section className="py-20 border-b-4 border-black bg-white">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="font-['Bangers'] text-5xl lg:text-6xl mb-4">COMMENT ÇA MARCHE ?</h2>
                  <div className="w-24 h-2 bg-black mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                      { icon: Coins, title: "Système InkPoints", desc: "Rechargez votre porte-monnaie. Débloquez les chapitres à l'unité. Vos points soutiennent directement l'artiste.", color: "bg-[#2563EB]" },
                      { icon: BookOpen, title: "Lecture Immersive", desc: "Un lecteur optimisé pour le web et le mobile. Zoom, mode nuit et transition page-turn ultra fluide.", color: "bg-[#34A853]" },
                      { icon: Star, title: "Soutien Direct", desc: "Les auteurs touchent jusqu'à 95% de commission. C'est le taux le plus élevé du marché.", color: "bg-[#EA4335]" }
                  ].map((feature, i) => (
                      <div key={i} className="border-4 border-black p-8 relative shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 transition-transform bg-white">
                          <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 ${feature.color} border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000]`}>
                              <feature.icon className="w-8 h-8 text-white" aria-hidden="true" />
                          </div>
                          <h3 className="mt-8 font-['Bangers'] text-3xl text-center mb-4 uppercase">{feature.title}</h3>
                          <p className="text-center font-bold text-gray-700 leading-relaxed">{feature.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Creator Section */}
      <section className="bg-black text-white py-20 border-b-4 border-black overflow-hidden relative">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-1/2">
                      <div className="flex items-center gap-4 mb-6 text-[#2563EB]">
                          <PenTool className="w-8 h-8" />
                          <span className="font-['Bangers'] text-2xl uppercase tracking-widest">Espace Créateur</span>
                      </div>
                      <h2 className="font-['Bangers'] text-5xl lg:text-7xl mb-6 leading-tight">
                          MONÉTISEZ VOTRE TALENT SANS COMPROMIS
                      </h2>
                      <ul className="space-y-6 mb-10">
                          {[
                              "Commissions fixes : 5% (Premium) ou 15% (Gratuit)",
                              "Paiements instantanés via Stripe",
                              "Statistiques détaillées en temps réel",
                              "Protection DRM de vos œuvres"
                          ].map((item, i) => (
                              <li key={i} className="flex items-center gap-4 font-bold text-lg">
                                  <div className="bg-[#34A853] p-1 border border-white">
                                      <ArrowRight className="w-4 h-4 text-white" />
                                  </div>
                                  {item}
                              </li>
                          ))}
                      </ul>
                      <button onClick={onStart} className="bg-white text-black border-4 border-black px-8 py-4 font-['Bangers'] text-2xl uppercase tracking-wide hover:bg-[#2563EB] hover:text-white transition-all shadow-[6px_6px_0px_0px_#2563EB]">
                          Devenir Auteur
                      </button>
                  </div>

                  {/* Pricing Card Illustration */}
                  <div className="lg:w-1/2 w-full">
                      <div className="bg-white text-black border-4 border-black p-8 shadow-[12px_12px_0px_0px_#FFFFFF] transform rotate-2 max-w-md mx-auto">
                          <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-6">
                              <div>
                                  <h3 className="font-['Bangers'] text-4xl">PREMIUM</h3>
                                  <p className="font-bold text-gray-500 uppercase">Le choix des pros</p>
                              </div>
                              <div className="text-right">
                                  <span className="font-['Bangers'] text-4xl">9.99€</span>
                                  <span className="block text-xs font-bold uppercase">/ mois</span>
                              </div>
                          </div>
                          <div className="space-y-4">
                              <div className="flex justify-between items-center font-bold uppercase">
                                  <span>Commission</span>
                                  <span className="bg-[#34A853] text-white px-2 py-0.5 border border-black">5% SEULEMENT</span>
                              </div>
                              <div className="flex justify-between items-center font-bold uppercase">
                                  <span>Stockage</span>
                                  <span>ILLIMITÉ</span>
                              </div>
                              <div className="flex justify-between items-center font-bold uppercase">
                                  <span>Qualité</span>
                                  <span>LOSSLESS (PNG)</span>
                              </div>
                              <div className="mt-4 pt-2 border-t-2 border-dashed border-gray-300 text-center">
                                  <p className="text-[10px] text-gray-500 font-bold uppercase">{LEGAL_INFO.vat_mention}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Footer Légal & Sécurité */}
      <Footer onLegalClick={setShowLegal} />
    </div>
  );
};

export default LandingPage;