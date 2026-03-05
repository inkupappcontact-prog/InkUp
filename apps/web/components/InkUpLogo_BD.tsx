import React from 'react';

const InkUpLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg 
        width="300" 
        height="300" 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Définition du Stylet (Corps + Pointe) */}
          <g id="pencil-shape">
             {/* Corps du crayon */}
             <rect x="-18" y="0" width="36" height="170" rx="2" />
             {/* Pointe du crayon */}
             <path d="M-18 0 L18 0 L0 -55 Z" />
          </g>
          
          {/* Définition du Parallélogramme Noir */}
          <path id="box-shape" d="M80 200 L340 200 L380 90 L120 90 Z" />
        </defs>

        {/* COUCHE OMBRE (Bleu, décalée de 12px) */}
        <g transform="translate(12, 12)" opacity="0.2">
           <use href="#box-shape" fill="#2563EB" />
           {/* Position de l'ombre du stylet synchronisée à y=80 */}
           <g transform="translate(235, 80) rotate(15)">
             <use href="#pencil-shape" fill="#2563EB" />
           </g>
           <text 
            x="200" 
            y="340" 
            textAnchor="middle"
            fontFamily="'Comic Neue', cursive" 
            fontWeight="900" 
            fontStyle="italic" 
            fontSize="100" 
            fill="#2563EB"
            letterSpacing="-0.03em"
          >
            InkUp
          </text>
        </g>

        {/* COUCHE PRINCIPALE */}
        
        {/* 1. Le Parallélogramme Noir de fond */}
        <use href="#box-shape" fill="black" />
        
        {/* 2. Le Stylet (Remonté à y=80) */}
        <g transform="translate(235, 80) rotate(15)">
           {/* Corps Bleu */}
           <rect x="-18" y="0" width="36" height="170" rx="2" fill="#2563EB" />
           {/* Pointe Noire (Le triangle) */}
           <path d="M-18 0 L18 0 L0 -55 Z" fill="black" />
        </g>

        {/* 3. Texte InkUp (Ink en noir, Up en bleu) */}
        <text 
            x="200" 
            y="330" 
            textAnchor="middle"
            fontFamily="'Comic Neue', cursive" 
            fontWeight="900" 
            fontStyle="italic" 
            fontSize="100" 
            letterSpacing="-0.03em"
        >
            <tspan fill="black">Ink</tspan>
            <tspan fill="#2563EB">Up</tspan>
        </text>

      </svg>
    </div>
  );
};

export default InkUpLogo;
