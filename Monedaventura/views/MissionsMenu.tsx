
import React from 'react';
import { ChildProfile } from '../types';
import { MAPS, LEVELS } from '../data/gameData';
import { ArrowLeft, Lock, CheckCircle, Map as MapIcon, Star } from 'lucide-react';

interface MissionsMenuProps {
  profile: ChildProfile;
  onBack: () => void;
  onSelectMap: (mapId: string) => void;
}

export const MissionsMenu: React.FC<MissionsMenuProps> = ({ profile, onBack, onSelectMap }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] p-4 font-sans relative overflow-hidden flex flex-col">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900 via-slate-900 to-black opacity-80"></div>
      
      {/* Header */}
      <div className="relative z-10 flex items-center gap-4 mb-8 pt-4">
        <button onClick={onBack} className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors">
            <ArrowLeft size={32} />
        </button>
        <div>
            <h1 className="text-4xl font-display font-bold text-white text-stroke-yellow drop-shadow-lg">Mapa de Misiones</h1>
            <p className="text-sky-200 font-bold">Elige tu próxima aventura</p>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full flex-1 content-center relative z-10 pb-10 overflow-y-auto">
        
        {MAPS.map((map) => {
            const isLocked = !profile.unlockedMaps.includes(map.id);
            const mapLevels = LEVELS.filter(l => l.mapId === map.id);
            const completedCount = profile.completedLevels.filter(lvlId => mapLevels.find(l => l.id === lvlId)).length;
            const progress = Math.round((completedCount / mapLevels.length) * 100);
            const isComplete = progress === 100;

            // Theme Colors
            let themeColor = '';
            let icon = '';
            switch(map.theme) {
                case 'birthday': themeColor = 'from-green-400 to-emerald-600'; icon = '🎂'; break;
                case 'halloween': themeColor = 'from-orange-500 to-purple-700'; icon = '🎃'; break;
                case 'christmas': themeColor = 'from-red-500 to-green-700'; icon = '🎄'; break;
                case 'summer': themeColor = 'from-yellow-400 to-orange-500'; icon = '☀️'; break;
            }

            return (
                <button 
                    key={map.id}
                    onClick={() => !isLocked && onSelectMap(map.id)}
                    disabled={isLocked}
                    className={`
                        relative rounded-3xl p-1 transition-all duration-300 group text-left h-full min-h-[280px]
                        ${isLocked ? 'opacity-70 grayscale cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl cursor-pointer'}
                    `}
                >
                    {/* Card Border Gradient */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${themeColor} opacity-80 blur-sm group-hover:blur-md transition-all`}></div>
                    
                    {/* Card Content */}
                    <div className="relative bg-slate-800 h-full rounded-[1.4rem] p-6 flex flex-col border border-white/10 overflow-hidden">
                        
                        {/* Background Icon Faded */}
                        <div className="absolute -right-4 -bottom-4 text-9xl opacity-10 group-hover:opacity-20 transition-opacity grayscale-0">
                            {icon}
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner bg-gradient-to-br ${themeColor}`}>
                                {icon}
                            </div>
                            {isLocked ? (
                                <div className="bg-black/40 text-slate-400 p-2 rounded-full">
                                    <Lock size={24} />
                                </div>
                            ) : isComplete ? (
                                <div className="bg-green-500 text-white p-2 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]">
                                    <CheckCircle size={24} />
                                </div>
                            ) : (
                                <div className="bg-white/10 text-white p-2 rounded-full">
                                    <MapIcon size={24} />
                                </div>
                            )}
                        </div>

                        <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight">{map.name}</h3>
                        <p className="text-slate-300 text-sm font-medium mb-6 min-h-[40px]">{map.description}</p>

                        <div className="mt-auto">
                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">
                                <span>Progreso</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-1000 ${isLocked ? 'bg-slate-600' : `bg-gradient-to-r ${themeColor}`}`} 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            {!isLocked && (
                                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white/50">
                                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                    <span>{completedCount}/{mapLevels.length} Niveles</span>
                                </div>
                            )}
                        </div>

                        {isLocked && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                                <div className="bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-2 text-slate-300 font-bold text-sm shadow-xl">
                                    <Lock size={16} /> Completar Anterior
                                </div>
                            </div>
                        )}
                    </div>
                </button>
            );
        })}

      </div>
    </div>
  );
};
