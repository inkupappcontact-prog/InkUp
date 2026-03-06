import React, { useState } from 'react';
import { LogIn, UserPlus, BookOpen, PenTool, Sparkles, ArrowLeft } from 'lucide-react';
import ParallelogramInput from './ParallelogramInput_BD';
import ComicButton from './ComicButton_BD';
import InkUpLogo from './InkUpLogo_BD';
import LegalModal from './LegalModal_BD';

interface LoginScreenProps {
  onLogin: (email: string, role: 'reader' | 'author') => void;
  onBack: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'reader' | 'author'>('reader');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [artistName, setArtistName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // Consentements
  const [consentTos, setConsentTos] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);

  // Modale légale
  const [showLegal, setShowLegal] = useState<'cgu' | 'privacy' | null>(null);

  type FormErrors = { email?: string; password?: string; artistName?: string; birthDate?: string; consent?: string };
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = 'Manquant !';
    if (!password) newErrors.password = 'Secret !';

    if (!isLogin) {
        if (userType === 'author' && !artistName) {
            newErrors.artistName = "C'est votre signature !";
        }
        if (!birthDate) {
            newErrors.birthDate = 'Requis pour l\'âge légal.';
        }
        if (!consentTos || !consentPrivacy) {
            newErrors.consent = 'Veuillez accepter les conditions.';
        }

        // Vérification simple de l'âge (18+)
        if (birthDate) {
            const birth = new Date(birthDate);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            if (age < 15) { // Minimum légal RGPD pour consentement numérique sans parents en France
                newErrors.birthDate = "Vous devez avoir au moins 15 ans.";
            }
        }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Succès : on déclenche la montée vers le Dashboard
      onLogin(email, userType);
    }
  };

  const handleToggleMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setErrors({});
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-black overflow-hidden">
      {showLegal && <LegalModal type={showLegal} onClose={() => setShowLegal(null)} />}

      {/* --- PLANCHE GAUCHE : L'ILLUSTRATION --- */}
      <div className="lg:w-1/2 bg-black relative flex flex-col items-center justify-center p-10 lg:p-20 border-b-8 lg:border-b-0 lg:border-r-8 border-[#2563EB] z-10 overflow-hidden text-center">
        <div className="absolute inset-0 halftone opacity-10"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-black p-4 border-4 border-[#2563EB] shadow-[12px_12px_0px_0px_#2563EB] rotate-[-1deg] transition-transform hover:rotate-0 duration-300">
             <InkUpLogo className="w-48 h-48 lg:w-72 lg:h-72" />
          </div>

          <div className="mt-12 relative bg-black border-[3px] border-[#2563EB] px-8 py-6 max-w-[340px] shadow-[8px_8px_0px_0px_#2563EB] text-center rotate-[2deg]">
            <p className="font-['Bangers'] text-2xl text-white uppercase tracking-wide leading-tight">
              {isLogin
                ? "Vite ! Tournez la page pour découvrir la suite !"
                : "Rejoignez la plus grande rédaction de BD !"}
            </p>
            <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-[#2563EB]"></div>
            <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[17px] border-black"></div>
          </div>
        </div>

        <div className="absolute bottom-6 flex items-center gap-2 text-white font-bold uppercase text-xs tracking-[0.25em] italic">
            <span className="bg-[#2563EB] text-black px-2 py-0.5 not-italic">©</span> Dépôt Légal : {new Date().getFullYear()} • Tome 1
        </div>
      </div>

      {/* --- PLANCHE DROITE : LE BUREAU DE RÉDACTION --- */}
      <div className="lg:w-1/2 relative bg-black flex flex-col justify-center p-8 sm:p-12 lg:p-24 border-l-4 border-[#2563EB] overflow-y-auto">

        {/* Barre d'outils (Retour et Toggles) */}
        <div className="absolute top-8 left-8 flex items-center gap-6 z-30">
          <button
             onClick={onBack}
             className="h-10 w-10 bg-black border-2 border-[#2563EB] flex items-center justify-center shadow-[3px_3px_0px_0px_#2563EB] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group"
             title="Retour à l'accueil"
             aria-label="Retour à l'accueil"
          >
             <ArrowLeft className="w-5 h-5 text-white group-hover:text-[#FF6B35]" />
          </button>

          <div className="flex gap-2">
            <button
                onClick={() => handleToggleMode(true)}
                className={`relative h-10 transform -skew-x-12 border-2 px-6 flex items-center gap-2 transition-all duration-200 ${isLogin ? 'bg-[#2563EB] border-black text-white shadow-[4px_4px_0px_0px_#000000] scale-105' : 'bg-transparent border-[#2563EB] text-white hover:bg-[#2563EB]/10'}`}
            >
                <LogIn className="w-4 h-4 transform skew-x-12" />
                <span className="transform skew-x-12 font-['Bangers'] text-lg uppercase tracking-widest mt-1">Lecture</span>
            </button>
            <button
                onClick={() => handleToggleMode(false)}
                className={`relative h-10 transform -skew-x-12 border-2 px-6 flex items-center gap-2 transition-all duration-200 ${!isLogin ? 'bg-[#2563EB] border-black text-white shadow-[4px_4px_0px_0px_#000000] scale-105' : 'bg-transparent border-[#2563EB] text-white hover:bg-[#2563EB]/10'}`}
            >
                <UserPlus className="w-4 h-4 transform skew-x-12" />
                <span className="transform skew-x-12 font-['Bangers'] text-lg uppercase tracking-widest mt-1">Atelier</span>
            </button>
          </div>
        </div>

        <div className="max-w-md w-full mx-auto mt-24 lg:mt-0">
          <div className="mb-10 relative">
            <h2 className="text-6xl lg:text-7xl text-white uppercase mb-2 tracking-wide drop-shadow-[2px_2px_0px_#2563EB]">
              {isLogin ? 'Reprendre' : 'Débuter'}
            </h2>
            <p className="text-[#2563EB] font-bold uppercase text-base tracking-[0.3em] ml-1 font-['Bangers']">
              {isLogin ? 'Le fil de l\'histoire' : 'Votre premier album'}
            </p>
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-[#2563EB]"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="mb-10">
                <label className="block text-white font-['Bangers'] text-xl uppercase tracking-wider mb-4 text-center border-b border-[#2563EB]/10 pb-2">
                  Choisissez votre rôle :
                </label>
                <div className="flex gap-4 mb-8">
                  <button type="button" onClick={() => setUserType('reader')} className={`flex-1 flex flex-col items-center gap-2 p-4 border-2 transform -skew-x-12 transition-all ${userType === 'reader' ? 'bg-[#2563EB] border-[#2563EB] text-black shadow-[4px_4px_0px_0px_#000000]' : 'bg-transparent border-[#2563EB]/40 text-white/60 hover:border-[#2563EB] hover:text-white'}`}>
                    <BookOpen className="w-6 h-6 transform skew-x-12" />
                    <span className="transform skew-x-12 font-['Bangers'] text-lg uppercase tracking-wide">Lecteur</span>
                  </button>
                  <button type="button" onClick={() => setUserType('author')} className={`flex-1 flex flex-col items-center gap-2 p-4 border-2 transform -skew-x-12 transition-all ${userType === 'author' ? 'bg-[#2563EB] border-[#2563EB] text-black shadow-[4px_4px_0px_0px_#000000]' : 'bg-transparent border-[#2563EB]/40 text-white/60 hover:border-[#2563EB] hover:text-white'}`}>
                    <PenTool className="w-6 h-6 transform skew-x-12" />
                    <span className="transform skew-x-12 font-['Bangers'] text-lg uppercase tracking-wide">Auteur</span>
                  </button>
                </div>
                {userType === 'author' && (
                  <ParallelogramInput label="Nom de Plume" placeholder="Hergé, Franquin..." value={artistName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArtistName(e.target.value)} error={errors.artistName} />
                )}

                <ParallelogramInput label="Date de Naissance" type="date" value={birthDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthDate(e.target.value)} error={errors.birthDate} />
              </div>
            )}

            <ParallelogramInput label="Email" placeholder="votre@alias.bd" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} error={errors.email} />
            <ParallelogramInput label="Mot de passe" type="password" placeholder="••••••••••••" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} error={errors.password} />

            {/* CONSENTEMENT RGPD */}
            {!isLogin && (
                <div className="space-y-3 bg-gray-900 p-4 border-2 border-[#2563EB]/20">
                     <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            className="mt-1 w-5 h-5 accent-[#2563EB] cursor-pointer"
                            checked={consentTos}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsentTos(e.target.checked)}
                        />
                        <span className="text-sm font-bold text-gray-300">
                            J'accepte les <button type="button" onClick={() => setShowLegal('cgu')} className="text-[#2563EB] underline hover:text-[#FF6B35]">Conditions Générales (CGU)</button>.
                        </span>
                     </label>
                     <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            className="mt-1 w-5 h-5 accent-[#2563EB] cursor-pointer"
                            checked={consentPrivacy}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsentPrivacy(e.target.checked)}
                        />
                        <span className="text-sm font-bold text-gray-300">
                            J'ai lu la <button type="button" onClick={() => setShowLegal('privacy')} className="text-[#2563EB] underline hover:text-[#FF6B35]">Politique de Confidentialité</button>.
                        </span>
                     </label>
                     {errors.consent && <p className="text-[#FF0000] text-xs font-black uppercase">{errors.consent}</p>}
                </div>
            )}

            <div className="flex items-center justify-between py-2">
               {isLogin && (
                 <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="w-5 h-5 border-2 border-[#2563EB] bg-transparent flex items-center justify-center transition-all group-hover:border-[#FF6B35]">
                       <input type="checkbox" className="peer appearance-none w-full h-full cursor-pointer" />
                       <div className="hidden peer-checked:block w-2.5 h-2.5 bg-[#2563EB]"></div>
                    </div>
                    <span className="font-['Bangers'] text-base uppercase tracking-wider text-white group-hover:text-[#2563EB] mt-0.5">Rester connecté</span>
                 </label>
               )}
               {isLogin && (
                 <a href="#" className="font-['Bangers'] text-base uppercase tracking-wider text-[#2563EB] hover:text-[#FF6B35] transition-colors mt-0.5">Mot de passe oublié ?</a>
               )}
            </div>

            <ComicButton type="submit" variant="primary" className="w-full h-16 text-2xl tracking-widest font-['Bangers']">
              <span>{isLogin ? 'Entrer dans la Case' : 'Signer le Contrat'}</span>
            </ComicButton>
          </form>

          <div className="my-10 flex items-center gap-4">
             <div className="h-[2px] bg-[#2563EB]/10 flex-1"></div>
             <Sparkles className="w-4 h-4 text-[#2563EB]/20" />
             <div className="h-[2px] bg-[#2563EB]/10 flex-1"></div>
          </div>

          <div className="flex justify-center">
             <button type="button" className="w-full relative h-14 transform -skew-x-12 border-2 border-[#2563EB] bg-black hover:bg-[#2563EB]/10 transition-all shadow-[6px_6px_0px_0px_#2563EB] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]">
                <div className="transform skew-x-12 flex items-center justify-center gap-4 h-full w-full">
                  <svg width="24" height="24" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span className="font-['Bangers'] text-lg uppercase tracking-wide text-white mt-1">Google</span>
                </div>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
