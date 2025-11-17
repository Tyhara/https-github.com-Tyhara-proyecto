import React, { useState, useEffect, useMemo } from 'react';
import { User, PlayerProgress, PlayerConfig } from '../types';
import { AVATAR_OPTIONS, ADVENTURE_MAPS } from '../constants';
import { ChartPieIcon, FireIcon, PresentationChartBarIcon, UserIcon, MusicalNoteIcon, SpeakerWaveIcon, ShareIcon } from './Icons';

interface ProfileScreenProps {
    user: User | null;
    progress: PlayerProgress;
    onLogout: () => void;
    onSwitchUser: () => void;
    onConfigSave: (config: PlayerConfig) => void;
    onShareSuccess: () => void;
}

const StatsCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string;
    color: string;
    children?: React.ReactNode;
}> = ({ icon, title, value, color, children }) => (
    <div className="bg-blue-700/50 rounded-xl p-4 flex flex-col items-center justify-center text-center h-full">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${color}`}>
            {icon}
        </div>
        <p className="text-sm font-bold text-white/80">{title}</p>
        {children ? children : <p className="text-2xl font-bold">{value}</p>}
    </div>
);

const ToggleSwitch: React.FC<{ label: string; icon: React.ReactNode; isEnabled: boolean; onToggle: () => void; }> = ({ label, icon, isEnabled, onToggle }) => (
     <div className="bg-blue-700/50 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
            {icon}
            <span className="font-bold">{label}</span>
        </div>
        <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isEnabled ? 'bg-green-500' : 'bg-gray-600'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);


const ProfileScreen: React.FC<ProfileScreenProps> = ({
    user,
    progress,
    onLogout,
    onSwitchUser,
    onConfigSave,
    onShareSuccess
}) => {
    const { score, stats, loginStreak, configuraciones, progressByMap } = progress;
    const [config, setConfig] = useState<PlayerConfig>(configuraciones || {});
    
    const totalLevelsCompleted = useMemo(() => {
        return Object.values(progressByMap).reduce((acc, mapProgress) => acc + mapProgress.level, 0);
    }, [progressByMap]);

    const totalPossibleLevels = ADVENTURE_MAPS.reduce((total, map) => total + map.levels.length, 0);

    useEffect(() => {
        onConfigSave(config);
    }, [config, onConfigSave]);

    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'MonedAventura',
                text: '¡Únete a mí en MonedAventura y aprende sobre finanzas mientras juegas!',
                url: window.location.href
            });
            onShareSuccess();
        } catch (error) {
            console.log('Error al compartir', error);
        }
    };

    const totalAnswers = (stats?.correct || 0) + (stats?.incorrect || 0);
    const accuracy = totalAnswers > 0 ? Math.round(((stats?.correct || 0) / totalAnswers) * 100) : 0;
    
    const conicGradient = `conic-gradient(#4ade80 ${accuracy}%, #f87171 0%)`;
    
    return (
        <div className="w-full h-full text-white bg-blue-800 p-6 flex flex-col justify-between items-center overflow-y-auto">
            <div className="w-full max-w-4xl">
                <div className="text-center">
                    <img
                        src={user?.avatarUrl || AVATAR_OPTIONS[0]}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full mb-3 mx-auto border-4 border-yellow-300 bg-gray-600"
                    />
                    <h2 className="text-3xl font-bold font-fredoka">{user?.username}</h2>
                    <p className="text-xl mt-1 font-bold">Puntaje Total: <span className="text-yellow-300">{score}</span></p>
                    <p className="text-md mt-1 capitalize text-white/70">Curso: <span className="font-bold">{user?.grade}</span></p>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-3 text-center">Mis Estadísticas</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <StatsCard
                            icon={<PresentationChartBarIcon className="w-7 h-7" />}
                            title="Progreso Total"
                            value={`${totalLevelsCompleted}/${totalPossibleLevels}`}
                            color="bg-sky-500"
                        />
                         <StatsCard
                            icon={<FireIcon className="w-7 h-7" />}
                            title="Racha"
                            value={`${loginStreak || 0} Días`}
                            color="bg-orange-500"
                        />
                        <div className="col-span-2 lg:col-span-1">
                             <StatsCard
                                icon={<ChartPieIcon className="w-7 h-7" />}
                                title="Precisión"
                                value={`${accuracy}%`}
                                color="bg-green-500"
                            >
                                <div style={{ background: conicGradient }} className="w-20 h-20 rounded-full flex items-center justify-center mt-2">
                                  <div className="w-16 h-16 bg-blue-700/50 rounded-full flex items-center justify-center">
                                    <span className="text-xl font-bold">{accuracy}%</span>
                                  </div>
                                </div>
                             </StatsCard>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-3 text-center">Ajustes</h3>
                    <div className="space-y-3">
                         <ToggleSwitch 
                            label="Música"
                            icon={<MusicalNoteIcon className="w-6 h-6 text-pink-400" />}
                            isEnabled={!!config.musicOn}
                            onToggle={() => setConfig(prev => ({...prev, musicOn: !prev.musicOn}))}
                         />
                         <ToggleSwitch 
                            label="Efectos de Sonido"
                            icon={<SpeakerWaveIcon className="w-6 h-6 text-teal-400" />}
                            isEnabled={!!config.sfxOn}
                            onToggle={() => setConfig(prev => ({...prev, sfxOn: !prev.sfxOn}))}
                         />
                         <button onClick={handleShare} className="w-full bg-teal-600 rounded-xl p-3 flex items-center justify-center gap-3 font-bold hover:bg-teal-500 transition-colors">
                            <ShareIcon className="w-6 h-6 text-cyan-200" />
                            Compartir Juego (+20 Monedas)
                         </button>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex-shrink-0 space-y-3 w-full max-w-4xl">
                 <button
                    onClick={onSwitchUser}
                    className="w-full bg-emerald-500 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
                >
                    <UserIcon className="w-5 h-5"/> Cambiar Jugador
                </button>
                <button
                    onClick={onLogout}
                    className="w-full bg-red-500 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default ProfileScreen;