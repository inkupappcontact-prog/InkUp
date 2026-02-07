import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ParallelogramInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  dark?: boolean;
}

const ParallelogramInput: React.FC<ParallelogramInputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  dark = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-6 group relative z-0 font-roboto">
      {/* Label style cartouche éditorial */}
      <div className="flex mb-[-2px] relative z-20">
        <div className={`
          transform -skew-x-12 border-2 border-black border-b-0 px-4 py-1.5 
          transition-all duration-200
          ${isFocused ? 'bg-[#2563EB] -translate-y-0.5' : 'bg-black'}
        `}>
          <label className="transform skew-x-12 block text-white font-bold text-[10px] uppercase tracking-[0.25em] italic">
            {label}
          </label>
        </div>
      </div>

      {/* Cadre principal de l'entrée */}
      <div className="relative">
        <div className={`
          transform -skew-x-12 border-[3px] bg-white h-14 flex items-center
          transition-all duration-150 ease-out
          ${isFocused ? 'border-[#2563EB] shadow-[6px_6px_0px_0px_#2563EB]' : 'border-black shadow-[6px_6px_0px_0px_#000000]'}
          ${error ? 'border-[#EA4335] shadow-[6px_6px_0px_0px_#EA4335]' : ''}
          relative overflow-hidden z-10
        `}>
          <input
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="transform skew-x-12 w-full h-full px-8 py-2 focus:outline-none text-black font-bold text-sm lg:text-base placeholder:text-gray-300 bg-transparent tracking-tight"
            style={{ 
              marginLeft: '-3%', 
              width: isPassword ? '85%' : '106%' 
            }}
          />

          {/* Bouton pour afficher/masquer le mot de passe (Règle #6) */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 h-10 w-12 flex items-center justify-center transition-colors group/btn"
              title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {/* Le bouton lui-même est un petit parallélogramme bleu/noir */}
              <div className={`
                absolute inset-0 transform bg-black border border-white/20 transition-colors
                group-hover/btn:bg-[#2563EB]
              `}></div>
              <div className="relative transform skew-x-12 text-white">
                {showPassword ? (
                  <EyeOff className="w-5 h-5" strokeWidth={2.5} />
                ) : (
                  <Eye className="w-5 h-5" strokeWidth={2.5} />
                )}
              </div>
            </button>
          )}
        </div>

        {/* Erreur - Style "Note de l'éditeur" */}
        {error && (
          <div className="absolute -right-2 -bottom-5 bg-[#EA4335] border-2 border-black text-white px-3 py-0.5 text-[10px] font-black uppercase italic z-20 transform -skew-x-12 shadow-[4px_4px_0px_0px_#000]">
            <span className="transform skew-x-12 inline-block">Attention : {error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParallelogramInput;
