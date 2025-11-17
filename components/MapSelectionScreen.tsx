import React from 'react';
import { PlayerProgress } from '../types';
import { ADVENTURE_MAPS } from '../constants';
import { LockClosedIcon, CheckCircleIcon } from './Icons';

interface MapSelectionScreenProps {
    playerProgress: PlayerProgress;
    onSelectMap: (mapId: string) => void;
}

const MapSelectionScreen: React.FC<MapSelectionScreenProps> = ({ playerProgress, onSelectMap }) => {
    
    const isMapComplete = (mapId: string): boolean => {
        const mapData = ADVENTURE_MAPS.find(m => m.id === mapId);
        const mapProgress = playerProgress.progressByMap[mapId];
        if (!mapData || !mapProgress) return false;
        return mapProgress.level >= mapData.levels.length;
    };

    return (
        <div className="w-full h-full bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col p-4 sm:p-6 justify-center">
            <div className="text-center mb-6 flex-shrink-0">
                 <h1 className="text-4xl font-fredoka text-white drop-shadow-lg">Mundos de Aventura</h1>
                 <p className="text-lg text-yellow-200 drop-shadow-md mt-1">
                    Elige tu próxima gran aventura.
                </p>
            </div>
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ADVENTURE_MAPS.map((map, index) => {
                        const progress = playerProgress.progressByMap[map.id];
                        const isUnlocked = index === 0 || (ADVENTURE_MAPS[index - 1] && isMapComplete(ADVENTURE_MAPS[index - 1].id));
                        const isComplete = isMapComplete(map.id);

                        return (
                            <button 
                                key={map.id}
                                disabled={!isUnlocked}
                                onClick={() => onSelectMap(map.id)}
                                className="w-full bg-cover bg-center rounded-2xl p-4 text-left shadow-lg border-4 border-transparent hover:border-yellow-300 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:border-transparent relative min-h-[200px] flex flex-col justify-end"
                                style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(${map.backgroundImage})` }}
                            >
                                {isComplete && (
                                    <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1 flex items-center gap-1 text-xs font-bold">
                                        <CheckCircleIcon className="w-4 h-4"/>
                                        <span>COMPLETADO</span>
                                    </div>
                                )}
                                {!isUnlocked && (
                                    <div className="absolute inset-0 bg-black/70 rounded-xl flex flex-col items-center justify-center p-2">
                                        <LockClosedIcon className="w-10 h-10 text-white/50 mb-2"/>
                                        <p className="font-bold text-center text-sm">{map.unlockRequirement}</p>
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-3xl font-fredoka drop-shadow-md">{map.name}</h3>
                                    <p className="mt-2 text-white/80">
                                        {isComplete ? `${map.levels.length}/${map.levels.length} Niveles Completados` : `Nivel Actual: ${(progress?.level || 0) + 1}/${map.levels.length}`}
                                    </p>
                                    <div className="w-full bg-black/50 rounded-full h-4 mt-3 overflow-hidden">
                                        <div 
                                            className="bg-gradient-to-r from-green-400 to-cyan-400 h-4 rounded-full transition-all duration-500" 
                                            style={{width: `${((progress?.level || 0) / map.levels.length) * 100}%`}}
                                        ></div>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default MapSelectionScreen;