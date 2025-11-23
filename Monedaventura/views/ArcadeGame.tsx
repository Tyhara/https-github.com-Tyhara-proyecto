
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Zap, ChevronsUp, Bomb } from 'lucide-react';
import { CoinIcon } from '../components/CoinIcon';

interface ArcadeGameProps {
  onClose: () => void;
}

interface FallingItem {
  id: number;
  x: number; // 0-100%
  y: number; // px
  type: 'coin' | 'rock' | 'bomb';
}

type Difficulty = 1 | 2 | 3 | 4 | 5;

export const ArcadeGame: React.FC<ArcadeGameProps> = ({ onClose }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null); // Null = Select screen
  const [items, setItems] = useState<FallingItem[]>([]);
  const [playerX, setPlayerX] = useState(50); // 0-100%

  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const lastSpawnTime = useRef<number>(0);

  // Difficulty Configurations
  const difficultySettings = {
    1: { name: 'Paseo', speed: 3, spawnRate: 1000, badChance: 0.2, coinValue: 1, color: 'bg-green-500' },
    2: { name: 'Trote', speed: 5, spawnRate: 800, badChance: 0.3, coinValue: 2, color: 'bg-blue-500' },
    3: { name: 'Carrera', speed: 7, spawnRate: 600, badChance: 0.4, coinValue: 5, color: 'bg-orange-500' },
    4: { name: 'Turbo', speed: 10, spawnRate: 400, badChance: 0.5, coinValue: 10, color: 'bg-red-500' },
    5: { name: 'Sónico', speed: 15, spawnRate: 250, badChance: 0.6, coinValue: 25, color: 'bg-purple-600' },
  };

  // Game Loop
  const gameLoop = (time: number) => {
    if (!isPlaying || gameOver || !difficulty) return;

    const settings = difficultySettings[difficulty];

    // Spawn Logic
    if (time - lastSpawnTime.current > settings.spawnRate) { 
      const rand = Math.random();
      let type: 'coin' | 'rock' | 'bomb' = 'coin';
      
      // Logic for bad items
      if (rand < settings.badChance) {
          // 50/50 split between Bomb and Rock if it's a "bad" spawn
          type = Math.random() > 0.5 ? 'bomb' : 'rock';
      }

      const newItem: FallingItem = {
        id: time,
        x: Math.random() * 90 + 5, // 5% to 95%
        y: -50,
        type: type
      };
      setItems(prev => [...prev, newItem]);
      lastSpawnTime.current = time;
    }

    // Update Items & Collision
    setItems(prevItems => {
      const newItems: FallingItem[] = [];
      let scoreDelta = 0;
      
      // Calculate dynamic hitbox based on container height
      // The chest is roughly at bottom 10%, height approx 80px
      const containerHeight = containerRef.current?.clientHeight || 600;
      const hitBoxTop = containerHeight - 120; // Start detecting collision slightly above the visual chest
      const hitBoxBottom = containerHeight + 50; // Allow detection a bit below to ensure capture

      prevItems.forEach(item => {
        const nextY = item.y + settings.speed;
        let keep = true;

        // --- COLLISION LOGIC ---
        // Check vertical overlap
        if (nextY >= hitBoxTop && nextY <= hitBoxBottom) {
          // Check horizontal overlap
          // We use percentage for X. If chest is at 50%, catch between 35% and 65% (approx width of chest)
          // Increased tolerance from 12 to 15 to make catching "snappier"
          if (Math.abs(item.x - playerX) < 15) { 
             
             // HIT! Calculate score
             if (item.type === 'coin') {
               scoreDelta += settings.coinValue;
             } else if (item.type === 'bomb') {
               scoreDelta -= 1; 
             } else if (item.type === 'rock') {
               scoreDelta -= (settings.coinValue * 2); 
             }
             
             // IMPORTANT: Remove item immediately
             keep = false; 
          }
        }
        
        // Remove if off screen (fell past the bottom)
        if (nextY > containerHeight) keep = false;

        if (keep) {
          newItems.push({ ...item, y: nextY });
        }
      });

      // Update score safely
      if (scoreDelta !== 0) {
         setTimeout(() => {
             setScore(s => Math.max(0, s + scoreDelta));
         }, 0);
      }

      return newItems;
    });

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (isPlaying && !gameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
      const timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setGameOver(true);
            setIsPlaying(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, gameOver]);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
     if (!containerRef.current) return;
     const rect = containerRef.current.getBoundingClientRect();
     const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
     const relativeX = clientX - rect.left;
     // Clamp between 10% and 90% to keep chest mostly on screen
     const percent = Math.max(10, Math.min(90, (relativeX / rect.width) * 100));
     setPlayerX(percent);
  };

  return (
    <div className="fixed inset-0 bg-sky-300 z-50 overflow-hidden font-sans select-none touch-none">
      
      {/* HUD */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20 pointer-events-none">
         <div className="bg-white/80 backdrop-blur rounded-2xl p-2 px-4 shadow-lg flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase">Puntaje</span>
            <div className="flex items-center gap-2">
                <CoinIcon size={24} />
                <span className="text-2xl font-bold text-amber-600">{score}</span>
            </div>
         </div>
         
         {difficulty && (
             <div className={`px-4 py-1 rounded-full text-white font-bold shadow-md uppercase text-xs ${difficultySettings[difficulty].color}`}>
                Nivel: {difficultySettings[difficulty].name}
             </div>
         )}
         
         <div className="bg-white/80 backdrop-blur rounded-2xl p-2 px-4 shadow-lg">
            <span className="text-2xl font-bold text-slate-700">{timeLeft}s</span>
         </div>

         <button onClick={onClose} className="bg-red-500 text-white p-2 rounded-xl shadow-lg pointer-events-auto">
            <ArrowLeft />
         </button>
      </div>

      {/* Game Area */}
      <div 
        ref={containerRef}
        className="w-full h-full relative cursor-ew-resize"
        onMouseMove={isPlaying ? handleMove : undefined}
        onTouchMove={isPlaying ? handleMove : undefined}
      >
         {/* Background Scenery */}
         <div className="absolute bottom-0 w-full h-1/4 bg-green-500 border-t-8 border-green-600"></div>
         <div className="absolute top-20 left-10 opacity-50"><CoinIcon size={100} /></div>
         
         {/* Start / Difficulty Selection Screen */}
         {!isPlaying && !gameOver && !difficulty && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30 backdrop-blur-sm">
                 <div className="bg-white p-6 rounded-3xl shadow-2xl text-center max-w-md w-full mx-4 animate-bounce-in">
                     <h1 className="text-3xl font-display font-bold text-amber-500 mb-2">Atrapa Monedas</h1>
                     <p className="text-slate-500 font-bold mb-6 text-sm">Selecciona la velocidad</p>
                     
                     <div className="grid gap-3">
                        {([1, 2, 3, 4, 5] as Difficulty[]).map(lvl => (
                            <button
                                key={lvl}
                                onClick={() => setDifficulty(lvl)}
                                className={`p-3 rounded-xl flex items-center justify-between shadow-md hover:scale-105 transition-transform border-2 border-transparent hover:border-black/10 ${difficultySettings[lvl].color}`}
                            >
                                <span className="text-white font-bold uppercase">{difficultySettings[lvl].name}</span>
                                <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded text-white text-xs font-bold">
                                    <CoinIcon size={14} /> x{difficultySettings[lvl].coinValue}
                                </div>
                            </button>
                        ))}
                     </div>
                 </div>
             </div>
         )}

         {/* Instructions / Start Button (After Difficulty Selected) */}
         {!isPlaying && !gameOver && difficulty && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-30 backdrop-blur-sm">
                 <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 animate-bounce-in">
                    <h2 className="text-2xl font-bold text-slate-700 mb-4">Nivel: {difficultySettings[difficulty].name}</h2>
                     
                     <div className="flex justify-center gap-6 mb-6">
                         <div className="flex flex-col items-center">
                            <CoinIcon size={32} />
                            <span className="text-xs font-bold text-green-600 mt-1">+ Puntos</span>
                         </div>
                         <div className="flex flex-col items-center">
                            <span className="text-3xl">💣</span>
                            <span className="text-xs font-bold text-red-500 mt-1">-1 Moneda</span>
                         </div>
                     </div>

                     <button 
                        onClick={() => setIsPlaying(true)}
                        className="bg-green-500 hover:bg-green-400 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-[0_4px_0_#15803d] active:translate-y-1 active:shadow-none transition-all w-full"
                     >
                        ¡JUGAR!
                     </button>
                     <button onClick={() => setDifficulty(null)} className="mt-4 text-slate-400 font-bold text-sm underline">
                        Cambiar Dificultad
                     </button>
                 </div>
             </div>
         )}

         {/* Game Over Screen */}
         {gameOver && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30 backdrop-blur-sm">
                 <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 animate-bounce-in">
                     <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">¡Tiempo Agotado!</h1>
                     <div className="bg-amber-100 p-4 rounded-xl mb-6 border-2 border-amber-200">
                        <span className="block text-slate-500 text-sm font-bold uppercase">Monedas Conseguidas</span>
                        <span className="text-5xl font-bold text-amber-600">{score}</span>
                     </div>
                     <div className="flex flex-col gap-3">
                        <button 
                            onClick={() => {
                                setGameOver(false);
                                setTimeLeft(30);
                                setScore(0);
                                setItems([]);
                                setDifficulty(null); // Go back to selection
                            }}
                            className="bg-sky-500 hover:bg-sky-400 text-white text-lg font-bold py-3 px-6 rounded-xl shadow-[0_4px_0_#0369a1] w-full"
                        >
                            Volver al Menú
                        </button>
                     </div>
                 </div>
             </div>
         )}

         {/* Items */}
         {items.map(item => (
             <div 
                key={item.id}
                className="absolute transition-transform will-change-transform"
                style={{ 
                    left: `${item.x}%`, 
                    top: `${item.y}px`,
                    transform: 'translateX(-50%)'
                }}
             >
                 {item.type === 'coin' ? (
                     <div className="animate-spin-slow">
                        <CoinIcon size={40} />
                     </div>
                 ) : item.type === 'bomb' ? (
                     <div className="text-4xl animate-pulse drop-shadow-lg">💣</div>
                 ) : (
                     <div className="text-4xl drop-shadow-md">🪨</div>
                 )}
             </div>
         ))}

         {/* Player Chest */}
         <div 
            className="absolute bottom-[10%] transition-all duration-75 ease-out will-change-transform"
            style={{ left: `${playerX}%`, transform: 'translateX(-50%)' }}
         >
             <div className="w-24 h-20 bg-amber-800 rounded-lg border-4 border-amber-950 shadow-xl relative flex items-center justify-center">
                 <div className="w-6 h-8 bg-yellow-500 rounded border-2 border-yellow-700"></div>
                 {/* Open lid effect */}
                 <div className="absolute -top-4 w-24 h-6 bg-amber-700 rounded-t-full border-4 border-amber-950 border-b-0"></div>
             </div>
         </div>

      </div>
    </div>
  );
};
