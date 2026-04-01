import React, { useState } from 'react';
import { BookOpen, PenTool } from 'lucide-react';
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
  const [stayConnected, setStayConnected] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  interface WelcomeEmailParams {
    userEmail: string;
    userName: string;
    userRole: string;
    artistName?: string;
  }

  const sendWelcomeEmail = async ({ userEmail, userName, userRole, artistName }: WelcomeEmailParams) => {
    try {
      const { error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          user_email: userEmail,
          user_name: userName,
          user_role: userRole,
          artist_name: artistName,
        },
      });
      if (error) console.error('Erreur envoi email bienvenue:', error);
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

  const getButtonText = () => {
    if (isLogin) return 'Entrer dans la Case';
    return 'Signer le Contrat';
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Erreur de connexion:', error);
      const status = (error as { status?: number }).status;
      if (status === 400 || status === 401) {
        setErrors((prev) => ({ ...prev, email: 'Identifiants invalides' }));
        setAlert({ type: 'error', message: 'Identifiants invalides' });
      } else {
        setErrors((prev) => ({ ...prev, email: 'Erreur service. Réessayez.' }));
        setAlert({ type: 'error', message: 'Erreur service. Réessayez.' });
      }
      return;
    }

    if (data.user) {
      setAlert({ type: 'success', message: 'Connexion réussie !' });
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
      await sendWelcomeEmail({
        userEmail: email,
        userName,
        userRole: userType,
        artistName: userType === 'author' ? artistName : undefined,
      });
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
      setErrors({ email: 'Erreur technique. Réessayez.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-comic-neue text-white overflow-x-hidden">
      <div className="max-w-md mx-auto p-6">
        <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-[#FFD700] rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <InkUpLogo className="w-16 h-16 mx-auto mb-4" />
            <h1 className="font-bangers text-4xl mb-2 text-[#FFD700]">{isLogin ? 'Connexion' : 'Inscription'}</h1>
            <p className="text-white font-comic-neue">
              {isLogin ? 'Bienvenue sur InkUp !' : 'Rejoignez la révolution de la BD !'}
            </p>
          </div>

          {alert && (
            <div
              className={`fixed top-4 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-lg border-2 p-3 text-center shadow-lg ${
                alert.type === 'error'
                  ? 'bg-[#FF5A5F] text-white border-red-800'
                  : 'bg-[#16A34A] text-white border-green-800'
              }`}
            >
              {alert.message}
            </div>
          )}

          <div
            className="flex mb-8 bg-gray-800 border-2 border-[#FFD700] rounded-lg p-1"
            role="tablist"
            aria-label="Type d'authentification"
          >
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 font-bold transition-all duration-200 rounded-md ${
                isLogin ? 'bg-[#FFD700] text-black shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
              role="tab"
              aria-selected={isLogin}
              aria-label="Connexion"
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 font-bold transition-all duration-200 rounded-md ${
                !isLogin ? 'bg-[#FFD700] text-black shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
              role="tab"
              aria-selected={!isLogin}
              aria-label="Inscription"
            >
              Inscription
            </button>
          </div>

          {!isLogin && (
            <div className="mb-8">
              <label className="block text-sm font-bold mb-3 text-[#FFD700]" id="user-type-label">
                Je suis :
              </label>
              <div className="grid grid-cols-2 gap-4" role="radiogroup" aria-labelledby="user-type-label">
                <button
                  onClick={() => setUserType('reader')}
                  className={`p-4 border-2 border-[#FFD700] rounded-lg font-bold transition-all duration-200 ${
                    userType === 'reader'
                      ? 'bg-[#FFD700] text-black shadow-lg'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  role="radio"
                  aria-checked={userType === 'reader'}
                  aria-label="Lecteur - Je veux lire des bandes dessinées"
                >
                  <BookOpen className="w-6 h-6 mx-auto mb-2" aria-hidden="true" />
                  Lecteur
                </button>
                <button
                  onClick={() => setUserType('author')}
                  className={`p-4 border-2 border-[#FFD700] rounded-lg font-bold transition-all duration-200 ${
                    userType === 'author'
                      ? 'bg-[#FFD700] text-black shadow-lg'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  role="radio"
                  aria-checked={userType === 'author'}
                  aria-label="Auteur - Je veux publier mes œuvres"
                >
                  <PenTool className="w-6 h-6 mx-auto mb-2" aria-hidden="true" />
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

          <div className="flex items-center justify-between py-2 bg-black rounded">
            <label
              htmlFor="stay-connected"
              className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-yellow-900/30 transition-colors duration-200"
            >
              {/* Case à cocher personnalisée */}
              <div className="relative w-5 h-5">
                <input
                  id="stay-connected"
                  type="checkbox"
                  checked={stayConnected}
                  onChange={(e) => setStayConnected(e.target.checked)}
                  className="absolute inset-0 w-full h-full cursor-pointer peer appearance-none"
                />
                {/* Fond et bordure */}
                <div className="absolute inset-0 flex items-center justify-center border-2 border-yellow-400 rounded-sm transition-all duration-200 peer-checked:bg-yellow-400">
                  {/* Coche (apparaît quand coché) */}
                  <span className={`${stayConnected ? 'block' : 'hidden'} text-black font-bold text-xs`}>✓</span>
                </div>
              </div>

              {/* Texte du label */}
              <span className="font-bold text-xs uppercase tracking-wider text-white hover:text-yellow-400 transition-colors">
                RESTER CONNECTÉ
              </span>
            </label>

            {isLogin && (
              <a
                href="#"
                className="font-bold text-[10px] uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors italic"
              >
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
            <span>{loading ? 'Chargement...' : getButtonText()}</span>
          </ComicButton>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
            <button onClick={() => setIsLogin(!isLogin)} className="text-[#2563EB] font-bold hover:underline ml-1">
              {isLogin ? "S'inscrire" : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
