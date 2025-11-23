
import React, { useState } from 'react';
import { ChildProfile, LevelData } from '../types';
import { MAPS, LEVELS, AVATARS } from '../data/gameData';
import { CoinIcon } from '../components/CoinIcon';
import { Heart, Flame, Menu, X, Share2, Map as MapIcon, Gamepad2, Sparkles, LogOut, Lock, Check, Music, Volume2, VolumeX, Star } from 'lucide-react';

interface LevelNodeProps {
  level: LevelData;
  index: number;
  profile: ChildProfile;
  colorClass: string;
  onSelect: (id: string) => void;
  isStart?: boolean;
  isFinal?: boolean;
  locked?: boolean;
}

const LevelNode: React.FC<LevelNodeProps> = ({ level, index, profile, colorClass, onSelect, isStart, isFinal, locked }) => {
  const isCompleted = profile.completedLevels.includes(level.id);
  const isNext = !locked && !isCompleted;

  return (
    <button 
        onClick={() => !locked && onSelect(level.id)}
        disabled={locked}
        className={`
            relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 outline-none
            ${locked ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : `${colorClass} cursor-pointer hover:scale-110`}
            ${isNext ? 'ring-4 ring-white ring-offset-2 ring-offset-sky-300 scale-110 z-10 animate-bounce-subtle' : ''}
        `}
    >
        {locked ? (
            <Lock size={20} />
        ) : isCompleted ? (
            <div className="bg-yellow-400 text-yellow-900 rounded-full p-1">
                <Check size={24} strokeWidth={3} />
            </div>
        ) : (
            <span className="font-black text-xl md:text-2xl">{index}</span>
        )}
        
        {isStart && <div className="absolute -bottom-6 text-[10px] font-black uppercase bg-white/90 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap text-slate-700">Inicio</div>}
        {isFinal && <div className="absolute -bottom-6 text-[10px] font-black uppercase bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">Meta</div>}
        
         {!locked && isCompleted && (
             <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
             </div>
        )}
    </button>
  );
};

interface ChildDashboardProps {
  profile: ChildProfile;
  rewardAvailable: boolean;
  onClaimReward: () => void;
  onShareGame: () => void;
  onSelectLevel: (levelId: string) => void;
  onOpenGenius: () => void;
  onOpenMinigames: () => void;
  onOpenMissions: () => void;
  onSwitchProfile: () => void;
  currentMapId: string;
  onSelectMap: (mapId: string) => void;
  musicEnabled: boolean;
  onToggleMusic: (enabled: boolean) => void;
  sfxEnabled: boolean;
  onToggleSfx: (enabled: boolean) => void;
}

export const ChildDashboard: React.FC<ChildDashboardProps> = ({ 
  profile, 
  rewardAvailable,
  onClaimReward,
  onShareGame,
  onSelectLevel, 
  onOpenGenius, 
  onOpenMinigames,
  onOpenMissions,
  onSwitchProfile,
  currentMapId,
  onSelectMap,
  musicEnabled,
  onToggleMusic,
  sfxEnabled,
  onToggleSfx
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const currentAvatar = AVATARS.find(a => a.id === profile.avatar) || AVATARS[0];
  const currentMap = MAPS.find(m => m.id === currentMapId) || MAPS[0];
  
  // Sort levels numerically to correct unlocking logic
  const mapLevels = LEVELS
    .filter(l => l.mapId === currentMapId)
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

  const isLevelLocked = (idx: number) => {
      if (idx === 0) return false; 
      const prevLevel = mapLevels[idx - 1];
      return !profile.completedLevels.includes(prevLevel.id);
  };

  let mapContainerClass = '';
  let pathColor = '';
  let nodeColor = '';
  let islandColor = '';
  let waterGradient = '';
  let decorationEmoji = '';

  switch (currentMap.theme) {
    case 'birthday':
      mapContainerClass = 'bg-[#38bdf8]';
      waterGradient = 'radial-gradient(circle at 50% 50%, #67e8f9, #06b6d4 10px, transparent 11px, transparent 20px)';
      pathColor = 'stroke-[#ca8a04]';
      nodeColor = 'bg-yellow-100 border-yellow-500 text-yellow-800';
      islandColor = '#bef264';
      decorationEmoji = '🦜';
      break;
    case 'halloween':
      mapContainerClass = 'bg-[#2e1065]';
      waterGradient = 'radial-gradient(circle at 50% 50%, #4c1d95, #1e1b4b 10px, transparent 11px, transparent 20px)';
      pathColor = 'stroke-[#f97316]';
      nodeColor = 'bg-purple-100 border-purple-600 text-purple-900';
      islandColor = '#1e293b';
      decorationEmoji = '🎃';
      break;
    case 'christmas':
      mapContainerClass = 'bg-[#bfdbfe]';
      waterGradient = 'radial-gradient(circle at 50% 50%, #dbeafe, #60a5fa 10px, transparent 11px, transparent 20px)';
      pathColor = 'stroke-[#dc2626]';
      nodeColor = 'bg-red-50 border-red-600 text-red-800';
      islandColor = '#f0f9ff';
      decorationEmoji = '🎄';
      break;
    case 'summer':
      mapContainerClass = 'bg-[#0ea5e9]';
      waterGradient = 'radial-gradient(circle at 50% 50%, #bae6fd, #38bdf8 10px, transparent 11px, transparent 20px)';
      pathColor = 'stroke-[#d97706]';
      nodeColor = 'bg-orange-50 border-orange-500 text-orange-800';
      islandColor = '#fde047';
      decorationEmoji = '☀️';
      break;
  }

  const totalCompleted = profile.completedLevels.length;
  let rankTitle = "Grumete";
  if (totalCompleted > 5) rankTitle = "Marinero";
  if (totalCompleted > 10) rankTitle = "Navegante";
  if (totalCompleted > 15) rankTitle = "Capitán";
  if (totalCompleted >= 20) rankTitle = "Leyenda";

  return (
    <div className={`fixed inset-0 ${mapContainerClass} font-sans flex flex-col overflow-hidden transition-colors duration-700`}>
      
      <div className="relative z-50 bg-white/95 backdrop-blur-xl px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex justify-between items-center border-b-4 border-black/5">
        <div className="flex items-center gap-3">
           <div className="relative group cursor-pointer" onClick={onSwitchProfile}>
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-sky-100 transition-transform group-hover:scale-105">
                 <img src={currentAvatar.image} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-brand-DEFAULT text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
                 {rankTitle}
              </div>
           </div>
           <div className="flex flex-col md:flex-row gap-1 md:gap-2">
               <div className="flex items-center gap-1.5 bg-orange-50 border-2 border-orange-200 px-2.5 py-1 rounded-xl shadow-sm">
                  <Flame size={18} className="text-orange-500 fill-orange-500 animate-pulse" />
                  <span className="font-black text-orange-700 text-sm">{profile.dailyStreak}</span>
               </div>
               <div className="flex items-center gap-1.5 bg-yellow-50 border-2 border-yellow-200 px-2.5 py-1 rounded-xl shadow-sm">
                  <CoinIcon size={18} />
                  <span className="font-black text-yellow-700 text-sm">{profile.stats.coins}</span>
               </div>
               <div className="flex items-center gap-1.5 bg-pink-50 border-2 border-pink-200 px-2.5 py-1 rounded-xl shadow-sm">
                  <Heart size={18} className="text-pink-500 fill-pink-500" />
                  <span className="font-black text-pink-700 text-sm">{profile.stats.happiness}%</span>
               </div>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <button 
             onClick={onShareGame}
             className="bg-sky-400 hover:bg-sky-300 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-[0_4px_0_#0369a1] active:translate-y-1 active:shadow-none active:bg-sky-600 transition-all"
           >
             <Share2 size={16} /> 
             <span className="hidden md:inline">Compartir +20</span>
           </button>
           <button 
             onClick={() => setIsMenuOpen(true)}
             className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-xl shadow-[0_4px_0_#0f172a] active:translate-y-1 active:shadow-none transition-all"
           >
             <Menu size={24} />
           </button>
        </div>
      </div>

      {/* TABS */}
      <div className="relative z-40 flex justify-center gap-3 pt-6 px-2 pb-4 overflow-x-auto scrollbar-hide">
         {MAPS.map(map => {
            const isUnlocked = profile.unlockedMaps.includes(map.id);
            const isActive = currentMapId === map.id;
            let activeColor = "bg-slate-400";
            if(map.theme === 'birthday') activeColor = "bg-emerald-500 border-emerald-700";
            if(map.theme === 'halloween') activeColor = "bg-purple-600 border-purple-800";
            if(map.theme === 'christmas') activeColor = "bg-rose-500 border-rose-700";
            if(map.theme === 'summer') activeColor = "bg-yellow-400 border-yellow-600 text-yellow-900";

            return (
               <button
                 key={map.id}
                 onClick={() => isUnlocked && onSelectMap(map.id)}
                 disabled={!isUnlocked}
                 className={`
                    px-4 py-2 rounded-2xl font-black text-xs md:text-sm flex items-center gap-2 transition-all shrink-0
                    ${isActive 
                        ? `${activeColor} text-white shadow-[0_4px_0_rgba(0,0,0,0.2)] scale-110 z-10 border-b-4` 
                        : isUnlocked 
                            ? "bg-white text-slate-500 border-2 border-transparent hover:bg-slate-50" 
                            : "bg-black/20 text-white/50 border-2 border-transparent cursor-not-allowed"
                    }
                 `}
               >
                 {!isUnlocked && <Lock size={12} />}
                 {map.name.split(' ')[0]} 
               </button>
            )
         })}
      </div>

      {/* MAP */}
      <div className="flex-1 relative w-full h-full overflow-hidden flex items-center justify-center p-4 pb-24">
         <div className="absolute inset-0 opacity-40 animate-pulse-slow" style={{ background: waterGradient }}></div>
         <div className="absolute top-1/4 left-10 text-5xl animate-float delay-700 opacity-90 drop-shadow-lg">{decorationEmoji}</div>
         <div className="absolute bottom-1/3 right-10 text-5xl animate-float delay-100 opacity-90 drop-shadow-lg">{currentMap.theme === 'summer' ? '🏖️' : decorationEmoji}</div>

         <div className="relative w-full max-w-md aspect-[3/4] drop-shadow-2xl transition-transform duration-500">
            <svg viewBox="0 0 300 400" className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="islandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={islandColor} />
                        <stop offset="100%" stopColor={islandColor} stopOpacity="0.8" />
                    </linearGradient>
                </defs>
                <path d="M 30 100 Q 10 200 40 300 Q 100 380 200 350 Q 290 320 270 200 Q 250 50 150 30 Q 50 20 30 100 Z" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="12" />
                <path d="M 30 100 Q 10 200 40 300 Q 100 380 200 350 Q 290 320 270 200 Q 250 50 150 30 Q 50 20 30 100 Z" fill={islandColor} stroke="none" className="drop-shadow-inner" />
                <path d="M 70 330 C 100 330, 100 280, 80 250 C 60 220, 100 200, 150 220 C 200 240, 220 280, 250 250 C 280 220, 200 180, 220 150 C 240 120, 180 100, 150 120 C 120 140, 80 100, 150 80" fill="none" className={`${pathColor} stroke-dashed`} strokeWidth="14" strokeLinecap="round" strokeDasharray="20 15" filter="drop-shadow(0px 2px 0px rgba(0,0,0,0.1))" />
            </svg>

            {mapLevels.length >= 7 && (
               <>
                <div className="absolute bottom-[15%] left-[18%]">
                    <LevelNode level={mapLevels[0]} index={1} profile={profile} colorClass={nodeColor} onSelect={onSelectLevel} isStart locked={isLevelLocked(0)} />
                </div>
                <div className="absolute bottom-[35%] left-[22%]">
                    <LevelNode level={mapLevels[1]} index={2} profile={profile} colorClass={nodeColor} onSelect={onSelectLevel} locked={isLevelLocked(1)} />
                </div>
                <div className="absolute bottom-[45%] left-[12%]">
                    <LevelNode level={mapLevels[2]} index={3} profile={profile} colorClass={nodeColor} onSelect={onSelectLevel} locked={isLevelLocked(2)} />
                </div>
                <div className="absolute top-[45%] left-[45%]">
                    <LevelNode level={mapLevels[3]} index={4} profile={profile} colorClass={nodeColor} onSelect={onSelectLevel} locked={isLevelLocked(3)} />
                </div>
                <div className="absolute bottom-[35%] right-[15%]">
                    <LevelNode level={mapLevels[4]} index={5} profile={profile} colorClass={nodeColor} onSelect={onSelectLevel} locked={isLevelLocked(4)} />
                </div>
                <div className="absolute top-[35%] right-[20%]">
                    <LevelNode level={mapLevels[5]} index={6} profile={profile} colorClass={nodeColor} onSelect={onSelectLevel} locked={isLevelLocked(5)} />
                </div>
                <div className="absolute top-[15%] left-[45%]">
                    <LevelNode level={mapLevels[6]} index={7} profile={profile} colorClass={nodeColor} onSelect={onSelectLevel} isFinal locked={isLevelLocked(6)} />
                </div>
               </>
            )}
         </div>
      </div>

      {/* SIDE MENU - REORDERED */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end font-sans">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
           
           <div className="relative bg-white w-80 h-full shadow-2xl p-6 animate-in slide-in-from-right flex flex-col gap-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-2">
                  <h2 className="font-display font-black text-2xl text-slate-800">Menú</h2>
                  <button onClick={() => setIsMenuOpen(false)} className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-500 transition-colors">
                      <X size={24} />
                  </button>
              </div>

              {/* 1. Mapa de Misiones */}
              <button onClick={() => { setIsMenuOpen(false); onOpenMissions(); }} className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-4 rounded-2xl flex items-center gap-3 font-bold transition-colors active:scale-95">
                  <MapIcon size={20} className="text-slate-500" /> 
                  <span>Mapa de Misiones</span>
              </button>

              {/* 2. Minijuegos */}
              <button onClick={() => { setIsMenuOpen(false); onOpenMinigames(); }} className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-2xl shadow-lg flex items-center gap-3 font-bold active:scale-95 transition-transform group">
                  <div className="bg-white/20 p-2 rounded-xl">
                      <Gamepad2 size={24} />
                  </div>
                  <div className="text-left">
                      <div className="text-xs opacity-80 uppercase tracking-wider">Arcade</div>
                      <div className="text-lg leading-none">Minijuegos</div>
                  </div>
              </button>

              {/* 3. Genio Financiero */}
              <button onClick={() => { setIsMenuOpen(false); onOpenGenius(); }} className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-2xl shadow-lg flex items-center gap-3 font-bold active:scale-95 transition-transform group">
                  <div className="bg-white/20 p-2 rounded-xl">
                      <Sparkles size={24} className="text-yellow-300 animate-pulse" />
                  </div>
                  <div className="text-left">
                      <div className="text-xs opacity-80 uppercase tracking-wider">Asistente Mágico</div>
                      <div className="text-lg leading-none">Genio Financiero</div>
                  </div>
              </button>

              <div className="h-px bg-slate-100 my-2"></div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Configuración</h3>

              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600 font-bold">
                     {musicEnabled ? <Music size={20} className="text-sky-500" /> : <VolumeX size={20} className="text-slate-400" />} 
                     <span>Música</span>
                  </div>
                  <button 
                      onClick={() => onToggleMusic(!musicEnabled)}
                      className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${musicEnabled ? 'bg-sky-500' : 'bg-slate-300'}`}
                  >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${musicEnabled ? 'translate-x-5' : ''}`}></div>
                  </button>
              </div>

              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-100">
                   <div className="flex items-center gap-2 text-slate-600 font-bold">
                     {sfxEnabled ? <Volume2 size={20} className="text-sky-500" /> : <VolumeX size={20} className="text-slate-400" />}
                     <span>Efectos</span>
                   </div>
                   <button 
                       onClick={() => onToggleSfx(!sfxEnabled)}
                       className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${sfxEnabled ? 'bg-sky-500' : 'bg-slate-300'}`}
                   >
                       <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${sfxEnabled ? 'translate-x-5' : ''}`}></div>
                   </button>
              </div>

              <button onClick={onSwitchProfile} className="mt-auto border-2 border-slate-200 text-slate-500 font-bold p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-slate-800 transition-colors">
                   <LogOut size={20} /> Salir al Menú Principal
              </button>
           </div>
        </div>
      )}

      {/* DAILY REWARD MODAL */}
      {rewardAvailable && (
          <div className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full animate-bounce-in relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300"></div>
                 
                 <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-slow shadow-inner">
                    <CoinIcon size={56} />
                 </div>
                 
                 <h2 className="text-3xl font-display font-black text-slate-800 mb-2">¡Recompensa Diaria!</h2>
                 <p className="text-slate-500 font-bold mb-6">Por volver a jugar hoy</p>
                 
                 <div className="flex justify-center items-center gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase">Racha</span>
                        <div className="flex items-center gap-1 text-orange-500 font-black text-xl">
                            <Flame size={20} fill="currentColor" /> {profile.dailyStreak} días
                        </div>
                    </div>
                    <div className="w-px h-10 bg-slate-200"></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase">Premio</span>
                        <div className="flex items-center gap-1 text-yellow-600 font-black text-xl">
                            +{50 + (profile.dailyStreak * 10)} <CoinIcon size={20} />
                        </div>
                    </div>
                 </div>

                 <div className="w-full">
                    <button 
                        onClick={onClaimReward} 
                        className="w-full bg-amber-400 hover:bg-amber-300 text-amber-900 border-b-[6px] border-amber-600 active:border-amber-700 active:translate-y-1 active:border-b-0 font-display font-black text-xl uppercase tracking-wide px-6 py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center"
                    >
                        ¡Reclamar Monedas!
                    </button>
                 </div>
             </div>
          </div>
      )}

    </div>
  );
};
