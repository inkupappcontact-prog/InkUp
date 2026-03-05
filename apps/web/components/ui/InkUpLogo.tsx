import React from 'react';

const InkUpLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <img 
        src="/logo-inkup-new.jpg" 
        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105" 
        alt="InkUp Logo" 
      />
    </div>
  );
};

export default InkUpLogo;
