
import React from 'react';
import { audioManager } from '../services/audioService';

interface GameButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const GameButton: React.FC<GameButtonProps> = ({ 
  children, onClick, variant = 'primary', className = '', fullWidth = false, disabled = false
}) => {
  // Updated Base Styles: Thicker borders, specific shadows, rounded-xl
  let baseStyles = "relative font-display font-black text-xl uppercase tracking-wide px-6 py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center border-b-[6px] border-x-2 border-t-2";
  let colorStyles = "";
  
  switch (variant) {
    case 'primary': 
      // Yellow/Amber (Coin Theme)
      colorStyles = "bg-amber-400 hover:bg-amber-300 text-amber-900 border-amber-600 active:border-amber-700"; 
      break;
    case 'secondary': 
      // Blue (Ocean Theme)
      colorStyles = "bg-sky-500 hover:bg-sky-400 text-white border-sky-700 active:border-sky-800"; 
      break;
    case 'success': 
      // Green (Action/Correct)
      colorStyles = "bg-emerald-500 hover:bg-emerald-400 text-white border-emerald-700 active:border-emerald-800"; 
      break;
    case 'danger': 
      // Red (Cancel/Incorrect)
      colorStyles = "bg-rose-500 hover:bg-rose-400 text-white border-rose-700 active:border-rose-800"; 
      break;
  }

  if (disabled) {
    colorStyles = "bg-slate-300 text-slate-500 border-slate-400 cursor-not-allowed opacity-80 border-b-4";
  }

  const handleClick = () => {
    if (!disabled) {
        audioManager.playClick();
        onClick && onClick();
    }
  };

  return (
    <button 
      className={`${baseStyles} ${colorStyles} ${fullWidth ? "w-full" : ""} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
