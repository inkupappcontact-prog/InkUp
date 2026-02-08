'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Profile } from '@shared/types';

export default function ReaderPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        // Utiliser les métadonnées utilisateur au lieu de la table profiles
        const userRole = user.user_metadata?.role || 'reader';
        setProfile({ role: userRole } as Profile);
      }
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log('Reader page - user:', user);
    console.log('Reader page - profile:', profile);
    console.log('Reader page - loading:', loading);
    console.log('Reader page - condition:', !loading && (!user || profile?.role !== 'reader'));
    
    if (!loading && (!user || profile?.role !== 'reader')) {
      console.log('Reader page - redirecting to home');
      router.push('/');
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!user || profile?.role !== 'reader') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Lecteur de BD</h1>
        <p className="text-lg">Fonctionnalité à venir...</p>
      </div>
    </div>
  );
}
