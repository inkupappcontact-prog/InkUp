import React from 'react';

interface SettingsAppearanceProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const SettingsAppearance: React.FC<SettingsAppearanceProps> = ({ isDarkMode, onToggleDarkMode }) => (
  <div className="space-y-6">
    <h3 className="font-['Bangers'] text-xl mb-4">Apparence</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border-2 border-black">
        <div>
          <p className="font-bold">Mode sombre</p>
          <p className="text-sm text-gray-600">Utiliser le thème sombre</p>
        </div>
        <button
          onClick={onToggleDarkMode}
          className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
            isDarkMode ? 'bg-[#2563EB]' : 'bg-gray-300'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
            isDarkMode ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
      </div>

      <div>
        <label className="font-bold block mb-2">Taille du texte</label>
        <select className="w-full border-4 border-black p-3 font-['Comic Neue'] focus:outline-none focus:border-[#2563EB]">
          <option value="small">Petit</option>
          <option value="medium">Moyen</option>
          <option value="large">Grand</option>
        </select>
      </div>

      <div>
        <label className="font-bold block mb-2">Thème de couleur</label>
        <div className="grid grid-cols-4 gap-2">
          <button className="w-full h-12 bg-[#2563EB] border-2 border-black rounded" aria-label="Thème bleu" />
          <button className="w-full h-12 bg-red-500 border-2 border-black rounded" aria-label="Thème rouge" />
          <button className="w-full h-12 bg-green-500 border-2 border-black rounded" aria-label="Thème vert" />
          <button className="w-full h-12 bg-purple-500 border-2 border-black rounded" aria-label="Thème violet" />
        </div>
      </div>
    </div>
  </div>
);

export default SettingsAppearance;
