'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Profile } from '@shared/types';

function SkeletonDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="h-12 bg-gray-700 mb-8 animate-pulse transform rotate-2"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({length: 12}, (_, i) => (
            <div key={i} className="bg-gray-800 border-4 border-blue-500 shadow-lg shadow-blue-500/50 p-2 animate-pulse transform rotate-1">
              <div className="aspect-square bg-gray-600"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
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
        const artistName = user.user_metadata?.artist_name || 'Auteur';
        setProfile({ role: userRole, artist_name: artistName } as Profile);
      }
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'author')) {
      router.push('/');
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return <SkeletonDashboard />;
  }

  if (!user || profile?.role !== 'author') {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 transform rotate-2 text-blue-500">
          Bienvenue, {profile.artist_name || 'Auteur'}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({length: 12}, (_, i) => (
            <div key={i} className="bg-white border-4 border-black shadow-lg shadow-blue-500/50 p-2 transform rotate-1 hover:rotate-0 transition-transform">
              <div className="aspect-square bg-gray-200 flex items-center justify-center text-black font-bold text-lg">
                Planche {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
