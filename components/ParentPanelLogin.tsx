import React, { useState } from 'react';
import { FamilyIcon, EyeIcon, EyeSlashIcon } from './Icons';
import { MonedaventuraData, User } from '../types';

interface ParentPanelLoginProps {
  onSuccess: (tutor: User) => void;
  onBack: () => void;
}

const ParentPanelLogin: React.FC<ParentPanelLoginProps> = ({ onSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedDataJSON = localStorage.getItem('monedaventura_data');
    if (storedDataJSON) {
        const data: MonedaventuraData = JSON.parse(storedDataJSON);
        // In a real app, you'd check a hashed password. Here we do a simple check.
        if (data.tutor && data.tutor.email === email && data.tutor.password === password) {
            setError('');
            onSuccess(data.tutor);
            return;
        }
    }
    setError('Email o contraseña incorrectos.');
  };
  
  const backgroundImageUrl = '/imagenes/Monedaventura-bg.webp';


  return (
    <div 
        className="w-full h-full bg-cover bg-center flex items-center justify-center p-4 animate-fade-in"
        style={{backgroundImage: `url(${backgroundImageUrl})`}}
    >
        <div className="w-full max-w-md bg-blue-800/80 backdrop-blur-lg text-white p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-6">
                <FamilyIcon className="w-12 h-12 mx-auto text-sky-300 mb-3" />
                <h1 className="text-3xl font-fredoka">
                    Panel Familiar
                </h1>
            </div>

            <form onSubmit={handleLogin}>
                {error && <p className="text-red-400 text-center mb-4 text-sm">{error}</p>}
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" htmlFor="email">Email del Tutor</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/20 border-2 border-transparent focus:border-sky-300 rounded-lg p-3 outline-none transition-all" placeholder="tutor@ejemplo.com"/>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-bold mb-2" htmlFor="password">Contraseña</label>
                    <div className="relative">
                        <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/20 border-2 border-transparent focus:border-sky-300 rounded-lg p-3 outline-none transition-all pr-10" placeholder="●●●●●●"/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <button type="submit" className="w-full bg-emerald-500 text-white font-bold font-fredoka text-xl px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-emerald-600">
                    Acceder
                </button>
            </form>
             <button onClick={onBack} className="w-full text-center mt-4 text-yellow-300 hover:underline">
                Volver
            </button>
        </div>
    </div>
  );
};

export default ParentPanelLogin;