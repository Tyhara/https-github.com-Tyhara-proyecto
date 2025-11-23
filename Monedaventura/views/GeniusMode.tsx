
import React, { useState, useRef, useEffect } from 'react';
import { ChildProfile, ChatMessage } from '../types';
import { askFinancialGenius } from '../services/geminiService';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';

interface GeniusModeProps {
  profile: ChildProfile;
  onClose: () => void;
}

export const GeniusMode: React.FC<GeniusModeProps> = ({ profile, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `¡Hola ${profile.name}! 🧞‍♂️ Soy el Genio de las Finanzas. Veo que tienes ${profile.stats.coins} monedas. ¡Pregúntame lo que quieras!` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Pasamos el perfil completo para que el Genio tenga contexto de la BD
    const response = await askFinancialGenius(userMsg, profile);

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-purple-900 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-purple-800 p-4 flex items-center justify-between shadow-lg">
        <button onClick={onClose} className="text-white hover:bg-purple-700 p-2 rounded-full">
          <ArrowLeft size={28} />
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="text-yellow-300 animate-pulse" />
          <h2 className="text-white font-display font-bold text-xl">El Genio Sabio</h2>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-900 to-indigo-900">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-lg ${
              msg.role === 'user' 
                ? 'bg-white text-purple-900 rounded-tr-none' 
                : 'bg-purple-600 text-white rounded-tl-none border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-purple-600 text-white p-4 rounded-2xl rounded-tl-none animate-pulse">
              Pensando mágicamente... 🔮
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-purple-800 pb-8">
        <div className="flex gap-2 bg-white p-2 rounded-2xl">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu pregunta mágica..."
            className="flex-1 p-2 text-lg outline-none text-purple-900 placeholder-purple-300"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-xl transition-colors disabled:opacity-50"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
