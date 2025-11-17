

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CoinIcon, TreasureChestIcon, StarIcon, LockClosedIcon, ArrowRightIcon } from './Icons';

interface Coin {
    id: number;
    x: number;
    y: number;
}

interface CoinCatcherGameProps {
    setScore: React.Dispatch<React.SetStateAction<number>>;
    currentUserGrade: string;
}

const LEVEL_CONFIGS = [
    { level: 1, speed: 3, spawnInterval: 500, duration: 30, goal: 15 },
    { level: 2, speed: 4, spawnInterval: 450, duration: 30, goal: 20 },
    { level: 3, speed: 5, spawnInterval: 400, duration: 30, goal: 25 },
    { level: 4, speed: 6, spawnInterval: 350, duration: 25, goal: 30 },
    { level: 5, speed: 7, spawnInterval: 300, duration: 20, goal: 35 },
];

const CoinCatcherGame: React.FC<CoinCatcherGameProps> = ({ setScore, currentUserGrade }) => {
    const [gameState, setGameState] = useState<'levelSelect' | 'playing' | 'finished'>('levelSelect');
    const [unlockedLevel, setUnlockedLevel] = useState(1);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [coins, setCoins] = useState<Coin[]>([]);
    const [dimensions, setDimensions] = useState({ width: 375, height: 600 });
    const [catcherX, setCatcherX] = useState(dimensions.width / 2);
    const [caughtCoins, setCaughtCoins] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [result, setResult] = useState<{ win: boolean, score: number } | null>(null);
    
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();
    const lastCoinTime = useRef(Date.now());
    
    const difficultyMultiplier = useMemo(() => {
        const gradeNum = parseInt(currentUserGrade.charAt(0)) || 2;
        if (currentUserGrade === 'Tutor') return 1.8;
        if (gradeNum <= 3) return 1.0;
        if (gradeNum <= 5) return 1.2;
        return 1.5;
    }, [currentUserGrade]);
    
    const adjustedLevelConfigs = useMemo(() => 
        LEVEL_CONFIGS.map(level => ({
            ...level,
            speed: level.speed * difficultyMultiplier,
            spawnInterval: Math.max(150, level.spawnInterval / difficultyMultiplier),
            goal: Math.ceil(level.goal * difficultyMultiplier),
        }))
    , [difficultyMultiplier]);


    useEffect(() => {
        const checkSize = () => {
            if (gameAreaRef.current) {
                const rect = gameAreaRef.current.getBoundingClientRect();
                setDimensions({ width: rect.width, height: rect.height });
            }
        };
        checkSize();
        // FIX: The ResizeObserver constructor expects a callback that accepts arguments. Wrapping `checkSize` in an anonymous function ensures compatibility.
        const resizeObserver = new ResizeObserver(() => checkSize());
        if (gameAreaRef.current) {
            resizeObserver.observe(gameAreaRef.current);
        }
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        setCatcherX(dimensions.width / 2);
    }, [dimensions.width]);

    const animate = () => {
        const config = adjustedLevelConfigs[currentLevel - 1];
        setCoins(prevCoins => {
            const now = Date.now();
            let newCoins = prevCoins.map(coin => ({ ...coin, y: coin.y + config.speed })).filter(coin => coin.y < dimensions.height);

            if (now - lastCoinTime.current > config.spawnInterval) {
                lastCoinTime.current = now;
                newCoins.push({
                    id: Date.now(),
                    x: Math.random() * (dimensions.width - 30),
                    y: -30
                });
            }

            const catcherRect = { x: catcherX - 35, y: dimensions.height - 60, width: 70, height: 40 };
            const caughtThisFrame: number[] = [];
            newCoins.forEach(coin => {
                if (
                    coin.x < catcherRect.x + catcherRect.width &&
                    coin.x + 30 > catcherRect.x &&
                    coin.y < catcherRect.y + catcherRect.height &&
                    coin.y + 30 > catcherRect.y
                ) {
                    setCaughtCoins(prev => prev + 1);
                    caughtThisFrame.push(coin.id);
                }
            });
            
            return newCoins.filter(coin => !caughtThisFrame.includes(coin.id));
        });
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (gameState === 'playing') {
            const config = adjustedLevelConfigs[currentLevel - 1];
            requestRef.current = requestAnimationFrame(animate);
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setGameState('finished');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => {
                if(requestRef.current) cancelAnimationFrame(requestRef.current);
                clearInterval(timer);
            };
        }
    }, [gameState, dimensions, currentLevel, adjustedLevelConfigs]);

    useEffect(() => {
        if (gameState === 'finished') {
            const config = adjustedLevelConfigs[currentLevel - 1];
            const win = caughtCoins >= config.goal;
            if (win) {
                setScore(prev => prev + caughtCoins);
                if(currentLevel === unlockedLevel) {
                    setUnlockedLevel(prev => Math.min(prev + 1, adjustedLevelConfigs.length));
                }
            }
            setResult({ win, score: caughtCoins });
        }
    }, [gameState, setScore, caughtCoins, currentLevel, unlockedLevel, adjustedLevelConfigs]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (gameAreaRef.current) {
            const rect = gameAreaRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setCatcherX(Math.max(35, Math.min(x, dimensions.width - 35)));
        }
    };
    
    const startGame = (level: number) => {
        setCoins([]);
        setCaughtCoins(0);
        setCurrentLevel(level);
        setTimeLeft(adjustedLevelConfigs[level - 1].duration);
        setResult(null);
        setGameState('playing');
    }
    
    const backToMenu = () => {
        setGameState('levelSelect');
        setResult(null);
    }

    if (gameState === 'levelSelect') {
        return (
            <div className="text-white p-4 h-full flex flex-col justify-center text-center">
                <img src="/imagenes/minijuego-atrapa-monedas.png" alt="Atrapa Monedas" className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4"/>
                <h2 className="text-3xl font-bold mb-2">Atrapa Monedas</h2>
                <p className="mb-6 text-white/80">Selecciona un nivel. ¡La dificultad aumenta!</p>
                <div className="space-y-3">
                    {adjustedLevelConfigs.map(config => (
                        <button 
                            key={config.level} 
                            disabled={config.level > unlockedLevel}
                            onClick={() => startGame(config.level)}
                            className="w-full bg-blue-900/60 p-3 rounded-lg hover:bg-blue-800/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-lg">Nivel {config.level}</span>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-5 h-5 ${i < config.level ? 'text-yellow-400' : 'text-gray-500'}`} />)}
                                </div>
                            </div>
                            {config.level > unlockedLevel ? <LockClosedIcon className="w-6 h-6 text-gray-400"/> : <ArrowRightIcon className="w-6 h-6 text-green-400"/>}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
    
    if (gameState === 'finished' && result) {
        return (
             <div className="text-white p-4 h-full flex flex-col justify-center text-center">
                <TreasureChestIcon className="w-20 h-20 mx-auto text-yellow-300/80 mb-4"/>
                <h2 className={`text-3xl font-bold mb-2 ${result.win ? 'text-green-400' : 'text-red-400'}`}>
                    {result.win ? `¡Nivel ${currentLevel} Superado!` : `Nivel ${currentLevel} Fallido`}
                </h2>
                <p className="mb-6 text-white/80 text-2xl">
                    Atrapaste <span className="text-yellow-300 font-bold">{result.score}</span> / {adjustedLevelConfigs[currentLevel-1].goal} monedas.
                </p>
                {result.win && <p className="text-lg mb-6">¡Se han añadido {result.score} monedas a tu puntaje!</p>}
                
                <div className="space-y-3">
                    {result.win && currentLevel < adjustedLevelConfigs.length && unlockedLevel > currentLevel && (
                         <button onClick={() => startGame(currentLevel + 1)} className="w-full bg-emerald-500 text-white font-bold text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
                            Siguiente Nivel
                        </button>
                    )}
                    <button onClick={() => startGame(currentLevel)} className="w-full bg-yellow-400 text-blue-950 font-bold text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
                        Jugar de Nuevo
                    </button>
                     <button onClick={backToMenu} className="w-full bg-blue-600 text-white font-bold text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
                        Volver al Menú
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div 
            ref={gameAreaRef}
            onMouseMove={handleMouseMove}
            className="w-full h-full cursor-none relative overflow-hidden bg-gradient-to-b from-sky-400 to-green-400"
        >
            <div className="absolute top-2 left-2 bg-black/30 text-white p-2 rounded-lg font-bold">Tiempo: {timeLeft}s</div>
            <div className="absolute top-2 right-2 bg-black/30 text-white p-2 rounded-lg font-bold">Puntos: {caughtCoins} / {adjustedLevelConfigs[currentLevel-1].goal}</div>

            {coins.map(coin => (
                <div key={coin.id} style={{ position: 'absolute', left: coin.x, top: coin.y }}>
                    <img src="/imagenes/moneda.png" alt="Moneda" className="w-8 h-8" />
                </div>
            ))}
            
            <div className="absolute bottom-5" style={{ left: catcherX, transform: 'translateX(-50%)' }}>
                <img src="/imagenes/cofre.png" alt="Atrapa monedas" className="w-24 h-auto" />
            </div>
        </div>
    );
};

export default CoinCatcherGame;
