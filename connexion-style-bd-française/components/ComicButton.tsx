import React from 'react';

interface ComicButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ComicButton: React.FC<ComicButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  type = 'button' 
}) => {
  const baseStyles = "px-6 py-3 font-bold transition-all active:translate-y-1 active:translate-x-1 uppercase tracking-wider text-sm lg:text-base flex items-center justify-center gap-2";
  
  const variants = {
    // Primary: Black background, White text (Rule #4)
    primary: "bg-[#000000] text-[#FFFFFF] border-2 border-white shadow-[6px_6px_0px_0px_#FFFFFF] hover:shadow-[3px_3px_0px_0px_#FFFFFF] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none",
    // Secondary: White background, Black text (Rule #4)
    secondary: "bg-[#FFFFFF] text-[#000000] border-2 border-black shadow-[6px_6px_0px_0px_#000000] hover:shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ComicButton;