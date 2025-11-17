import React, { useState, useMemo } from 'react';
import { COMPARAHORRO_LEVELS_BEGINNER, COMPARAHORRO_LEVELS_INTERMEDIATE, COMPARAHORRO_LEVELS_ADVANCED } from '../constants';
import { ComparisonLevel, ComparisonObject } from '../types';
import { CoinIcon, StarIcon, CheckCircleIcon, LightbulbIcon, ArrowRightIcon } from './Icons';

interface ComparAhorroGameProps {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  userGrade: string;
}

const ObjectCard: React.FC<{ object: ComparisonObject, onSelect: () => void, disabled: boolean }> = ({ object, onSelect, disabled }) => (
  <button
    onClick={onSelect}
    disabled={disabled}
    className="bg-blue-900/40 p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70 flex flex-col justify-between items-center"
  >
    <img src={`/imagenes/${object.imageUrl || 'placeholder.png'}`} alt={object.name} className="w-24 h-24 object-contain mb-3" onError={(e) => { e.currentTarget.src = '/imagenes/placeholder.png'; }} />
    <h3 className="font-bold text-lg">{object.name}</h3>
    <div className="flex items-center justify-center gap-2 my-2">
      <div className="flex items-center gap-1 text-yellow-300">
        <CoinIcon className="w-5 h-5" />
        <span className="font-bold">{object.cost}</span>
      </div>
      <div className="flex items-center gap-1 text-blue-300">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`w-4 h-4 ${i < object.durability ? 'text-blue-400' : 'text-gray-500'}`} />
        ))}
      </div>
    </div>
  </button>
);

const ComparAhorroGame: React.FC<ComparAhorroGameProps> = ({ setScore, userGrade }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'feedback'>('menu');
  const [currentLevel, setCurrentLevel] = useState<ComparisonLevel | null>(null);
  const [feedback, setFeedback] = useState({ correct: false, text: '' });
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  
  const levels = useMemo(() => {
    const gradeNum = parseInt(userGrade) || 2;
    if (gradeNum <= 3) return COMPARAHORRO_LEVELS_BEGINNER;
    if (gradeNum <= 5) return COMPARAHORRO_LEVELS_INTERMEDIATE;
    return COMPARAHORRO_LEVELS_ADVANCED;
  }, [userGrade]);

  const handleSelectLevel = (level: ComparisonLevel) => {
    setCurrentLevel(level);
    setGameState('playing');
  };

  const handleChoice = (choiceIndex: number) => {
    if (!currentLevel) return;
    const isCorrect = choiceIndex === currentLevel.correctChoiceIndex;
    setFeedback({ correct: isCorrect, text: currentLevel.explanation });
    if (isCorrect) {
      setScore(prev => prev + currentLevel.reward);
      if (!completedLevels.includes(currentLevel.id)) {
          setCompletedLevels(prev => [...prev, currentLevel.id]);
      }
    }
    setGameState('feedback');
  };
  
  const handleNext = () => {
    setCurrentLevel(null);
    setGameState('menu');
  }

  if (gameState === 'playing' && currentLevel) {
    return (
      <div className="text-white p-4 h-full flex flex-col justify-center text-center">
        <h2 className="text-2xl font-bold mb-2">{currentLevel.title}</h2>
        <p className="mb-6 text-white/80 italic">{currentLevel.objective}</p>
        <div className={`grid ${currentLevel.objects.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
          {currentLevel.objects.map((obj, index) => (
            <ObjectCard key={index} object={obj} onSelect={() => handleChoice(index)} disabled={false} />
          ))}
        </div>
      </div>
    );
  }
  
  if (gameState === 'feedback' && currentLevel) {
    return (
        <div className="text-white p-4 h-full flex flex-col justify-center text-center items-center">
             <div className="w-full max-w-md">
                {feedback.correct ?
                    <CheckCircleIcon className="w-16 h-16 mx-auto text-green-400 mb-4"/> :
                    <LightbulbIcon className="w-16 h-16 mx-auto text-yellow-300 mb-4"/>
                }
                <h2 className={`text-3xl font-bold mb-2 ${feedback.correct ? 'text-green-400' : 'text-yellow-300'}`}>
                    {feedback.correct ? '¡Correcto!' : '¡Una pista!'}
                </h2>
                <div className="bg-black/20 p-4 rounded-lg my-4">
                    <p>{feedback.text}</p>
                </div>
                {feedback.correct && <p className="text-xl font-bold">Has ganado {currentLevel.reward} <CoinIcon className="w-5 h-5 inline-block -mt-1"/></p>}
                
                <button onClick={handleNext} className="mt-6 w-full bg-yellow-400 text-blue-950 font-bold text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
                    Continuar <ArrowRightIcon className="w-5 h-5 inline-block"/>
                </button>
             </div>
        </div>
    )
  }

  // Menu View
  return (
    <div className="text-white p-4 h-full flex flex-col">
      <div className="text-center mb-4">
        <img src="/imagenes/minijuego-comparahorro.png" alt="ComparAhorro" className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4"/>
        <h2 className="text-3xl font-bold">ComparAhorro</h2>
        <p className="text-white/80">Compara y elige la mejor opción para ganar.</p>
      </div>
      <div className="flex-grow overflow-y-auto space-y-2">
        {levels.map(level => (
          <button
            key={level.id}
            onClick={() => handleSelectLevel(level)}
            className="w-full text-left bg-blue-900/60 p-3 rounded-lg hover:bg-blue-800/60 transition-all flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg text-cyan-300">{level.id}: {level.title}</h3>
              <p className="text-sm italic text-white/70">{level.objective}</p>
            </div>
            {completedLevels.includes(level.id) && <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0 ml-4" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComparAhorroGame;