import React from 'react';
import { ClockIcon } from './Icons';

const TimeUpModal: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 text-center animate-fade-in">
      <div className="bg-gradient-to-br from-indigo-700 to-red-800 text-white rounded-2xl p-8 shadow-2xl w-full max-w-sm border-2 border-yellow-400/50">
        <ClockIcon className="w-16 h-16 mx-auto text-yellow-300 animate-pulse mb-4" />
        <h2 className="text-3xl font-bold font-fredoka text-yellow-300">¡Hora de un descanso!</h2>
        <p className="mt-4 text-lg text-white/90">
          Has hecho un gran trabajo hoy. ¡Es momento de tomar una pausa para recargar energías!
        </p>
        <p className="mt-2 text-sm text-white/70">
          Vuelve más tarde para continuar tu Monedaventura.
        </p>
        <button
          onClick={() => { /* In a real app, this might close the app or go to a locked screen */ }}
          className="mt-6 w-full bg-yellow-400 text-blue-950 font-bold text-xl px-8 py-3 rounded-full shadow-lg cursor-not-allowed opacity-80"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default TimeUpModal;