import React, { useState } from 'react';
import { Camera, Save, MapPin, Award, Star, Zap } from 'lucide-react';
import ParallelogramInput from './ParallelogramInput';
import ComicButton from './ComicButton';

interface UserProfileProps {
  user: { email: string; role: 'reader' | 'author'; balance: number };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [bio, setBio] = useState("Passionné de lignes claires et d'aventures graphiques.");
  const [location, setLocation] = useState("Bruxelles, Belgique");
  const [pseudo, setPseudo] = useState(user.email.split('@')[0]);

  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500 pb-12">

      {/* En-tête de la page */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-black text-white p-2 transform -skew-x-12">
            <UserIcon className="w-8 h-8 transform skew-x-12" />
        </div>
        <h2 className="text-6xl text-black uppercase tracking-wide drop-shadow-[2px_2px_0px_#2563EB]">Fiche Personnage</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* COLONNE GAUCHE : L'AVATAR & STATS (Style Carte à collectionner) */}
        <div className="lg:w-1/3 flex flex-col gap-8">
            <div className="border-4 border-black bg-white p-4 shadow-[12px_12px_0px_0px_#000000] relative group">
                {/* Étiquette Rôle */}
                <div className="absolute -top-4 -right-4 z-20">
                    <div className="bg-[#2563EB] border-2 border-black px-4 py-1 transform skew-x-12 shadow-[4px_4px_0px_0px_#000]">
                        <span className="block transform -skew-x-12 font-['Bangers'] text-white text-lg tracking-wider uppercase">
                            {user.role === 'author' ? 'Dessinateur' : 'Lecteur'}
                        </span>
                    </div>
                </div>

                {/* Photo */}
                <div className="relative aspect-square border-2 border-black overflow-hidden mb-4 bg-gray-100">
                    <img
                        src={`https://ui-avatars.com/api/?name=${user.email}&background=fff&color=000&size=400&font-size=0.33`}
                        alt="Avatar"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                    <button className="absolute bottom-2 right-2 bg-white border-2 border-black p-2 shadow-[3px_3px_0px_0px_#2563EB] hover:bg-black hover:text-white transition-colors">
                        <Camera className="w-5 h-5" />
                    </button>
                </div>

                {/* Pseudo */}
                <div className="text-center border-b-4 border-black pb-4 mb-4">
                    <h3 className="text-4xl text-black uppercase leading-none">{pseudo}</h3>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-black mt-2">Membre depuis 2024</p>
                </div>

                {/* XP / Niveau */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="font-['Bangers'] text-2xl text-black">Niveau 12</span>
                        <span className="font-bold text-sm uppercase text-[#2563EB]">850 / 1000 XP</span>
                    </div>
                    <div className="h-4 border-2 border-black bg-white p-0.5">
                        <div className="h-full bg-[#34A853] w-[85%] border-r-2 border-black relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20" style={{backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem'}}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="bg-[#F0F0F0] border-2 border-black p-6 relative">
                 <div className="absolute -top-3 left-4 bg-black text-white px-3 py-1 text-sm font-['Bangers'] uppercase tracking-widest border border-black">Trophées</div>
                 <div className="flex gap-4 justify-center flex-wrap pt-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-14 h-14 border-2 border-black bg-white rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_#000] hover:-translate-y-1 transition-transform cursor-help" title="Badge Débloqué">
                            <Award className={`w-7 h-7 ${i === 1 ? 'text-[#EA4335]' : i === 2 ? 'text-[#FBBC05]' : 'text-[#2563EB]'}`} />
                        </div>
                    ))}
                 </div>
            </div>
        </div>

        {/* COLONNE DROITE : FORMULAIRE D'ÉDITION */}
        <div className="lg:w-2/3">
            <div className="bg-white border-4 border-black p-8 lg:p-12 shadow-[12px_12px_0px_0px_#2563EB] relative">
                {/* Note "Confidentiel" */}
                <div className="absolute top-0 right-8 -translate-y-1/2 rotate-3 bg-[#EA4335] text-white border-2 border-black px-6 py-2 shadow-[4px_4px_0px_0px_#000]">
                    <span className="font-['Bangers'] text-xl uppercase tracking-widest">Dossier #482</span>
                </div>

                <div className="space-y-8 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ParallelogramInput
                            label="Pseudo (Nom de Code)"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                        />
                        <ParallelogramInput
                            label="Quartier Général"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Ville, Pays"
                        />
                    </div>

                    <div className="relative group z-0">
                         {/* Label Cartouche (Rectangulaire) */}
                         <div className="flex mb-[-2px] relative z-20">
                            <div className="border-2 border-black border-b-0 px-4 py-1.5 bg-black">
                              <label className="block text-white font-bold text-xs uppercase tracking-[0.25em] italic">
                                Biographie
                              </label>
                            </div>
                         </div>
                         {/* Textarea (Rectangulaire) */}
                         <div className="border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_#000000] p-4 relative z-10 focus-within:shadow-[6px_6px_0px_0px_#2563EB] focus-within:border-[#2563EB] transition-all">
                             <textarea
                                rows={4}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full h-full focus:outline-none text-black font-bold text-base resize-none bg-transparent placeholder:text-gray-700"
                             />
                         </div>
                    </div>

                    <ParallelogramInput
                        label="Email Sécurisé"
                        value={user.email}
                        onChange={() => {}}
                        placeholder="email@domain.com"
                    />

                    <div className="pt-6 border-t-2 border-dashed border-black/20 flex justify-end">
                        <ComicButton variant="primary" className="font-['Bangers'] text-xl tracking-wide px-10">
                            <Save className="w-5 h-5 mr-2" />
                            Enregistrer les Planches
                        </ComicButton>
                    </div>
                </div>
            </div>

            {/* Stats Rapides */}
            <div className="grid grid-cols-3 gap-6 mt-12">
                {[
                    { label: "Bulles Lues", val: "142", icon: Star },
                    { label: "Séries Suivies", val: "8", icon: Zap },
                    { label: "Commentaires", val: "34", icon: MapPin },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white border-2 border-black p-4 text-center shadow-[4px_4px_0px_0px_#000]">
                        <stat.icon className="w-8 h-8 mx-auto mb-3 text-black" />
                        <div className="text-4xl font-['Bangers'] text-black">{stat.val}</div>
                        <div className="text-xs font-black uppercase tracking-widest text-black mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

// Petite icône locale pour l'en-tête
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default UserProfile;