import React from 'react';
import { AdventureMapData } from '../types';

interface AdventureMapProps {
    mapData: AdventureMapData;
    mapProgress: { level: number };
    onSelectLevel: (levelIndex: number) => void;
    onBackToSelection: () => void;
}

// Positions for 7 levels, can be reused by all maps
const levelPositions = [
    { top: '85%', left: '18%' },  // 1. Starts near the bottom-left beach
    { top: '68%', left: '33%' },  // 2. Moves up and inland
    { top: '50%', left: '20%' },  // 3. Climbs towards the western peak
    { top: '30%', left: '45%' },  // 4. Reaches the central volcano/mountain top
    { top: '48%', left: '72%' },  // 5. Descends towards the eastern side
    { top: '70%', left: '60%' },  // 6. Goes down towards a forest area
    { top: '85%', left: '82%' },  // 7. Ends at the treasure cave on the far right
];


const AdventureMap: React.FC<AdventureMapProps> = ({ mapData, mapProgress, onSelectLevel, onBackToSelection }) => {
    const backgroundImageUrl = mapData.backgroundImage;

    const renderLevelNode = (index: number) => {
        const positionStyle = levelPositions[index];
        if (!positionStyle) return null;

        const isCompleted = index < mapProgress.level;
        const isCurrent = index === mapProgress.level;
        const isLocked = index > mapProgress.level;

        return (
            <div key={`map-${index}`} 
                 className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                 style={positionStyle}
            >
                <button
                    onClick={() => onSelectLevel(index)}
                    disabled={isLocked}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 shadow-lg
                        ${isCurrent ? 'bg-yellow-400 border-white animate-pulse ring-4 ring-white/50' : ''}
                        ${isCompleted ? 'bg-green-500 border-green-200' : ''}
                        ${isLocked ? 'bg-gray-800/80 border-gray-900/90 cursor-not-allowed' : 'transform hover:scale-125'}
                    `}
                >
                    <span className={`font-bold text-2xl font-fredoka drop-shadow-md ${isLocked ? 'text-gray-500' : 'text-white'}`}>
                        {index + 1}
                    </span>
                </button>
            </div>
        )
    }
    
    return (
        <div className="w-full h-full bg-[#65c4e8] text-white flex flex-col overflow-hidden relative items-center justify-center">
             <button onClick={onBackToSelection} className="absolute top-4 left-4 bg-blue-800/80 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all z-20">
                &larr; Volver a Mundos
            </button>
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-blue-900/60 to-transparent z-10 text-center">
                <h1 className="text-2xl sm:text-4xl font-fredoka text-white drop-shadow-lg">{mapData.name}</h1>
            </div>
            <div className="w-full h-auto max-h-full p-4 flex items-center justify-center">
               <div className="relative w-full max-w-5xl aspect-video">
                    <div className="absolute inset-0 bg-cover bg-center rounded-lg overflow-hidden" style={{backgroundImage: `url(${backgroundImageUrl})`}}>
                        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5, pointerEvents: 'none' }}>
                            {levelPositions.slice(0, mapData.levels.length - 1).map((pos, index) => {
                                const nextPos = levelPositions[index + 1];
                                if (!nextPos) return null;

                                const isPathUnlocked = index < mapProgress.level;
                                const strokeColor = isPathUnlocked ? '#ffffff' : '#1e3a8a';

                                return (
                                    <line
                                        key={`line-${index}`}
                                        x1={pos.left}
                                        y1={pos.top}
                                        x2={nextPos.left}
                                        y2={nextPos.top}
                                        stroke={strokeColor}
                                        strokeWidth="5"
                                        strokeDasharray="10 8"
                                        strokeLinecap="round"
                                    />
                                );
                            })}
                        </svg>

                        {Array.from({ length: mapData.levels.length }).map((_, index) => renderLevelNode(index))}
                    </div>
               </div>
            </div>
        </div>
    );
};

export default AdventureMap;