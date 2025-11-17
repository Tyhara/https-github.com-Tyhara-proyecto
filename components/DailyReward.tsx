import React from 'react';
import { DAILY_REWARDS } from '../constants';
import { CoinIcon, GiftIcon, TreasureChestIcon } from './Icons';

interface DailyRewardProps {
  streak: number; // 1-7
  onClaim: () => void;
}

const DayCard: React.FC<{ day: number, reward: number, streak: number }> = ({ day, reward, streak }) => {
    const isClaimed = day < streak;
    const isCurrent = day === streak;
    const isFuture = day > streak;
    const isFinalDay = day === 7;

    return (
        <div className={`p-2 rounded-lg text-center transition-all duration-300
            ${isCurrent ? 'bg-yellow-400 text-blue-900 transform scale-110 shadow-lg' : ''}
            ${isClaimed ? 'bg-green-600 text-white opacity-80' : ''}
            ${isFuture ? 'bg-white/20 text-white' : ''}
        `}>
            <p className="text-xs font-bold">{['L', 'M', 'X', 'J', 'V', 'S', 'D'][day-1]}</p>
            <div className="my-1">
                {isFinalDay ? 
                    <TreasureChestIcon className="w-6 h-6 mx-auto" /> : 
                    <GiftIcon className={`w-6 h-6 mx-auto ${isCurrent ? '' : 'opacity-70'}`} />
                }
            </div>
            <p className="text-sm font-bold flex items-center justify-center gap-1">
                {reward} <CoinIcon className="w-3 h-3"/>
            </p>
        </div>
    )
}

const DailyReward: React.FC<DailyRewardProps> = ({ streak, onClaim }) => {
  const rewardAmount = DAILY_REWARDS[streak - 1] || 0;
  
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 text-center shadow-2xl w-full max-w-sm border-2 border-yellow-300">
        <h2 className="text-3xl font-black-custom text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
            ¡Premio Diario!
        </h2>
        <p className="mt-2 mb-4 text-white/90">
            {streak > 1 ? `¡Tienes una racha de ${streak} días! Reclama tu premio.` : '¡Bienvenido de vuelta! Aquí tienes tu premio por iniciar sesión hoy.'}
        </p>
        
        <div className="grid grid-cols-7 gap-2 my-6">
            {DAILY_REWARDS.map((reward, index) => (
                <DayCard key={index} day={index + 1} reward={reward} streak={streak} />
            ))}
        </div>

        <button
          onClick={onClaim}
          className="w-full bg-yellow-400 text-blue-950 font-bold text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-yellow-300"
        >
          Reclamar {rewardAmount} Monedas
        </button>
      </div>
    </div>
  );
};

export default DailyReward;