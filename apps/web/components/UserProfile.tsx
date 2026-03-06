import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Camera, Save, X } from 'lucide-react';
import ComicButton from './ui/ComicButton';
import ParallelogramInput from './ui/ParallelogramInput';

interface UserProfileProps {
  user: {
    email: string;
    role: 'reader' | 'author';
    balance: number;
    plan: 'free' | 'premium';
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    website: '',
    socialLinks: {
      twitter: '',
      instagram: '',
      facebook: ''
    }
  });

  const handleSave = () => {
    console.log('Sauvegarde du profil:', profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-4 border-black p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Bangers'] text-3xl flex items-center gap-3">
            <User className="w-8 h-8" />
            Mon Profil
          </h2>
          {!isEditing && (
            <ComicButton
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Modifier
            </ComicButton>
          )}
        </div>

        {/* Avatar et infos principales */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-32 h-32 bg-[#2563EB] rounded-full flex items-center justify-center border-4 border-black">
                <User className="w-16 h-16 text-white" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full border-2 border-white">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-2">Email</label>
                <div className="border-2 border-black p-3 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {user.email}
                  </div>
                </div>
              </div>
              <div>
                <label className="font-bold block mb-2">Rôle</label>
                <div className="border-2 border-black p-3 bg-gray-50">
                  <span className="font-bold text-[#2563EB]">
                    {user.role === 'author' ? 'Auteur/Dessinateur' : 'Lecteur'}
                  </span>
                </div>
              </div>
              <div>
                <label className="font-bold block mb-2">Plan</label>
                <div className="border-2 border-black p-3 bg-gray-50">
                  <span className="font-bold text-[#2563EB]">
                    {user.plan === 'premium' ? 'Premium' : 'Gratuit'}
                  </span>
                </div>
              </div>
              <div>
                <label className="font-bold block mb-2">Solde</label>
                <div className="border-2 border-black p-3 bg-gray-50">
                  <span className="font-bold text-[#2563EB]">{user.balance} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire d'édition */}
      {isEditing && (
        <div className="bg-white border-4 border-black p-6">
          <h3 className="font-['Bangers'] text-2xl mb-4">Informations personnelles</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-2">Prénom</label>
                <ParallelogramInput
                  placeholder="Jean"
                  value={profile.firstName}
                  onChange={(value) => setProfile(prev => ({ ...prev, firstName: value }))}
                />
              </div>
              <div>
                <label className="font-bold block mb-2">Nom</label>
                <ParallelogramInput
                  placeholder="Dupont"
                  value={profile.lastName}
                  onChange={(value) => setProfile(prev => ({ ...prev, lastName: value }))}
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-2">Bio</label>
              <textarea
                className="w-full border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]"
                rows={4}
                placeholder="Parlez-nous de vous..."
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Téléphone
                </label>
                <ParallelogramInput
                  placeholder="06 12 34 56 78"
                  value={profile.phone}
                  onChange={(value) => setProfile(prev => ({ ...prev, phone: value }))}
                />
              </div>
              <div>
                <label className="font-bold block mb-2">Site web</label>
                <ParallelogramInput
                  placeholder="https://monsite.com"
                  value={profile.website}
                  onChange={(value) => setProfile(prev => ({ ...prev, website: value }))}
                />
              </div>
            </div>

            {/* Adresse */}
            <div>
              <label className="font-bold block mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Adresse
              </label>
              <div className="space-y-2">
                <ParallelogramInput
                  placeholder="123 rue de la BD"
                  value={profile.address}
                  onChange={(value) => setProfile(prev => ({ ...prev, address: value }))}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <ParallelogramInput
                    placeholder="Code postal"
                    value={profile.postalCode}
                    onChange={(value) => setProfile(prev => ({ ...prev, postalCode: value }))}
                  />
                  <ParallelogramInput
                    placeholder="Ville"
                    value={profile.city}
                    onChange={(value) => setProfile(prev => ({ ...prev, city: value }))}
                  />
                  <select
                    value={profile.country}
                    onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                    className="border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            {user.role === 'author' && (
              <div>
                <label className="font-bold block mb-2">Réseaux sociaux</label>
                <div className="space-y-2">
                  <ParallelogramInput
                    placeholder="Twitter @pseudo"
                    value={profile.socialLinks.twitter}
                    onChange={(value) => setProfile(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, twitter: value }
                    }))}
                  />
                  <ParallelogramInput
                    placeholder="Instagram @pseudo"
                    value={profile.socialLinks.instagram}
                    onChange={(value) => setProfile(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, instagram: value }
                    }))}
                  />
                  <ParallelogramInput
                    placeholder="Facebook URL"
                    value={profile.socialLinks.facebook}
                    onChange={(value) => setProfile(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, facebook: value }
                    }))}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleCancel}
                className="flex-1 border-2 border-black px-4 py-3 font-bold hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 inline mr-2" />
                Annuler
              </button>
              <ComicButton
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Sauvegarder
              </ComicButton>
            </div>
          </div>
        </div>
      )}

      {/* Statistiques */}
      <div className="bg-white border-4 border-black p-6">
        <h3 className="font-['Bangers'] text-2xl mb-4">Mes statistiques</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 border-2 border-black p-4 text-center">
            <div className="text-3xl font-bold text-[#2563EB] mb-2">
              {user.role === 'author' ? '12' : '47'}
            </div>
            <div className="text-sm font-bold">
              {user.role === 'author' ? 'Œuvres publiées' : 'BD lues'}
            </div>
          </div>
          <div className="bg-gray-50 border-2 border-black p-4 text-center">
            <div className="text-3xl font-bold text-[#2563EB] mb-2">
              {user.role === 'author' ? '1,234' : '892'}
            </div>
            <div className="text-sm font-bold">
              {user.role === 'author' ? 'Lecteurs' : 'Auteurs suivis'}
            </div>
          </div>
          <div className="bg-gray-50 border-2 border-black p-4 text-center">
            <div className="text-3xl font-bold text-[#2563EB] mb-2">
              {user.role === 'author' ? '4.8' : '156'}
            </div>
            <div className="text-sm font-bold">
              {user.role === 'author' ? 'Note moyenne' : 'Jours d\'inscription'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
