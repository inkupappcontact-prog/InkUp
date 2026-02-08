import React from 'react';

const InkUpLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <img 
        src="/logo-inkup.jpg" 
        className="w-48 h-48 lg:w-72 lg:h-72 transition-transform duration-300 hover:scale-105" 
        alt="InkUp Logo" 
      />
    </div>
  );
};

export default InkUpLogo;
