

import React from 'react';
import { StoryLevel, Question } from '../types';
import { TreasureChestIcon } from './Icons';

interface LevelDetailModalProps {
    levelData: StoryLevel;
    completedQuestionIndices: number[];
    onSelectQuestion: (questionIndex: number) => void;
    onClose: () => void;
}

const LevelDetailModal: React.FC<LevelDetailModalProps> = ({ levelData, completedQuestionIndices, onSelectQuestion, onClose }) => {
    return (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div 
                className="bg-blue-800/90 border-4 border-yellow-400/50 rounded-2xl p-6 w-full max-w-2xl text-white text-center shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <h2 className="text-3xl font-fredoka text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] mb-2">
                    {levelData.title}
                </h2>
                <p className="text-white/80 mb-6 italic px-4">{levelData.introduction}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2">
                    {levelData.questions.map((question, index) => {
                        const isCompleted = completedQuestionIndices.includes(index);
                        return (
                            <button 
                                key={index}
                                onClick={() => onSelectQuestion(index)}
                                className={`w-full p-4 rounded-lg flex items-start gap-4 text-left transition-all transform hover:scale-105 border-2
                                    ${isCompleted ? 'bg-green-800/70 border-green-500/80' : 'bg-blue-700/80 border-transparent hover:bg-blue-700'}
                                `}
                            >
                                <img 
                                    src={isCompleted ? '/imagenes/cofre-abierto.png' : '/imagenes/cofre.png'}
                                    alt={isCompleted ? 'Cofre abierto' : 'Cofre cerrado'}
                                    className="w-12 h-12 flex-shrink-0 mt-1"
                                />
                                <div>
                                    <h4 className="font-bold text-lg">Desafío {index + 1}</h4>
                                    <p className="text-sm text-white/70">{question.type === 'scenario' ? question.scenario : question.question}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <button 
                    onClick={onClose}
                    className="mt-6 w-full max-w-xs mx-auto bg-yellow-400 text-blue-950 font-bold font-fredoka text-lg py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                    Volver al Mapa
                </button>
            </div>
        </div>
    );
};

export default LevelDetailModal;