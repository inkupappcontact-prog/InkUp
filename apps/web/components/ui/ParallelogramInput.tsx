import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ParallelogramInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  dark?: boolean;
  required?: boolean;
}

const ParallelogramInput: React.FC<ParallelogramInputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  dark = false,
  required,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const getInputType = () => {
    if (!isPassword) return type;
    return showPassword ? 'text' : 'password';
  };
  const inputType = getInputType();

  return (
    <div className="mb-6 group relative z-0">
      {/* Label style cartouche éditorial */}
      <div className="flex mb-[-2px] relative z-20">
        <div
          className={`
          transform -skew-x-12 border-2 border-[#FFD700] border-b-0 px-4 py-1.5
          transition-all duration-200
          ${isFocused ? 'bg-[#2563EB] -translate-y-0.5' : 'bg-black'}
        `}
        >
          <label className="transform skew-x-12 block text-white font-bold text-xs uppercase tracking-[0.25em] italic">
            {label}
          </label>
        </div>
      </div>

      {/* Cadre principal de l'entrée */}
      <div className="relative">
        <div
          className={`
          transform -skew-x-12 border-[3px] h-14 flex items-center
          transition-all duration-150 ease-out
          ${isFocused ? 'border-[#2563EB] shadow-[4px_4px_0px_0px_#2563EB]' : 'border-[#FFD700] shadow-[4px_4px_0px_0px_#FFD700]'}
          ${error ? 'border-[#EA4335] shadow-[4px_4px_0px_0px_#EA4335]' : ''}
          ${dark ? 'bg-black' : 'bg-white'}
          relative overflow-hidden z-10
        `}
        >
          <input
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            className={`transform skew-x-12 w-full h-full px-8 py-2 focus:outline-none font-bold text-base bg-transparent tracking-tight ${dark ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'}`}
            style={{
              marginLeft: '-3%',
              width: isPassword ? '85%' : '106%',
              color: dark ? 'white' : 'black',
            }}
            aria-describedby={error ? `${label}-error` : undefined}
          />

          {/* Bouton pour afficher/masquer le mot de passe */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 h-10 w-12 flex items-center justify-center transition-colors group/btn"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              aria-pressed={showPassword}
            >
              <div
                className={`
                absolute inset-0 transform bg-[#2563EB] border border-white/30 transition-colors
                group-hover/btn:bg-[#1d4ed8]
              `}
              ></div>
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
          <div
            id={`${label}-error`}
            className="absolute -right-2 -bottom-5 bg-[#EA4335] border-2 border-black text-white px-3 py-0.5 text-[10px] font-black uppercase italic z-20 transform -skew-x-12 shadow-[4px_4px_0px_0px_#000]"
            role="alert"
          >
            <span className="transform skew-x-12 inline-block">Attention : {error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParallelogramInput;
