import React from 'react';
import { User, Mail, Calendar, Award, Edit } from 'lucide-react';

interface UserProfileProps {
  user: { email: string; role: 'reader' | 'author'; balance: number; plan: 'free' | 'premium' };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="bg-gray-900 border-4 border-[#2563EB] rounded-lg p-8">
      <h2 className="font-['Bangers'] text-3xl text-[#2563EB] mb-6">Profil</h2>

      <div className="space-y-6">
        {/* Avatar et infos principales */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-[#2563EB] rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-black" />
          </div>
          <div>
            <h3 className="font-['Bangers'] text-2xl text-white mb-2">{user.email}</h3>
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="w-4 h-4" />
              <span className="capitalize">{user.role === 'author' ? 'Auteur' : 'Lecteur'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Membre depuis 2026</span>
            </div>
          </div>
        </div>

        {/* Informations détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black border-2 border-[#2563EB] rounded-lg p-4">
            <h4 className="font-bold text-[#2563EB] mb-3">Informations</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-white">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-white capitalize">{user.role}</span>
              </div>
            </div>
          </div>

          <div className="bg-black border-2 border-[#2563EB] rounded-lg p-4">
            <h4 className="font-bold text-[#2563EB] mb-3">Abonnement</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Plan:</span>
                <span className="text-white font-bold capitalize">{user.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Solde:</span>
                <span className="text-[#2563EB] font-bold">{user.balance} IP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="flex-1 bg-[#2563EB] text-black px-4 py-3 font-bold border-2 border-black hover:bg-[#FF6B35] transition-colors flex items-center justify-center gap-2">
            <Edit className="w-4 h-4" />
            Modifier le profil
          </button>
          <button className="flex-1 bg-gray-800 text-white px-4 py-3 font-bold border-2 border-gray-600 hover:bg-gray-700 transition-colors">
            Changer le mot de passe
          </button>
        </div>

        {/* Statistiques */}
        {user.role === 'author' && (
          <div className="bg-black border-2 border-[#2563EB] rounded-lg p-6">
            <h4 className="font-bold text-[#2563EB] mb-4">Mes Statistiques</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-gray-400 text-sm">Œuvres publiées</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2563EB">1,247</div>
                <div className="text-gray-400 text-sm">Lecteurs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.8</div>
                <div className="text-gray-400 text-sm">Note moyenne</div>
              </div>
            </div>
          </div>
        )}

        {user.role === 'reader' && (
          <div className="bg-black border-2 border-[#2563EB] rounded-lg p-6">
            <h4 className="font-bold text-[#2563EB] mb-4">Ma Bibliothèque</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">28</div>
                <div className="text-gray-400 text-sm">BD possédées</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2563EB">156</div>
                <div className="text-gray-400 text-sm">Pages lues</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-gray-400 text-sm">Auteurs suivis</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
