
import React from 'react';
import { GameButton } from '../components/GameButton';
import { ArrowLeft, ShoppingBag, Coins, PieChart, Lock } from 'lucide-react';
import { CoinIcon } from '../components/CoinIcon';

interface MinigameMenuProps {
  onBack: () => void;
  onPlayComparison: () => void;
  onPlayArcade: () => void;
}

export const MinigameMenu: React.FC<MinigameMenuProps> = ({ onBack, onPlayComparison, onPlayArcade }) => {
  return (
    <div className="min-h-screen bg-[#4c1d95] p-4 font-sans relative overflow-hidden flex flex-col">
      
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* Header */}
      <div className="relative z-10 flex items-center gap-4 mb-8">
        <button onClick={onBack} className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors">
            <ArrowLeft size={32} />
        </button>
        <div>
            <h1 className="text-4xl font-display font-bold text-white text-stroke-yellow drop-shadow-lg">Salón de Juegos</h1>
            <p className="text-purple-200 font-bold">¡Gana monedas extra!</p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full flex-1 content-center">
        
        {/* Game 1: ComparAhorro */}
        <button 
            onClick={onPlayComparison}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-6 shadow-[0_8px_0_#1e3a8a] hover:translate-y-1 hover:shadow-[0_4px_0_#1e3a8a] transition-all group border-4 border-white/20 text-left relative overflow-hidden"
        >
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                <ShoppingBag size={120} />
             </div>
             <div className="relative z-10">
                 <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <ShoppingBag className="text-white" size={32} />
                 </div>
                 <h3 className="text-2xl font-display font-bold text-white mb-2">ComparAhorro</h3>
                 <p className="text-blue-100 text-sm font-bold leading-tight mb-4">30 Niveles. Elige el mejor producto entre dos opciones.</p>
                 <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
                    <CoinIcon size={16} />
                    <span className="text-yellow-300 font-bold text-sm">+20 Monedas</span>
                 </div>
             </div>
        </button>

        {/* Game 2: Atrapa Monedas */}
        <button 
            onClick={onPlayArcade}
            className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 shadow-[0_8px_0_#9a3412] hover:translate-y-1 hover:shadow-[0_4px_0_#9a3412] transition-all group border-4 border-white/20 text-left relative overflow-hidden"
        >
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                <Coins size={120} />
             </div>
             <div className="relative z-10">
                 <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <CoinIcon size={32} />
                 </div>
                 <h3 className="text-2xl font-display font-bold text-white mb-2">Atrapa Monedas</h3>
                 <p className="text-orange-100 text-sm font-bold leading-tight mb-4">Mueve el cofre y atrapa todas las monedas que puedas.</p>
                 <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
                    <CoinIcon size={16} />
                    <span className="text-yellow-300 font-bold text-sm">Infinito</span>
                 </div>
             </div>
        </button>

        {/* Game 3: Presupuesto Blitz (Locked) */}
        <div className="bg-slate-700 rounded-3xl p-6 shadow-inner border-4 border-slate-600 text-left relative overflow-hidden opacity-80">
             <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 backdrop-blur-[2px]">
                <div className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full font-bold flex items-center gap-2 border border-slate-500">
                    <Lock size={16} /> En construcción
                </div>
             </div>
             <div className="relative z-10 opacity-50">
                 <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <PieChart className="text-white" size={32} />
                 </div>
                 <h3 className="text-2xl font-display font-bold text-white mb-2">Presupuesto Blitz</h3>
                 <p className="text-slate-300 text-sm font-bold leading-tight mb-4">Gestiona el dinero de una semana completa sin quedarte en cero.</p>
             </div>
        </div>

      </div>
    </div>
  );
};
