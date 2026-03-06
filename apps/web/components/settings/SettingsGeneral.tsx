import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ParallelogramInput from '@/components/ui/ParallelogramInput';

interface SettingsGeneralProps {
  username: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

const SettingsGeneral: React.FC<SettingsGeneralProps> = ({
  username,
  onUsernameChange,
  showPassword,
  onTogglePassword,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="font-['Bangers'] text-xl mb-4">Informations du compte</h3>
      <div className="space-y-4">
        <div>
          <label className="font-bold block mb-2">Nom d&apos;utilisateur</label>
          <ParallelogramInput
            label="Nom d'utilisateur"
            placeholder="pseudo_inkup"
            value={username}
            onChange={onUsernameChange}
          />
        </div>
        <div>
          <label className="font-bold block mb-2">Email</label>
          <div className="border-2 border-black p-3 bg-gray-50">
            user@example.com
          </div>
        </div>
        <div>
          <label className="font-bold block mb-2">Mot de passe</label>
          <div className="relative">
            <ParallelogramInput
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value=""
              onChange={() => {}}
            />
            <button
              onClick={onTogglePassword}
              className="absolute right-3 top-3 p-1 hover:bg-gray-100 rounded"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 className="font-['Bangers'] text-xl mb-4">Langue et région</h3>
      <div className="space-y-4">
        <div>
          <label className="font-bold block mb-2">Langue</label>
          <select className="w-full border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]">
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div>
          <label className="font-bold block mb-2">Fuseau horaire</label>
          <select className="w-full border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]">
            <option value="Europe/Paris">Europe/Paris</option>
            <option value="Europe/London">Europe/London</option>
            <option value="America/New_York">America/New_York</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsGeneral;
