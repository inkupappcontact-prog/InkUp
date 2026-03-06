import React, { useState } from 'react';
import { LogIn, UserPlus, BookOpen, PenTool, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ParallelogramInput from '@/components/ui/ParallelogramInput';
import ComicButton from '@/components/ui/ComicButton';
import InkUpLogo from '@/components/ui/InkUpLogo';

interface LoginScreenProps {
  initialMode?: 'login' | 'signup';
}

const LoginScreen: React.FC<LoginScreenProps> = ({ initialMode = 'login' }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [userType, setUserType] = useState<'reader' | 'author'>('reader');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [artistName, setArtistName] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; artistName?: string }>({});
  const [loading, setLoading] = useState(false);

  const sendWelcomeEmail = async (userEmail: string, userName: string, userRole: string, artistName?: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          user_email: userEmail,
          user_name: userName,
          user_role: userRole,
          artist_name: artistName,
        },
      });

      if (error) {
        console.error('Erreur envoi email bienvenue:', error);
      } else {
        console.log('Email de bienvenue envoyé avec succès');
      }
    } catch (error) {
      console.error('Erreur service email bienvenue:', error);
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; artistName?: string } = {};

    if (!email) newErrors.email = 'Manquant !';
    if (!password) newErrors.password = 'Secret !';
    if (!isLogin && userType === 'author' && !artistName) {
      newErrors.artistName = "C'est votre signature !";
    }

    return newErrors;
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    if (data.user) {
      const userRole = data.user.user_metadata?.role || 'reader';
      router.push(userRole === 'author' ? '/dashboard' : '/');
    }
  };

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: userType,
          artist_name: userType === 'author' ? artistName : null,
          full_name: email.split('@')[0],
        },
      },
    });

    if (error) throw error;

    if (data.user) {
      const userName = data.user.user_metadata?.full_name || email.split('@')[0];
      await sendWelcomeEmail(email, userName, userType, userType === 'author' ? artistName : undefined);
      const userRole = data.user.user_metadata?.role || 'reader';
      router.push(userRole === 'author' ? '/dashboard' : '/');
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleSignup();
      }
    } catch (error) {
      console.error('❌ Erreur handleSubmit:', error);
      setErrors({ email: "Erreur technique. Réessayez." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      console.error('Erreur Google:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black font-comic-neue text-white overflow-x-hidden">
      <div className="max-w-md mx-auto p-6">
        <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-[#FFD700] rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <InkUpLogo className="w-16 h-16 mx-auto mb-4" />
            <h1 className="font-bangers text-4xl mb-2 text-[#FFD700]">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h1>
            <p className="text-white font-comic-neue">
              {isLogin ? 'Bienvenue sur InkUp !' : 'Rejoignez la révolution de la BD !'}
            </p>
          </div>

          <div className="flex mb-8 bg-gray-800 border-2 border-[#FFD700] rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 font-bold transition-all duration-200 rounded-md ${
                isLogin
                  ? 'bg-[#FFD700] text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 font-bold transition-all duration-200 rounded-md ${
                !isLogin
                  ? 'bg-[#FFD700] text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Inscription
            </button>
          </div>

          {!isLogin && (
            <div className="mb-8">
              <label className="block text-sm font-bold mb-3 text-[#FFD700]">Je suis :</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setUserType('reader')}
                  className={`p-4 border-2 border-[#FFD700] rounded-lg font-bold transition-all duration-200 ${
                    userType === 'reader'
                      ? 'bg-[#FFD700] text-black shadow-lg'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  <BookOpen className="w-6 h-6 mx-auto mb-2" />
                  Lecteur
                </button>
                <button
                  onClick={() => setUserType('author')}
                  className={`p-4 border-2 border-[#FFD700] rounded-lg font-bold transition-all duration-200 ${
                    userType === 'author'
                      ? 'bg-[#FFD700] text-black shadow-lg'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  <PenTool className="w-6 h-6 mx-auto mb-2" />
                  Auteur
                </button>
              </div>
            </div>
          )}

          {!isLogin && userType === 'author' && (
            <div className="mb-6">
              <ParallelogramInput
                label="Nom de Plume (Artiste)"
                placeholder="Hergé, Franquin, Moebius..."
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                error={errors.artistName}
                dark
              />
            </div>
          )}

          <ParallelogramInput
            label="Email"
            placeholder="votre@alias.bd"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            dark
          />

          <ParallelogramInput
            label="Mot de passe"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            dark
          />

          <div className="flex items-center justify-between py-2">
             <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="w-5 h-5 border-2 border-white bg-transparent flex items-center justify-center transition-all group-hover:border-[#2563EB]">
                   <input type="checkbox" className="peer appearance-none w-full h-full cursor-pointer" />
                   <div className="hidden peer-checked:block w-2.5 h-2.5 bg-[#2563EB]"></div>
                </div>
                <span className="font-bold text-[10px] uppercase tracking-wider text-white/60 group-hover:text-white">Rester connecté</span>
             </label>

             {isLogin && (
               <a href="#" className="font-bold text-[10px] uppercase tracking-wider text-[#2563EB] hover:text-[#2563EB]/80 transition-colors italic">
                 Mot de passe oublié ?
               </a>
             )}
          </div>

          <ComicButton
            type="submit"
            variant="primary"
            className="w-full h-16 text-xl italic tracking-[0.2em] group disabled:opacity-50"
            disabled={loading}
            onClick={() => handleSubmit()}
          >
            <span>{loading ? 'Chargement...' : (isLogin ? 'Entrer dans la Case' : 'Signer le Contrat')}</span>
          </ComicButton>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#2563EB] font-bold hover:underline ml-1"
            >
              {isLogin ? 'S\'inscrire' : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
