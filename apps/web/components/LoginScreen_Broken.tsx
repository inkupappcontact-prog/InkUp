import React, { useState } from 'react';
import { ArrowRight, LogIn, UserPlus, BookOpen, PenTool, Sparkles } from 'lucide-react';
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

  /**
   * Envoyer l'email de bienvenue
   */
  const sendWelcomeEmail = async (userEmail: string, userName: string, userRole: string, artistName?: string) => {
    try {
      // Utiliser le service d'email de Supabase
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string; artistName?: string } = {};
    
    if (!email) newErrors.email = "Manquant !";
    if (!password) newErrors.password = "Secret !";
    if (!isLogin && userType === 'author' && !artistName) {
      newErrors.artistName = "C'est votre signature !";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        // LOGIN
        console.log('🔍 Tentative de connexion avec:', {
          email,
          passwordLength: password.length,
          passwordProvided: !!password
        });

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        console.log('📊 Réponse login Supabase:', { data, error });

        if (error) {
          console.error('❌ Erreur login détaillée:', {
            message: error.message,
            status: error.status,
            code: error.code,
            details: error
          });
          throw error;
        }

        if (data.user) {
          // Utiliser les métadonnées utilisateur pour déterminer le rôle
          console.log('User data:', data.user);
          console.log('User metadata:', data.user.user_metadata);
          const userRole = data.user.user_metadata?.role || 'reader';
          console.log('User role:', userRole);
          
          if (userRole === 'author') {
            console.log('Redirecting to dashboard');
            window.location.href = '/dashboard';
          } else {
            console.log('Redirecting to reader');
            window.location.href = '/reader';
          }
        }
      } else {
        // SIGNUP
        console.log('🔍 Tentative d\'inscription avec les données:', {
          email,
          passwordLength: password.length,
          userType,
          artistName: userType === 'author' ? artistName : null,
          metadata: {
            full_name: email.split('@')[0],
            role: userType,
            artist_name: userType === 'author' ? artistName : null,
          }
        });

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split('@')[0],
              role: userType,
              artist_name: userType === 'author' ? artistName : null,
            }
          }
        });

        console.log('📊 Réponse Supabase:', { data, error });

        if (error) {
          console.error('❌ Erreur Supabase détaillée:', {
            message: error.message,
            status: error.status,
            code: error.code,
            details: error
          });
          throw error;
        }

        if (data.user) {
          // Logs de débogage pour vérifier l'insertion
          console.log('✅ Signup successful - User created:', data.user);
          console.log('📋 User metadata:', data.user.user_metadata);
          console.log('🎯 User role from metadata:', data.user.user_metadata?.role);
          console.log('🎨 Artist name from metadata:', data.user.user_metadata?.artist_name);
          
          // Vérifier si le profile a été créé dans la base de données
          try {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();
            
            if (profileError) {
              console.error('❌ Profile creation error:', profileError);
            } else {
              console.log('✅ Profile created successfully:', profileData);
            }
          } catch (err) {
            console.error('❌ Profile check error:', err);
          }

          // Envoyer l'email de bienvenue
          await sendWelcomeEmail(
            email,
            data.user.user_metadata?.full_name || email.split('@')[0],
            userType,
            userType === 'author' ? artistName : undefined
          );

          // Connexion immédiate après signup (email confirmation désactivée)
          // Utiliser les métadonnées utilisateur pour déterminer le rôle
          const userRole = data.user.user_metadata?.role || 'reader';
          
          if (userRole === 'author') {
            console.log('Redirecting to dashboard');
            window.location.href = '/dashboard';
          } else {
            console.log('Redirecting to reader');
            window.location.href = '/reader';
          }
          setErrors({});
        }
      }
    } catch (err: any) {
      console.error('Erreur auth:', err);
      if (err.message?.includes('Invalid login credentials')) {
        setErrors({ email: 'Email ou mot de passe incorrect' });
      } else if (err.message?.includes('User already registered')) {
          console.log('🔄 Utilisateur déjà existant, tentative de connexion automatique');
          // L'utilisateur existe déjà, essayer de le connecter directement
          try {
            console.log('🔍 Tentative de connexion auto pour:', {
              email,
              passwordLength: password.length
            });

            const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            console.log('📊 Réponse connexion auto:', { loginData, loginError });

            if (loginError) {
              console.error('❌ Erreur connexion auto:', {
                message: loginError.message,
                status: loginError.status,
                code: loginError.code
              });
              throw loginError;
            }

            if (loginData.user) {
              // Utiliser les métadonnées utilisateur pour déterminer le rôle
              const userRole = loginData.user.user_metadata?.role || 'reader';
              
              if (userRole === 'author') {
                console.log('Redirecting to dashboard');
                window.location.href = '/dashboard';
              } else {
                console.log('Redirecting to reader');
                window.location.href = '/reader';
              }
            }
          } catch (loginErr: any) {
            setErrors({ email: 'Cet email est déjà utilisé. Essayez de vous connecter.' });
          }
        } else {
        setErrors({ email: err.message || 'Erreur de connexion' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
    } catch (err: any) {
      console.error('Erreur Google:', err);
      alert('Erreur lors de la connexion Google');
    }
  };

  const handleToggleMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setErrors({});
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white overflow-hidden font-roboto">
      
      {/* --- PLANCHE GAUCHE : L'ILLUSTRATION --- */}
      <div className="lg:w-1/2 bg-[#FFFFFF] relative flex flex-col items-center justify-center p-10 lg:p-20 border-b-8 lg:border-b-0 lg:border-r-8 border-black z-10 overflow-hidden text-center">
        {/* Trame de fond BD classique */}
        <div className="absolute inset-0 halftone opacity-10"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo encadré comme un titre d'album */}
          <div className="bg-white p-4 border-4 border-black shadow-[12px_12px_0px_0px_#000000] rotate-[-1deg] transition-transform hover:rotate-0 duration-300">
             <InkUpLogo className="w-48 h-48 lg:w-72 lg:h-72" />
          </div>

          {/* Bulle de dialogue style "Ligne Claire" */}
          <div className="mt-12 relative bg-white border-[3px] border-black px-8 py-6 max-w-[340px] shadow-[8px_8px_0px_0px_#2563EB] text-center rotate-[2deg]">
            <p className="font-bold text-lg text-black uppercase italic leading-tight tracking-tight">
              {isLogin 
                ? "Vite ! Tournez la page pour découvrir la suite de l'histoire !" 
                : "Prenez vos crayons et rejoignez la plus grande rédaction de BD !"}
            </p>
            {/* Queue de la bulle (Appendice) */}
            <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 w-0 h-0 
              border-l-[15px] border-l-transparent 
              border-r-[15px] border-r-transparent 
              border-b-[20px] border-black">
            </div>
            <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-0 h-0 
              border-l-[12px] border-l-transparent 
              border-r-[12px] border-r-transparent 
              border-b-[17px] border-white">
            </div>
          </div>
        </div>
        
        {/* Mention légale style bas de page BD */}
        <div className="absolute bottom-6 flex items-center gap-2 text-black font-bold uppercase text-[9px] tracking-[0.25em] italic opacity-60">
            <span className="bg-black text-white px-1 py-0.5 not-italic">©</span> Dépôt Légal : {new Date().getFullYear()} • Tome 1
        </div>
      </div>

      {/* --- PLANCHE DROITE : LE BUREAU DE RÉDACTION --- */}
      <div className="lg:w-1/2 relative bg-black flex flex-col justify-center p-8 sm:p-12 lg:p-24 border-l-4 border-white/10 overflow-y-auto">
        
        {/* Toggle Mode (Interrupteur de case) */}
        <div className="absolute top-8 left-8 flex gap-2 z-30">
          <button 
            onClick={() => handleToggleMode(true)}
            className={`
              relative h-10 transform -skew-x-12 border-2 px-6 flex items-center gap-2 transition-all duration-200
              ${isLogin ? 'bg-[#2563EB] border-white text-white shadow-[4px_4px_0px_0px_#FFFFFF] scale-105' : 'bg-transparent border-white/30 text-white/50 hover:border-white/60'}
            `}
          >
            <LogIn className="w-4 h-4 transform skew-x-12" />
            <span className="transform skew-x-12 font-bold text-[10px] uppercase tracking-widest">Lecture</span>
          </button>
          <button 
            onClick={() => handleToggleMode(false)}
            className={`
              relative h-10 transform -skew-x-12 border-2 px-6 flex items-center gap-2 transition-all duration-200
              ${!isLogin ? 'bg-[#2563EB] border-white text-white shadow-[4px_4px_0px_0px_#FFFFFF] scale-105' : 'bg-transparent border-white/30 text-white/50 hover:border-white/60'}
            `}
          >
            <UserPlus className="w-4 h-4 transform skew-x-12" />
            <span className="transform skew-x-12 font-bold text-[10px] uppercase tracking-widest">Atelier</span>
          </button>
        </div>
          </div>

          {/* User Type Selection (Signup only) */}
          {!isLogin && (
            <div className="mb-8">
              <label className="block text-sm font-bold mb-3 text-black">Je suis :</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setUserType('reader')}
                  className={`p-4 border-2 border-black rounded-lg font-bold transition-all duration-200 ${
                    userType === 'reader'
                      ? 'bg-[#2563EB] text-white shadow-lg'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="w-6 h-6 mx-auto mb-2" />
                  Lecteur
                </button>
                <button
                  onClick={() => setUserType('author')}
                  className={`p-4 border-2 border-black rounded-lg font-bold transition-all duration-200 ${
                    userType === 'author'
                      ? 'bg-[#2563EB] text-white shadow-lg'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  <PenTool className="w-6 h-6 mx-auto mb-2" />
                  Auteur
                </button>
              </div>
            )}

            {/* Artist Name Field (Author only) */}
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

            {/* Bouton Principal - RECTANGLE NOIR (Règle #4) sans l'icône éclair */}
            <ComicButton 
              type="submit" 
              variant="primary" 
              className="w-full h-16 text-xl italic tracking-[0.2em] group disabled:opacity-50"
              disabled={loading}
            >
              <span>{loading ? 'Chargement...' : (isLogin ? 'Entrer dans la Case' : 'Signer le Contrat')}</span>
            </ComicButton>
          </form>

          {/* Séparateur de Chapitre */}
          <div className="my-10 flex items-center gap-4">
             <div className="h-[2px] bg-white/10 flex-1"></div>
             <Sparkles className="w-4 h-4 text-white/20" />
             <div className="h-[2px] bg-white/10 flex-1"></div>
          </div>

          {/* Connexion Sociale en Parallélogramme avec Logo Google Officiel sur fond noir */}
          <div className="flex justify-center">
             <button 
               type="button" 
               onClick={handleGoogleLogin}
               className="w-full relative h-14 transform -skew-x-12 border-2 border-white bg-[#000000] 
                          hover:bg-white/10 transition-all
                          shadow-[6px_6px_0px_0px_#2563EB] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
             >
                <div className="transform skew-x-12 flex items-center justify-center gap-4 h-full w-full">
                  {/* Official Google G Logo - No white background, displayed on black */}
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-black text-[11px] uppercase tracking-[0.3em] text-white">Continuer avec Google</span>
                </div>
             </button>
          </div>

        </div>

        {/* Crédit bas de page */}
        <div className="mt-12 lg:absolute lg:bottom-6 lg:right-8 text-right">
           <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white/30 italic">InkUp Éditions</p>
           <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/10">Division de BD</p>
        </div>
      </div>

    </div>
  );
};

export default LoginScreen;
