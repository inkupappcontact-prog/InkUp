'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import LoginScreen from '@/components/LoginScreen';
import Dashboard from '@/components/Dashboard';
import LandingPage from '@/components/LandingPage';
import SkeletonDashboard from '@/components/SkeletonDashboard';

interface Profile {
  role: 'reader' | 'author';
  artist_name?: string;
}

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        // Utiliser les métadonnées utilisateur au lieu de la table profiles
        const userRole = user.user_metadata?.role || 'reader';
        const artistName = user.user_metadata?.artist_name || 'Auteur';
        setProfile({ role: userRole, artist_name: artistName } as Profile);
      }
      setLoading(false);
    };
    getData();
  }, []);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setShowLogin(false);
  };

  const handleRead = (title: string) => {
    // Implémenter la lecture
    console.log('Lecture de:', title);
  };

  if (loading) {
    return <SkeletonDashboard />;
  }

  // Si l'utilisateur est connecté, afficher le dashboard
  if (user && profile) {
    const dashboardUser = {
      email: user.email || '',
      role: profile.role,
      balance: 150, // Solde simulé
      plan: 'free' as const // Plan par défaut
    };

    return (
      <Dashboard 
        user={dashboardUser} 
        onLogout={handleLogout} 
        onRead={handleRead}
      />
    );
  }

  // Si l'utilisateur clique sur "Se connecter", afficher l'écran de login
  if (showLogin) {
    return <LoginScreen initialMode="login" />;
  }

  // Par défaut, afficher la landing page
  return <LandingPage onStart={handleLogin} />;
}
