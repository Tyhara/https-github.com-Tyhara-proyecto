import React, { useState, useEffect } from 'react';
import { User, PlayerConfig, PlayerProgress, UserGrade } from '../types';
import { ClockIcon, UserIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, DotsVerticalIcon, TrashIcon, PencilIcon } from './Icons';
import { AVATAR_OPTIONS } from '../constants';

interface ParentDashboardProps {
  tutor: User;
  playerProgressMap: { [username: string]: PlayerProgress };
  onAddChild: (newChild: User) => void;
  onSelectPlayer: (player: User) => void;
  onLogout: () => void;
  onConfigSave: (config: PlayerConfig, username: string) => void;
  onEditChild: (originalUsername: string, updatedData: User) => void;
  onDeleteChild: (username: string) => void;
}

const AvatarCarousel: React.FC<{ initialAvatar: string, onAvatarChange: (avatar: string) => void}> = ({ initialAvatar, onAvatarChange }) => {
    const initialIndex = AVATAR_OPTIONS.indexOf(initialAvatar);
    const [currentIndex, setCurrentIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

    useEffect(() => {
        onAvatarChange(AVATAR_OPTIONS[currentIndex]);
    }, [currentIndex, onAvatarChange]);
    
    const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? AVATAR_OPTIONS.length - 1 : prev - 1));
    const handleNext = () => setCurrentIndex(prev => (prev === AVATAR_OPTIONS.length - 1 ? 0 : prev + 1));

    return (
        <div className="flex items-center justify-center gap-4 mb-6">
            <button type="button" onClick={handlePrev} className="p-2 rounded-full bg-white/10 hover:bg-white/20"><ChevronLeftIcon className="w-6 h-6"/></button>
            <img src={AVATAR_OPTIONS[currentIndex]} alt="avatar" className="w-20 h-20 rounded-full border-4 border-yellow-400" />
            <button type="button" onClick={handleNext} className="p-2 rounded-full bg-white/10 hover:bg-white/20"><ChevronRightIcon className="w-6 h-6"/></button>
        </div>
    )
}

const EditChildModal: React.FC<{ player: User, onSave: (originalUsername: string, updatedData: User) => void, onClose: () => void, isNew: boolean }> = ({ player, onSave, onClose, isNew }) => {
    const [playerName, setPlayerName] = useState(player.username);
    const [playerGrade, setPlayerGrade] = useState<UserGrade | ''>(player.grade || '');
    const [playerAvatar, setPlayerAvatar] = useState(player.avatarUrl);
    const [isTutor, setIsTutor] = useState(player.grade === 'Tutor');

    useEffect(() => {
        if (isTutor) {
            setPlayerGrade('Tutor');
        } else {
            if (playerGrade === 'Tutor') {
                setPlayerGrade('2º Básico');
            }
        }
    }, [isTutor, playerGrade]);


    const handleSubmit = () => {
        if (playerName.trim() && playerGrade) {
            const updatedPlayer: User = {
                ...player,
                username: playerName,
                grade: playerGrade,
                avatarUrl: playerAvatar,
            };
            onSave(player.username, updatedPlayer);
            onClose();
        }
    };
    
    return (
         <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-blue-800 text-white w-full max-w-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-center mb-4">{isNew ? 'Añadir Jugador' : 'Editar Jugador'}</h3>
                
                <div className="mb-4 bg-white/10 p-3 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={isTutor} 
                            onChange={e => setIsTutor(e.target.checked)}
                            disabled={!isNew && player.grade === 'Tutor'} // Can't change tutor status after creation
                            className="w-5 h-5 rounded accent-yellow-400 bg-gray-700 border-gray-600 focus:ring-yellow-500 disabled:opacity-50"
                        />
                        <span className="font-bold">Este jugador es un Tutor</span>
                    </label>
                </div>

                <input type="text" placeholder="Nombre del jugador" value={playerName} onChange={e => setPlayerName(e.target.value)} className="w-full bg-gray-900/50 p-2 rounded-lg mb-3" />
                <select value={playerGrade} onChange={e => setPlayerGrade(e.target.value as UserGrade)} disabled={isTutor} className="w-full bg-gray-900/50 p-2 rounded-lg mb-4 appearance-none text-center disabled:bg-gray-700">
                    {isTutor ? <option value="Tutor">Tutor</option> :
                    <>
                        <option value="">Selecciona un curso</option>
                        <option value="2º Básico">2º Básico</option>
                        <option value="3º Básico">3º Básico</option>
                        <option value="4º Básico">4º Básico</option>
                        <option value="5º Básico">5º Básico</option>
                        <option value="6º Básico">6º Básico</option>
                    </>}
                </select>
                <AvatarCarousel initialAvatar={playerAvatar} onAvatarChange={setPlayerAvatar} />
                <div className="flex gap-3">
                    <button onClick={onClose} className="w-full bg-gray-600 py-2 rounded-full">Cancelar</button>
                    <button onClick={handleSubmit} className="w-full bg-green-500 py-2 rounded-full">Guardar</button>
                </div>
            </div>
        </div>
    )
}

const DeleteConfirmModal: React.FC<{ child: User, onConfirm: (username: string) => void, onClose: () => void }> = ({ child, onConfirm, onClose }) => {
    return (
         <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-blue-800 text-white w-full max-w-sm rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold mb-2">¿Estás seguro?</h3>
                <p className="text-white/80 mb-6">Si eliminas a <span className="font-bold">{child.username}</span>, todo su progreso se perderá para siempre.</p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="w-full bg-gray-600 py-2 rounded-full">Cancelar</button>
                    <button onClick={() => onConfirm(child.username)} className="w-full bg-red-500 py-2 rounded-full">Sí, eliminar</button>
                </div>
            </div>
         </div>
    )
}


const ParentDashboard: React.FC<ParentDashboardProps> = ({ tutor, playerProgressMap, onAddChild, onSelectPlayer, onLogout, onConfigSave, onEditChild, onDeleteChild }) => {
    const [showAddChild, setShowAddChild] = useState(false);
    const [configPlayer, setConfigPlayer] = useState<User | null>(null);
    const [config, setConfig] = useState<PlayerConfig>({});
    const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
    const [editingPlayer, setEditingPlayer] = useState<User | null>(null);
    const [deletingChild, setDeletingChild] = useState<User | null>(null);
    
    useEffect(() => {
        if(configPlayer) {
            setConfig(playerProgressMap[configPlayer.username]?.configuraciones || {});
        } else {
            setConfig({});
        }
    }, [configPlayer, playerProgressMap]);

    const handleSaveConfig = () => {
        if (configPlayer) {
            onConfigSave(config, configPlayer.username);
            setConfigPlayer(null);
        }
    };
    
    const calculateTotalLevel = (progress: PlayerProgress | undefined) => {
        if (!progress || !progress.progressByMap) return 0;
        return Object.values(progress.progressByMap).reduce((total, mapProgress) => total + mapProgress.level, 0);
    };

    const tutorProgress = playerProgressMap[tutor.username];
    const tutorTotalLevel = calculateTotalLevel(tutorProgress);

    return (
        <div className="w-full h-full bg-blue-900 text-white p-4 sm:p-6 flex flex-col">
            <div className="w-full max-w-3xl mx-auto flex justify-between items-center mb-6 flex-shrink-0">
                <div>
                    <h2 className="text-3xl font-bold font-fredoka text-left">Panel Familiar</h2>
                    <p className="text-left text-white/70">Bienvenido/a, {tutor.username}</p>
                </div>
                <button 
                    onClick={onLogout} 
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors text-sm"
                >
                    Cerrar Sesión
                </button>
            </div>
            
            <div className="flex-grow space-y-4 overflow-y-auto w-full max-w-3xl mx-auto">
                {/* Tutor Card */}
                <div className="bg-emerald-800/60 border-2 border-emerald-500 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <img src={tutor.avatarUrl} alt={tutor.username} className="w-16 h-16 rounded-full bg-gray-700" />
                        <div>
                            <h3 className="font-bold text-xl">{tutor.username} (Tutor)</h3>
                            <p className="text-sm text-white/70">Nivel Total {tutorTotalLevel} - {tutorProgress?.score || 0} monedas</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end flex-shrink-0">
                        <button onClick={() => onSelectPlayer(tutor)} className="bg-green-500 font-bold px-4 py-2 rounded-full hover:bg-green-600 transition-colors text-sm">
                            Jugar
                        </button>
                        <div className="relative">
                            <button onClick={() => setMenuOpenFor(menuOpenFor === tutor.username ? null : tutor.username)} className="p-2 rounded-full hover:bg-white/10"><DotsVerticalIcon className="w-5 h-5"/></button>
                            {menuOpenFor === tutor.username && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-20">
                                    <button onClick={() => { setConfigPlayer(tutor); setMenuOpenFor(null); }} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center gap-2"><ClockIcon className="w-4 h-4" /> Controles</button>
                                    <button onClick={() => { setEditingPlayer(tutor); setMenuOpenFor(null); }} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center gap-2"><PencilIcon className="w-4 h-4" /> Editar Perfil</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-fredoka text-cyan-300 pt-4">Perfiles de Jugadores</h3>

                {tutor.children && tutor.children.length > 0 ? tutor.children.map(player => {
                    const progress = playerProgressMap[player.username];
                    const totalLevel = calculateTotalLevel(progress);
                    return (
                        <div key={player.username} className="p-3 rounded-lg flex items-center justify-between bg-blue-700/60">
                            <div className="flex items-center gap-3">
                                <img src={player.avatarUrl} alt={player.username} className="w-12 h-12 rounded-full bg-gray-700" />
                                <div>
                                    <h4 className="font-bold text-lg">{player.username}</h4>
                                    <p className="text-sm text-white/60">Nivel Total {totalLevel} - {progress?.score || 0} monedas</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                 <button onClick={() => onSelectPlayer(player)} className="bg-cyan-500 p-2 rounded-full hover:bg-cyan-600"><ArrowRightIcon className="w-5 h-5"/></button>
                                 <div className="relative">
                                    <button onClick={() => setMenuOpenFor(menuOpenFor === player.username ? null : player.username)} className="p-2 rounded-full hover:bg-white/10"><DotsVerticalIcon className="w-5 h-5"/></button>
                                    {menuOpenFor === player.username && (
                                        <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-20">
                                            <button onClick={() => { setConfigPlayer(player); setMenuOpenFor(null); }} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center gap-2"><ClockIcon className="w-4 h-4" /> Controles</button>
                                            <button onClick={() => { setEditingPlayer(player); setMenuOpenFor(null); }} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center gap-2"><PencilIcon className="w-4 h-4" /> Editar</button>
                                            <button onClick={() => { setDeletingChild(player); setMenuOpenFor(null); }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 flex items-center gap-2"><TrashIcon className="w-4 h-4" /> Eliminar</button>
                                        </div>
                                    )}
                                 </div>
                            </div>
                        </div>
                    );
                }) : (
                     <div className="text-center text-white/50 p-6 bg-blue-800/40 rounded-lg">
                        <p>Aún no has añadido ningún jugador.</p>
                        <p className="mt-1">¡Crea un perfil para empezar la aventura!</p>
                    </div>
                )}
                 <button onClick={() => setShowAddChild(true)} className="w-full bg-cyan-600/50 p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-600/80 transition-colors">
                    <UserIcon className="w-5 h-5"/> Añadir Jugador
                 </button>
            </div>

            {showAddChild && <EditChildModal 
                isNew={true}
                player={{username: '', grade: '2º Básico', avatarUrl: AVATAR_OPTIONS[0], role:'jugador'}} 
                onSave={(_, newPlayerData) => { 
                    onAddChild(newPlayerData); 
                    setShowAddChild(false); 
                }} 
                onClose={() => setShowAddChild(false)} 
            />}
            {editingPlayer && <EditChildModal isNew={false} player={editingPlayer} onSave={onEditChild} onClose={() => setEditingPlayer(null)} />}
            {deletingChild && <DeleteConfirmModal child={deletingChild} onConfirm={(username) => { onDeleteChild(username); setDeletingChild(null); }} onClose={() => setDeletingChild(null)} />}
            
            {configPlayer && (
                 <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-blue-800 text-white w-full max-w-sm rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-center mb-4">Controles para {configPlayer.username}</h3>
                        <div className="space-y-4">
                             <div>
                                <label htmlFor="timeLimit" className="block text-md font-bold mb-2">Límite de Tiempo (minutos)</label>
                                <input
                                    type="number"
                                    id="timeLimit"
                                    value={config.tiempoMaximo || ''}
                                    onChange={(e) => setConfig(prev => ({...prev, tiempoMaximo: e.target.value ? parseInt(e.target.value) : undefined}))}
                                    placeholder="Sin límite"
                                    className="w-full bg-gray-900/50 p-2 rounded-lg"
                                />
                            </div>
                             <div>
                                 <label className="flex items-center justify-between cursor-pointer">
                                     <span className="text-md font-bold">Modo Guiado</span>
                                     <div className="relative">
                                         <input type="checkbox" className="sr-only" checked={config.modoGuiado || false} onChange={() => setConfig(prev => ({...prev, modoGuiado: !prev.modoGuiado}))} />
                                         <div className={`block w-12 h-6 rounded-full ${config.modoGuiado ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                                         <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${config.modoGuiado ? 'transform translate-x-6' : ''}`}></div>
                                     </div>
                                 </label>
                             </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setConfigPlayer(null)} className="w-full bg-gray-600 py-2 rounded-full">Cancelar</button>
                            <button onClick={handleSaveConfig} className="w-full bg-green-500 py-2 rounded-full">Guardar</button>
                        </div>
                    </div>
                 </div>
            )}
        </div>
    );
};

export default ParentDashboard;