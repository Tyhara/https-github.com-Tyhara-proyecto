import React from 'react';

interface CoinIconProps {
  size?: number;
  className?: string;
}

export const CoinIcon: React.FC<CoinIconProps> = ({ size = 32, className = '' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`drop-shadow-md ${className}`}>
      <circle cx="50" cy="50" r="45" fill="#F59E0B" stroke="#D97706" strokeWidth="4"/>
      <circle cx="50" cy="50" r="35" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
      <path d="M60 20 Q 75 25 80 40" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round"/>
      <text x="50" y="68" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="800" fontSize="50" fill="#D97706">$</text>
    </svg>
  );
};