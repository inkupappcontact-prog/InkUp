'use client';

import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import LoginScreen from '@/components/LoginScreen';
import Dashboard from '@/components/Dashboard';
import LandingPage from '@/components/LandingPage';
import SkeletonDashboard from '@/components/SkeletonDashboard';

interface Profile {
  role: 'reader' | 'author';
  artist_name?: string;
}

const DEFAULT_BALANCE = 150;

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser) {
        const userRole = currentUser.user_metadata?.role || 'reader';
        const artistName = currentUser.user_metadata?.artist_name || 'Auteur';
        const userProfile = { role: userRole, artist_name: artistName } as Profile;
        setProfile(userProfile);
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
    void title;
    // TODO: implémenter la navigation vers le lecteur
  };

  if (loading) {
    return <SkeletonDashboard />;
  }

  // Si l'utilisateur est connecté, afficher le dashboard
  if (user && profile) {
    const dashboardUser = {
      email: user.email || '',
      role: profile.role,
      balance: DEFAULT_BALANCE,
      plan: 'free' as const, // Plan par défaut
    };

    return <Dashboard user={dashboardUser} onLogout={handleLogout} onRead={handleRead} />;
  }

  // Si l'utilisateur clique sur "Se connecter", afficher l'écran de login
  if (showLogin) {
    return <LoginScreen initialMode="login" />;
  }

  // Par défaut, afficher la landing page
  return <LandingPage onStart={handleLogin} />;
}
