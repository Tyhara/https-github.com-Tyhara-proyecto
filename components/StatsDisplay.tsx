import React from 'react';
import { CoinIcon, HeartIcon, BrainIcon } from './Icons';

interface StatsDisplayProps {
  score: number;
  happiness: number;
  knowledge: number;
}

const StatItem: React.FC<{ icon: React.ReactNode, value: number, colorClass: string }> = ({ icon, value, colorClass }) => (
    <div className={`flex items-center gap-1.5 bg-black/40 rounded-full px-3 py-1.5 text-white text-lg font-bold border-2 ${colorClass}`}>
        {icon}
        <span>{value}</span>
    </div>
);

const StatsDisplay: React.FC<StatsDisplayProps> = ({ score, happiness, knowledge }) => {
  return (
    <div className="absolute top-0 left-0 right-0 w-full flex justify-center items-center p-3 gap-2 z-10">
        <StatItem icon={<CoinIcon className="w-6 h-6 text-yellow-300" />} value={score} colorClass="border-yellow-400/50" />
        <StatItem icon={<HeartIcon className="w-6 h-6 text-red-400" />} value={happiness} colorClass="border-red-400/50" />
        <StatItem icon={<BrainIcon className="w-6 h-6 text-purple-400" />} value={knowledge} colorClass="border-purple-400/50" />
    </div>
  );
};

export default StatsDisplay;
