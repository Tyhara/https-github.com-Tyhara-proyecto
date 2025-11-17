
import React, { useState } from 'react';
import { TrophyIcon, ArrowRightIcon } from './Icons';

interface LevelCompleteScreenProps {
  onNextLevel: () => void;
}

const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({ onNextLevel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      onNextLevel();
    }, 1500); // 1.5 second loading animation
  };

  return (
    <div className="w-full h-full text-center text-white bg-cover bg-center bg-[url('/imagenes/bg-story.png')] p-4 flex flex-col justify-center items-center">
      <div className="bg-blue-700/80 p-10 rounded-3xl shadow-2xl backdrop-blur-md max-w-xl mx-auto animate-fade-in">
        <TrophyIcon className="w-20 h-20 mx-auto text-yellow-300" />
        <h1 className="text-4xl font-fredoka text-yellow-300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)] my-4">
          ¡Nivel Superado!
        </h1>
        <p className="text-xl font-bold mb-6">
          ¡Misión cumplida! Has demostrado que con paciencia y buenas decisiones, puedes alcanzar cualquier meta. ¡Sigue ahorrando y grandes tesoros te esperarán!
        </p>
        <button
          onClick={handleNext}
          disabled={isLoading}
          className="w-full bg-yellow-400 text-blue-950 font-bold font-fredoka text-xl px-12 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:bg-yellow-200"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-6 h-6 border-4 border-blue-950 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2">Cargando...</span>
            </div>
          ) : (
            <>
              Siguiente Nivel <ArrowRightIcon className="w-5 h-5 inline" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LevelCompleteScreen;
