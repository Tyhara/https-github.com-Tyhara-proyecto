
import React, { useState } from 'react';
import { LevelData, LevelType, GameStats } from '../types';
import { GameButton } from '../components/GameButton';
import { Star, ArrowLeft, ThumbsUp, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { CoinIcon } from '../components/CoinIcon';

interface GameLevelProps {
  level: LevelData;
  onComplete: (statsEarned: Partial<GameStats>) => void;
  onBack: () => void;
  nextLevelTitle?: string; // Optional title for the next level
}

export const GameLevel: React.FC<GameLevelProps> = ({ level, onComplete, onBack, nextLevelTitle }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [feedback, setFeedback] = useState<{ title: string; text: string; success: boolean; rewards: Partial<GameStats> } | null>(null);

  // Scenario Logic
  const handleScenarioChoice = (index: number) => {
    if (!level.scenario || selectedOptionIndex !== null) return; // Prevent double clicks
    
    setSelectedOptionIndex(index);
    const option = level.scenario.options[index];
    
    // Logic to determine if it's a "good" answer
    const isPunishment = (option.rewards.coins || 0) < 0;
    const isNeutral = (option.rewards.coins === 0 && (option.rewards.knowledge || 0) === 0);
    const isSuccess = !isPunishment && !isNeutral;
    
    setAnswerStatus(isSuccess ? 'correct' : 'incorrect');

    // Delay showing the modal so the user sees the button color change
    setTimeout(() => {
      setFeedback({
        title: isSuccess ? "¡Bien Hecho!" : "¡Ups! Intenta de nuevo",
        text: option.outcome,
        success: isSuccess,
        rewards: option.rewards
      });
    }, 800);
  };

  // Comparison Logic
  const handleComparisonChoice = (product: 'A' | 'B') => {
    if (!level.comparison || selectedOptionIndex !== null) return;

    // Map 'A' to index 0, 'B' to index 1 for visual state
    setSelectedOptionIndex(product === 'A' ? 0 : 1);

    const isCorrect = product === level.comparison.correctProduct;
    const rewards = isCorrect ? { coins: 20, happiness: 10, knowledge: 20 } : { coins: 0, happiness: 0, knowledge: 0 };
    
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setFeedback({
        title: isCorrect ? "¡Excelente Compra!" : "¡Piénsalo mejor!",
        text: level.comparison.reason,
        success: isCorrect,
        rewards: rewards
      });
    }, 800);
  };

  const handleRetry = () => {
    setFeedback(null);
    setSelectedOptionIndex(null);
    setAnswerStatus(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      
      <div className="p-4">
        <button onClick={onBack} className="text-slate-500 flex items-center gap-2 font-bold hover:text-slate-800">
          <ArrowLeft /> Volver al Mapa
        </button>
      </div>

      <div className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center pb-10 max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <span className="bg-sky-100 text-sky-700 font-bold px-4 py-1 rounded-full mb-2 inline-block tracking-wide uppercase text-xs">
             {level.type === LevelType.SCENARIO ? 'Pregunta Rápida' : 'ComparAhorro'}
          </span>
          <h1 className="text-2xl font-display font-bold text-slate-800 opacity-50">{level.title}</h1>
        </div>

        {/* Content based on Level Type */}
        {level.type === LevelType.SCENARIO && level.scenario && (
          <div className="w-full">
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-b-8 border-sky-200 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-700 leading-tight">
                {level.scenario.prompt}
              </h2>
            </div>

            <div className="grid gap-4">
              {level.scenario.options.map((option, idx) => {
                // Button Styling Logic based on state
                let variant: 'primary' | 'success' | 'danger' = 'primary';
                if (selectedOptionIndex === idx) {
                   variant = answerStatus === 'correct' ? 'success' : 'danger';
                }

                return (
                  <GameButton 
                    key={idx} 
                    onClick={() => handleScenarioChoice(idx)}
                    variant={variant}
                    fullWidth
                    className="text-left justify-start h-auto min-h-[80px]"
                    disabled={selectedOptionIndex !== null}
                  >
                    <span className="text-lg">{option.text}</span>
                  </GameButton>
                )
              })}
            </div>
          </div>
        )}

        {level.type === LevelType.COMPARISON && level.comparison && (
          <div className="w-full">
             <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 border-b-8 border-sky-200 text-center">
                <h2 className="text-xl font-bold text-slate-600 mb-2">¿Qué opción es mejor para tu ahorro?</h2>
                <p className="text-slate-400 text-sm">{level.description}</p>
             </div>

             <div className="grid grid-cols-2 gap-4 md:gap-8">
                {/* Product A */}
                <div 
                    onClick={() => handleComparisonChoice('A')}
                    className={`bg-white rounded-3xl p-6 shadow-lg border-4 cursor-pointer transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center text-center
                        ${selectedOptionIndex === 0 ? (answerStatus === 'correct' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-white hover:border-sky-200'}
                    `}
                >
                    <div className="text-6xl mb-4 animate-bounce-in">{level.comparison.productA.icon || '📦'}</div>
                    <h3 className="font-bold text-slate-700 mb-2">{level.comparison.productA.name}</h3>
                    <div className="mt-auto">
                        <div className="flex justify-center mb-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={i < level.comparison.productA.stars ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                            ))}
                        </div>
                        <div className="bg-slate-100 text-slate-600 font-bold rounded-lg px-3 py-1 inline-block">
                            ${level.comparison.productA.price}
                        </div>
                    </div>
                </div>

                {/* Product B */}
                <div 
                    onClick={() => handleComparisonChoice('B')}
                    className={`bg-white rounded-3xl p-6 shadow-lg border-4 cursor-pointer transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center text-center
                        ${selectedOptionIndex === 1 ? (answerStatus === 'correct' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-white hover:border-sky-200'}
                    `}
                >
                    <div className="text-6xl mb-4 animate-bounce-in">{level.comparison.productB.icon || '📦'}</div>
                    <h3 className="font-bold text-slate-700 mb-2">{level.comparison.productB.name}</h3>
                    <div className="mt-auto">
                        <div className="flex justify-center mb-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={i < level.comparison.productB.stars ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                            ))}
                        </div>
                        <div className="bg-slate-100 text-slate-600 font-bold rounded-lg px-3 py-1 inline-block">
                            ${level.comparison.productB.price}
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )}

      </div>

      {/* FEEDBACK MODAL */}
      {feedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl animate-in zoom-in duration-300">
               <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${feedback.success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                   {feedback.success ? <ThumbsUp size={40} /> : <AlertTriangle size={40} />}
               </div>
               
               <h3 className={`text-2xl font-display font-bold mb-2 ${feedback.success ? 'text-green-600' : 'text-red-500'}`}>
                   {feedback.title}
               </h3>
               
               <p className="text-slate-600 font-medium mb-6 text-lg">
                   {feedback.text}
               </p>

               {feedback.success && (
                   <div className="flex justify-center gap-4 mb-8">
                       {feedback.rewards.coins !== undefined && feedback.rewards.coins !== 0 && (
                           <div className="flex flex-col items-center animate-bounce">
                               <span className={`font-bold text-lg ${feedback.rewards.coins > 0 ? 'text-amber-500' : 'text-red-500'}`}>
                                   {feedback.rewards.coins > 0 ? '+' : ''}{feedback.rewards.coins}
                               </span>
                               <CoinIcon size={32} />
                           </div>
                       )}
                       {/* Only show stats if greater than 0 */}
                       {(feedback.rewards.happiness || 0) > 0 && (
                           <div className="flex flex-col items-center">
                               <span className="font-bold text-lg text-pink-500">+{feedback.rewards.happiness}</span>
                               <span className="text-2xl">❤️</span>
                           </div>
                       )}
                   </div>
               )}

               <GameButton 
                  onClick={() => feedback.success ? onComplete(feedback.rewards) : handleRetry()} 
                  variant={feedback.success ? 'success' : 'secondary'}
                  fullWidth
               >
                  {feedback.success ? (
                      <span className="flex items-center gap-2 justify-center">
                          {nextLevelTitle ? `Siguiente: ${nextLevelTitle}` : 'Continuar'} <ArrowRight size={20} />
                      </span>
                  ) : (
                      <span className="flex items-center gap-2 justify-center">
                          <RotateCcw size={20} /> Intentar de nuevo
                      </span>
                  )}
               </GameButton>
           </div>
        </div>
      )}

    </div>
  );
};
