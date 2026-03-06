'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Profile } from '@shared/types';
import Dashboard from '@/components/Dashboard';

const DEFAULT_BALANCE = 150;

function SkeletonDashboard() {
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser) {
        const userRole = currentUser.user_metadata?.role || 'reader';
        const artistName = currentUser.user_metadata?.artist_name || 'Auteur';
        setProfile({ role: userRole, artist_name: artistName } as Profile);
      }
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const shouldRedirect = !loading && (!user || profile?.role !== 'author');
    if (shouldRedirect) {
      router.push('/');
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return <SkeletonDashboard />;
  }

  if (!user || profile?.role !== 'author') {
    return null;
  }

  // Créer un objet utilisateur pour le composant Dashboard
  const dashboardUser = {
    email: user.email || '',
    role: profile.role,
    balance: DEFAULT_BALANCE, // Solde simulé
    plan: 'free' as const // Plan par défaut
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleRead = (_title: string) => {
    // TODO: implémenter la navigation vers le lecteur
  };

  return (
    <Dashboard
      user={dashboardUser}
      onLogout={handleLogout}
      onRead={handleRead}
    />
  );
}
