import React, { useState } from 'react';
import { askComplexQuestion } from '../services/geminiService';
import { LightbulbIcon } from './Icons';

const ThinkingMode: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse('');
    const result = await askComplexQuestion(prompt);
    setResponse(result);
    setIsLoading(false);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };


  return (
    <div className="bg-gradient-to-br from-cyan-500 to-teal-600 text-white p-4 h-full flex flex-col items-center">
      <div className="w-full max-w-4xl h-full flex flex-col">
        <div className="flex justify-between items-center mb-4 pt-4">
          <h3 className="text-2xl font-bold flex items-center gap-2 font-fredoka">
            <LightbulbIcon className="w-7 h-7 text-yellow-300"/> Ayuda del Genio
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: ¿Para qué sirven las monedas?"
            className="flex-grow bg-white/20 border-2 border-transparent focus:border-yellow-300 rounded-lg p-3 outline-none transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="bg-yellow-400 text-blue-950 font-bold px-5 py-3 rounded-lg hover:bg-yellow-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-fredoka"
          >
            {isLoading ? '...' : 'Enviar'}
          </button>
        </form>

        <div className="flex-grow bg-white/10 rounded-lg p-4 overflow-y-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-300"></div>
              <p className="mt-4 text-lg">El Genio está pensando...</p>
            </div>
          )}
          {response && (
            <div className="whitespace-pre-wrap text-lg" dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br />') }} />
          )}
          {!isLoading && !response && (
            <div className="text-center text-white/70 p-6">
              <LightbulbIcon className="w-16 h-16 mx-auto mb-4 text-yellow-300/50" />
              <p className="font-bold text-lg text-white/90">¿Necesitas ayuda o un tutorial?</p>
              <p className="mb-4">¡El Genio de las Monedas te responde!</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button onClick={() => handleSuggestionClick('¿Cómo se juega a MonedAventura?')} className="bg-cyan-600/50 hover:bg-cyan-600/80 px-4 py-2 rounded-full text-sm transition-colors">¿Cómo se juega?</button>
                  <button onClick={() => handleSuggestionClick('Explícame qué es ahorrar')} className="bg-cyan-600/50 hover:bg-cyan-600/80 px-4 py-2 rounded-full text-sm transition-colors">¿Qué es ahorrar?</button>
                  <button onClick={() => handleSuggestionClick('¿Cómo gano más monedas?')} className="bg-cyan-600/50 hover:bg-cyan-600/80 px-4 py-2 rounded-full text-sm transition-colors">¿Cómo gano más monedas?</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThinkingMode;