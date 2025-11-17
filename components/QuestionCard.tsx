import React, { useState, useEffect } from 'react';
import { Question, ScenarioOption } from '../types';
import { getHintForQuestion } from '../services/geminiService';
import { QuestionMarkCircleIcon, ArrowRightIcon, CoinIcon } from './Icons';

interface QuestionCardProps {
  questionData: Question;
  onAnswer: (effects: { score: number; happiness: number; knowledge: number; }) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionData, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [answerResult, setAnswerResult] = useState<{ isCorrect: boolean, effects: { score: number; happiness: number; knowledge: number; } } | null>(null);
  
  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFeedback('');
    setAnswerResult(null);
    setHint(null);
    setIsHintLoading(false);
  }, [questionData]);

  const processAnswer = (isCorrect: boolean, feedbackText: string, effects: { score: number; happiness: number; knowledge: number; }) => {
    setShowFeedback(true);
    setFeedback(feedbackText);
    setAnswerResult({ isCorrect, effects });
  };

  const handleScenarioChoice = (option: ScenarioOption) => {
    if (showFeedback) return;
    processAnswer(true, option.outcome, option.effects);
  }

  const handleNext = () => {
    if (answerResult) {
      onAnswer(answerResult.effects);
    }
  };
  
  const handleHintClick = async () => {
    if (isHintLoading || hint) return;
    setIsHintLoading(true);
    const hintText = await getHintForQuestion(questionData);
    setHint(hintText);
    setIsHintLoading(false);
  };

  const renderScenario = () => {
    if (questionData.type !== 'scenario') return null;
    return (
        <>
            <p className="text-lg text-white bg-black/20 p-4 rounded-xl mb-4 italic">{questionData.scenario}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-fredoka">
                {questionData.question}
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {questionData.options.map((option: ScenarioOption, index: number) => (
                <button
                    key={index}
                    onClick={() => handleScenarioChoice(option)}
                    disabled={showFeedback}
                    className="w-full p-4 rounded-xl text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed bg-cyan-400 hover:bg-cyan-300 text-blue-950 disabled:opacity-60"
                >
                    {option.text}
                </button>
                ))}
            </div>
        </>
     )
  }

  return (
    <div className="w-full max-w-2xl text-center relative">
        {!showFeedback && (
             <button 
                onClick={handleHintClick} 
                disabled={isHintLoading || !!hint}
                className="absolute -top-12 right-0 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed z-10"
                aria-label="Pedir una pista"
            >
                {isHintLoading ? <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : <QuestionMarkCircleIcon className="w-6 h-6"/>}
            </button>
        )}
       
        <div className="w-full bg-blue-900/40 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-2xl">
            {hint && !showFeedback && (
                <div className="mb-4 p-3 bg-indigo-800/70 text-white rounded-lg italic text-sm animate-fade-in">
                    <span className="font-bold not-italic">Pista del pirata:</span> "{hint}"
                </div>
            )}

            {renderScenario()}

            {showFeedback && (
                <div className="mt-6 animate-fade-in">
                    <div className={`p-4 rounded-lg text-white font-bold text-lg bg-green-600`}>
                       {feedback}
                    </div>
                    <button 
                        onClick={handleNext}
                        className="mt-4 w-full bg-yellow-400 text-blue-950 font-bold font-fredoka text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
                    >
                        Siguiente <ArrowRightIcon className="w-5 h-5 inline"/>
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default QuestionCard;