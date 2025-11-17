import React, { useState, useEffect, useMemo } from 'react';
import { CoinIcon, GameControllerIcon, ClipboardListIcon, StarIcon, ScaleIcon, TreasureChestIcon, HeartIcon } from './Icons';
import CoinCatcherGame from './CoinCatcherGame';
import ComparAhorroGame from './ComparAhorroGame';
import { BUDGET_BLITZ_CHALLENGES, BUDGET_BLITZ_CHALLENGES_INTERMEDIATE, BUDGET_BLITZ_CHALLENGES_ADVANCED } from '../constants';

interface BonusScreenProps {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    currentUserGrade: string;
}

const BudgetBlitz: React.FC<Pick<BonusScreenProps, 'score' | 'setScore'> & { currentUserGrade: string }> = ({ score, setScore, currentUserGrade }) => {
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'dayResult' | 'finished'>('intro');
    const [dayIndex, setDayIndex] = useState(0);
    const [budget, setBudget] = useState(100);
    const [happiness, setHappiness] = useState(50);
    const [dayResult, setDayResult] = useState<{ message: string; budgetChange: number; happinessChange: number } | null>(null);

    const challenges = useMemo(() => {
        const gradeNum = parseInt(currentUserGrade.charAt(0)) || 2;
        if (gradeNum <= 3) return BUDGET_BLITZ_CHALLENGES;
        if (gradeNum <= 5) return BUDGET_BLITZ_CHALLENGES_INTERMEDIATE;
        return BUDGET_BLITZ_CHALLENGES_ADVANCED;
    }, [currentUserGrade]);

    useEffect(() => {
        const gradeNum = parseInt(currentUserGrade.charAt(0)) || 2;
        if (gradeNum <= 3) setBudget(100);
        else if (gradeNum <= 5) setBudget(150);
        else setBudget(250);
    }, [currentUserGrade, gameState]);


    const handleChoice = (choice: { text: string; budgetChange: number; happinessChange: number; message: string }) => {
        if (budget + choice.budgetChange < 0) {
            setDayResult({
                message: '¡Oh no! No tienes suficientes monedas para esta opción. Elige otra.',
                budgetChange: 0,
                happinessChange: -5,
            });
            setGameState('dayResult');
            return;
        }

        setBudget(prev => prev + choice.budgetChange);
        setHappiness(prev => Math.max(0, Math.min(100, prev + choice.happinessChange)));
        setDayResult(choice);
        setGameState('dayResult');
    };

    const handleNextDay = () => {
        if (dayIndex < challenges.length - 1) {
            setDayIndex(prev => prev + 1);
            setGameState('playing');
        } else {
            const reward = Math.round(budget * 0.5) + Math.round(happiness * 0.2);
            if (reward > 0) {
                 setScore(prev => prev + reward);
            }
            setGameState('finished');
        }
        setDayResult(null);
    };

    const restartGame = () => {
        setGameState('intro');
        setDayIndex(0);
        setHappiness(50);
        setDayResult(null);
    };

    if (gameState === 'intro') {
        const initialBudget = challenges[0].scenario.match(/\d+/)?.[0] || 100;
        return (
            <div className="text-white p-4 h-full flex flex-col justify-center text-center items-center">
                <div className="max-w-md">
                    <img src="/imagenes/minijuego-presupuesto-blitz.png" alt="Presupuesto Blitz" className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4"/>
                    <h2 className="text-3xl font-bold font-fredoka mb-2">Presupuesto Blitz</h2>
                    <p className="mb-6 text-white/80">Tienes 7 días para demostrar que eres un héroe del ahorro. Administra {initialBudget} monedas, compra lo necesario y ahorra para tus metas. ¡Cuida que no se acabe antes del domingo!</p>
                    <button onClick={() => setGameState('playing')} className="w-full bg-yellow-400 text-blue-950 font-bold text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
                        ¡Comenzar Desafío!
                    </button>
                </div>
            </div>
        );
    }
    
    if (gameState === 'finished') {
        const reward = Math.round(budget * 0.5) + Math.round(happiness * 0.2);
        
        return (
            <div className="text-white p-4 h-full flex flex-col justify-center text-center items-center">
                 <div className="max-w-md">
                    <StarIcon className="w-20 h-20 mx-auto text-yellow-300 mb-4"/>
                    <h2 className="text-3xl font-bold font-fredoka mb-2">¡Desafío Completado!</h2>
                    <p className="text-lg mb-4">Terminaste la semana con <span className="font-bold text-yellow-300">{budget} monedas</span> y <span className="font-bold text-pink-400">{happiness}%</span> de felicidad.</p>
                    <p className="text-2xl font-bold text-green-400 mb-6">¡Ganas una recompensa de {reward > 0 ? reward : 0} monedas!</p>
                    <button onClick={restartGame} className="w-full bg-yellow-400 text-blue-950 font-bold text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
                        Jugar de Nuevo
                    </button>
                </div>
            </div>
        );
    }
    
    if(gameState === 'dayResult' && dayResult) {
        return (
             <div className="text-white p-4 h-full flex flex-col justify-center text-center items-center">
                 <div className="max-w-md">
                    <div className="bg-black/30 p-6 rounded-2xl">
                         <h2 className="text-2xl font-bold font-fredoka mb-2">{dayResult.budgetChange === 0 && dayResult.happinessChange > 0 ? "¡Buena Decisión!" : "Resultado del Día"}</h2>
                         <p className="text-white/90 mb-4">{dayResult.message}</p>
                         <div className="flex justify-center gap-4 text-lg">
                            <span className={`font-bold ${dayResult.budgetChange > 0 ? 'text-green-400' : (dayResult.budgetChange < 0 ? 'text-red-400' : '')}`}>{dayResult.budgetChange > 0 ? '+' : ''}{dayResult.budgetChange} <CoinIcon className="w-5 h-5 inline"/></span>
                            <span className={`font-bold ${dayResult.happinessChange > 0 ? 'text-green-400' : (dayResult.happinessChange < 0 ? 'text-red-400' : '')}`}>{dayResult.happinessChange > 0 ? '+' : ''}{dayResult.happinessChange} <HeartIcon className="w-5 h-5 inline"/></span>
                         </div>
                    </div>
                     <button onClick={handleNextDay} className="mt-6 w-full bg-emerald-500 text-white font-bold text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
                        Siguiente Día
                    </button>
                </div>
             </div>
        )
    }

    const currentChallenge = challenges[dayIndex];

    return (
        <div className="text-white p-4 h-full flex flex-col text-center">
            <div className="flex justify-between items-center bg-black/30 p-2 rounded-full mb-4">
                 <div className="flex items-center gap-2 text-xl font-bold text-yellow-300">
                    <CoinIcon className="w-6 h-6"/> {budget}
                 </div>
                 <h2 className="text-2xl font-bold font-fredoka">{currentChallenge.day}</h2>
                 <div className="flex items-center gap-2 text-xl font-bold text-pink-400">
                    <HeartIcon className="w-6 h-6"/> {happiness}
                 </div>
            </div>
            
            <div className="flex-grow flex flex-col justify-center">
                <div className="bg-white/10 p-4 rounded-lg mb-6">
                    <p className="italic">{currentChallenge.scenario}</p>
                </div>

                <div className="space-y-3">
                    {currentChallenge.choices.map((choice, index) => (
                        <button key={index} onClick={() => handleChoice(choice)} className="w-full text-left bg-white/20 p-4 rounded-lg hover:bg-white/30 transition-all disabled:opacity-50" disabled={budget + choice.budgetChange < 0}>
                            <h3 className="font-bold text-lg">{choice.text}</h3>
                            <p className="text-sm text-red-300 font-bold">{choice.budgetChange !== 0 ? `${choice.budgetChange} monedas` : 'Sin costo'}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

const BonusScreen: React.FC<BonusScreenProps> = ({ score, setScore, currentUserGrade }) => {
    const [activeGame, setActiveGame] = useState<'menu' | 'budget' | 'coinCatcher' | 'comparAhorro'>('menu');

    const renderGame = () => {
        switch (activeGame) {
            case 'budget':
                return <BudgetBlitz score={score} setScore={setScore} currentUserGrade={currentUserGrade} />;
            case 'coinCatcher':
                return <CoinCatcherGame setScore={setScore} currentUserGrade={currentUserGrade} />;
            case 'comparAhorro':
                return <ComparAhorroGame setScore={setScore} userGrade={currentUserGrade} />;
            default:
                return (
                     <div className="text-white p-4 h-full flex flex-col justify-center text-center">
                        <img src="/imagenes/logo-salon-minijuegos.png" alt="Salón de Minijuegos" className="w-24 h-24 mx-auto mb-4"/>
                        <h2 className="text-3xl font-bold mb-2 font-fredoka">Salón de Minijuegos</h2>
                        <p className="mb-8 text-white/80">¡Elige un juego para probar tus habilidades!</p>
                        
                        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                             <button onClick={() => setActiveGame('comparAhorro')} className="w-full text-left bg-blue-900/50 p-4 rounded-lg hover:bg-blue-900/70 transition-all">
                                <div className="flex items-center gap-4">
                                    <img src="/imagenes/minijuego-comparahorro.png" alt="ComparAhorro" className="w-12 h-12 rounded-lg object-cover flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-bold text-xl">ComparAhorro</h3>
                                        <p className="text-sm text-white/70">Compara objetos y elige la mejor opción.</p>
                                    </div>
                                </div>
                            </button>
                            <button onClick={() => setActiveGame('coinCatcher')} className="w-full text-left bg-blue-900/50 p-4 rounded-lg hover:bg-blue-900/70 transition-all">
                                <div className="flex items-center gap-4">
                                    <img src="/imagenes/minijuego-atrapa-monedas.png" alt="Atrapa Monedas" className="w-12 h-12 rounded-lg object-cover flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-bold text-xl">Atrapa Monedas</h3>
                                        <p className="text-sm text-white/70">¡Rápido! Atrapa las monedas que caen.</p>
                                    </div>
                                </div>
                            </button>
                             <button onClick={() => setActiveGame('budget')} className="w-full text-left bg-blue-900/50 p-4 rounded-lg hover:bg-blue-900/70 transition-all">
                                <div className="flex items-center gap-4">
                                    <img src="/imagenes/minijuego-presupuesto-blitz.png" alt="Presupuesto Blitz" className="w-12 h-12 rounded-lg object-cover flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-bold text-xl">Presupuesto Blitz</h3>
                                        <p className="text-sm text-white/70">Administra tu dinero durante una semana.</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                );
        }
    };
    
    return (
        <div className="bg-gradient-to-br from-purple-600 to-blue-700 h-full relative overflow-y-auto">
            {activeGame !== 'menu' && (
                <button 
                    onClick={() => setActiveGame('menu')} 
                    className="absolute top-4 left-4 bg-white/20 text-white font-bold px-3 py-1 rounded-full text-sm hover:bg-white/30 z-20"
                >
                    &larr; Volver
                </button>
            )}
            {renderGame()}
        </div>
    );
};

export default BonusScreen;