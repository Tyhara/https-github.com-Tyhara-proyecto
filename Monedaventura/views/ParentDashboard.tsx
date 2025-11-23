
import React, { useState, useEffect } from 'react';
import { User, ChildProfile } from '../types';
import { AVATARS } from '../data/gameData';
import { GameButton } from '../components/GameButton';
import { Plus, User as UserIcon, LogOut, Target, Zap, Gift, Edit, Trash2, X, Home, Settings, Check, Gamepad2 } from 'lucide-react';
import { CoinIcon } from '../components/CoinIcon';

interface ParentDashboardProps {
  user: User;
  onSelectProfile: (profile: ChildProfile) => void;
  onAddProfile: (name: string, grade: string, avatar: string) => void;
  onEditProfile: (id: string, data: { name: string; grade: string; avatar: string }) => void;
  onDeleteProfile: (id: string) => void;
  onAddGoal: (childId: string, title: string, target: number, icon: string) => void;
  onGiveReward: (childId: string, amount: number) => void;
  onPlayAsTutor: () => void;
  onLogout: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ 
    user, onSelectProfile, onAddProfile, onEditProfile, onDeleteProfile, onAddGoal, onGiveReward, onPlayAsTutor, onLogout 
}) => {
  const [mode, setMode] = useState<'DASHBOARD' | 'ADD_PROFILE' | 'ADD_GOAL' | 'GIVE_REWARD'>('DASHBOARD');
  
  // Profile Form State
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('2º');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);
  
  // Goal Form State
  const [goalChildId, setGoalChildId] = useState(user.children.length > 0 ? user.children[0].id : '');
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState(100);
  const [goalIcon, setGoalIcon] = useState('🚲');

  // Reward Form State
  const [rewardChildId, setRewardChildId] = useState(user.children.length > 0 ? user.children[0].id : '');
  const [rewardAmount, setRewardAmount] = useState(50);

  const GRADES = ['2º', '3º', '4º', '5º', '6º'];
  const GOAL_ICONS = ['🚲', '🎮', '📚', '⚽', '🎸', '📱', '🎨', '👟', '🐕'];

  // --- HANDLERS ---

  const openAddProfile = () => {
      setMode('ADD_PROFILE');
      setEditingProfileId(null);
      setNewName('');
      setNewGrade('2º');
      setSelectedAvatar(AVATARS[0].id);
  };

  const openEditProfile = (e: React.MouseEvent, child: ChildProfile) => {
      e.stopPropagation(); 
      setMode('ADD_PROFILE');
      setEditingProfileId(child.id);
      setNewName(child.name);
      setNewGrade(child.grade);
      setSelectedAvatar(child.avatar);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if(window.confirm("¿Estás seguro de que quieres eliminar este perfil permanentemente?")) {
          onDeleteProfile(id);
      }
  };

  const handleProfileSubmit = () => {
    if (!newName.trim()) return;
    if (editingProfileId) {
        onEditProfile(editingProfileId, { name: newName, grade: newGrade, avatar: selectedAvatar });
    } else {
        onAddProfile(newName, newGrade, selectedAvatar);
    }
    setMode('DASHBOARD');
  };

  const handleGoalSubmit = () => {
      if (!goalTitle.trim() || !goalChildId) return;
      onAddGoal(goalChildId, goalTitle, goalTarget, goalIcon);
      setMode('DASHBOARD');
      setGoalTitle('');
      setGoalTarget(100);
  };

  const handleRewardSubmit = () => {
      if (!rewardChildId) return;
      onGiveReward(rewardChildId, rewardAmount);
      setMode('DASHBOARD');
      setRewardAmount(50);
  };

  // --- DATA COMPUTATION ---
  const totalCoins = user.children.reduce((acc, child) => acc + child.stats.coins, 0);
  const missionsCompleted = user.children.reduce((acc, child) => acc + child.completedLevels.length, 0);
  
  const recentActivities = user.children
    .flatMap(child => (child.activityLog || []).map(log => ({ ...log, childName: child.name })))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const hasActiveGoals = user.children.some(c => c.goals && c.goals.length > 0);

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR (Desktop only, mobile uses header) */}
      <div className="hidden md:flex w-64 bg-[#0c4a6e] text-white flex-col shrink-0 sticky top-0 h-screen z-50 shadow-2xl">
         <div className="p-8 flex items-center gap-3 border-b border-sky-800">
             <div className="bg-sky-500 p-2 rounded-xl shadow-lg"><Target className="text-white" size={24}/></div>
             <h1 className="font-display text-2xl font-black tracking-wide text-sky-100">Panel Familiar</h1>
         </div>
         
         <nav className="flex-1 p-4 space-y-2">
             <button onClick={() => setMode('DASHBOARD')} className={`w-full flex items-center gap-3 p-3 rounded-xl shadow-md transition-transform active:scale-95 ${mode === 'DASHBOARD' ? 'bg-sky-600 ring-2 ring-sky-400' : 'bg-sky-900/50 hover:bg-sky-800'}`}>
                 <Home size={20} /> <span className="font-bold">Inicio</span>
             </button>
             <button onClick={() => setMode('ADD_GOAL')} className="w-full flex items-center gap-3 p-3 text-sky-200 hover:bg-sky-900 hover:text-white rounded-xl transition-colors">
                 <Target size={20} /> <span className="font-bold">Agregar Meta</span>
             </button>
             <button onClick={() => setMode('GIVE_REWARD')} className="w-full flex items-center gap-3 p-3 text-sky-200 hover:bg-sky-900 hover:text-white rounded-xl transition-colors">
                 <Gift size={20} /> <span className="font-bold">Dar Premio</span>
             </button>
         </nav>

         <div className="p-4 border-t border-sky-800">
            <button onClick={onLogout} className="w-full flex items-center gap-2 text-red-300 hover:text-red-100 hover:bg-red-900/30 p-3 rounded-xl text-sm font-bold transition-colors">
                <LogOut size={18} /> <span>Cerrar Sesión</span>
            </button>
         </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
         
         {/* MOBILE HEADER */}
         <div className="bg-sky-400 p-4 -mx-4 -mt-4 rounded-b-3xl md:hidden text-white flex justify-between items-center mb-6 shadow-md">
             <h1 className="font-display font-bold text-xl">Panel Familiar</h1>
             <button onClick={onLogout} className="p-2 hover:bg-sky-500 rounded-full"><LogOut size={20} /></button>
         </div>

         {/* 1. GREETING */}
         <div className="mb-8 px-2">
             <h1 className="text-3xl font-display font-black text-slate-800 mb-1">
                Hola, {user.username} 👋
             </h1>
             <p className="text-slate-500 font-medium text-sm md:text-base">Gestiona el progreso de tus aventureros</p>
         </div>

         {/* 2. STATS CARDS */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Orange */}
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-amber-100 text-xs uppercase tracking-wide mb-1">Total de Monedas</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black font-display">{totalCoins}</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">↗ +15% esta semana</span>
                    </div>
                </div>
                <Zap className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-20" size={60} />
            </div>

            {/* Green */}
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-emerald-100 text-xs uppercase tracking-wide mb-1">Misiones Completadas</h3>
                    <div className="text-3xl font-black font-display">{missionsCompleted}</div>
                </div>
                <Target className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-20" size={60} />
            </div>

            {/* Blue */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-indigo-100 text-xs uppercase tracking-wide mb-1">Perfiles Activos</h3>
                    <div className="text-3xl font-black font-display">{user.children.length}</div>
                </div>
                <UserIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-20" size={60} />
            </div>
         </div>

         {/* 3. METAS ACTIVAS */}
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
             <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-display font-black text-slate-800">Metas Activas</h2>
                 <button onClick={() => setMode('ADD_GOAL')} className="bg-sky-50 text-sky-500 hover:bg-sky-100 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                     <Plus size={16} /> Agregar Meta
                 </button>
             </div>
             
             {hasActiveGoals ? (
                 <div className="space-y-3">
                     {user.children.flatMap(c => c.goals || []).slice(0, 3).map(goal => (
                         <div key={goal.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                             <div className="text-2xl">{goal.icon}</div>
                             <div className="flex-1">
                                 <div className="flex justify-between mb-1">
                                     <span className="font-bold text-slate-700 text-sm">{goal.title}</span>
                                     <span className="text-xs font-bold text-slate-400">{goal.currentAmount}/{goal.targetAmount}</span>
                                 </div>
                                 <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                     <div className="bg-sky-500 h-full" style={{width: `${Math.min(100, (goal.currentAmount/goal.targetAmount)*100)}%`}}></div>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             ) : (
                 <div className="text-center py-6">
                     <p className="text-slate-400 text-sm font-medium">No hay metas activas.</p>
                 </div>
             )}
         </div>

         {/* 4. PERFILES DE ESTUDIANTES */}
         <div className="mb-8">
             <h2 className="text-xl font-display font-black text-slate-800 mb-4 px-2">Perfiles de Estudiantes</h2>
             <div className="space-y-4">
                 {user.children.map(child => (
                     <div key={child.id} onClick={() => onSelectProfile(child)} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                         <div className="flex items-start gap-4 mb-4 relative">
                             <div className="w-14 h-14 rounded-full bg-orange-100 overflow-hidden border-2 border-slate-100 shrink-0">
                                <img src={AVATARS.find(a => a.id === child.avatar)?.image || AVATARS[0].image} alt="" className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1">
                                 <h3 className="font-black text-lg text-slate-800">{child.name}</h3>
                                 <p className="text-slate-500 text-xs font-bold">{child.grade} • {child.stats.coins} Monedas</p>
                             </div>
                             <div className="text-slate-300 p-1">
                                 <Settings size={20} />
                             </div>
                         </div>
                         
                         <div className="flex gap-3 pt-2 border-t border-slate-50 mt-2">
                             <button onClick={(e) => openEditProfile(e, child)} className="flex-1 bg-sky-50 text-sky-600 hover:bg-sky-100 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                                 <Edit size={16} /> Editar
                             </button>
                             <button onClick={(e) => handleDelete(e, child.id)} className="flex-1 bg-rose-50 text-rose-500 hover:bg-rose-100 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                                 <Trash2 size={16} /> Eliminar
                             </button>
                         </div>
                     </div>
                 ))}
                 
                 {/* Nuevo Perfil */}
                 <button onClick={openAddProfile} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-3xl text-slate-400 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-sky-300 hover:text-sky-500 transition-all">
                     <Plus size={20} /> Nuevo Perfil
                 </button>
             </div>
         </div>

         {/* 5. ACTIVIDAD RECIENTE */}
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
             <h2 className="text-xl font-display font-black text-slate-800 mb-4">Actividad Reciente</h2>
             <div className="space-y-4">
                 {recentActivities.length > 0 ? recentActivities.map((activity, idx) => (
                     <div key={idx} className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                             <Zap size={20} />
                         </div>
                         <div className="flex-1 min-w-0">
                             <p className="font-bold text-slate-700 text-sm truncate">{activity.title}</p>
                             <p className="text-xs text-slate-400">{activity.childName} • {activity.timestamp}</p>
                         </div>
                         {activity.coinsEarned !== undefined && activity.coinsEarned !== 0 && (
                             <span className="font-bold text-amber-500 text-sm">+{activity.coinsEarned} 🪙</span>
                         )}
                     </div>
                 )) : (
                     <div className="text-center py-4 text-slate-400 text-sm italic">Sin actividad reciente.</div>
                 )}
             </div>
         </div>

         {/* 6. ACCIONES RÁPIDAS */}
         <div className="bg-sky-400 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden">
             <div className="relative z-10">
                 <h2 className="text-xl font-display font-black mb-4">Acciones Rápidas</h2>
                 <div className="space-y-3">
                     <button onClick={() => setMode('ADD_GOAL')} className="w-full bg-white/20 hover:bg-white/30 text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-colors">
                         <Plus size={18} /> Asignar nueva meta
                     </button>
                     <button onClick={() => setMode('GIVE_REWARD')} className="w-full bg-white/20 hover:bg-white/30 text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-colors">
                         <Gift size={18} /> Dar recompensa
                     </button>
                     <button onClick={onPlayAsTutor} className="w-full bg-white/20 hover:bg-white/30 text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-colors">
                         <Gamepad2 size={18} /> Probar Juego
                     </button>
                 </div>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
         </div>

      </div>

      {/* --- MODALS --- */}

      {/* ADD / EDIT PROFILE MODAL */}
      {mode === 'ADD_PROFILE' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-display font-black text-slate-800">
                        {editingProfileId ? 'Editar Estudiante' : 'Nuevo Estudiante'}
                    </h2>
                    <button onClick={() => setMode('DASHBOARD')} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 text-slate-500">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Nombre del Niño/a</label>
                        <input 
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-800 focus:border-sky-400 focus:bg-white outline-none transition-colors"
                            placeholder="Ej: Sofía"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Grado Escolar</label>
                        <div className="flex gap-2">
                            {GRADES.map(grade => (
                                <button
                                    key={grade}
                                    onClick={() => setNewGrade(grade)}
                                    className={`flex-1 py-3 rounded-xl font-black border-b-4 active:border-b-0 active:translate-y-1 transition-all
                                        ${newGrade === grade 
                                            ? 'bg-sky-500 text-white border-sky-700 shadow-lg' 
                                            : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'}
                                    `}
                                >
                                    {grade}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Elige un Avatar</label>
                        <div className="grid grid-cols-4 gap-3 h-40 overflow-y-auto p-2 bg-slate-50 rounded-2xl border-2 border-slate-200">
                            {AVATARS.map(avatar => (
                                <button
                                    key={avatar.id}
                                    onClick={() => setSelectedAvatar(avatar.id)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all relative
                                        ${selectedAvatar === avatar.id ? 'border-sky-500 ring-2 ring-sky-200 scale-105 z-10' : 'border-transparent hover:border-slate-300 opacity-70 hover:opacity-100'}
                                    `}
                                >
                                    <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
                                    {selectedAvatar === avatar.id && (
                                        <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
                                            <Check className="text-white drop-shadow-md" strokeWidth={3} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <GameButton onClick={handleProfileSubmit} fullWidth className="mt-4">
                        {editingProfileId ? 'Guardar Cambios' : 'Crear Perfil'}
                    </GameButton>
                </div>
            </div>
        </div>
      )}

      {/* ADD GOAL MODAL */}
      {mode === 'ADD_GOAL' && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in-95">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-display font-black text-slate-800 flex items-center gap-2">
                          <Target className="text-pink-500" /> Nueva Meta de Ahorro
                      </h2>
                      <button onClick={() => setMode('DASHBOARD')} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 text-slate-500"><X size={24} /></button>
                  </div>

                  <div className="space-y-6">
                      <div>
                          <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">¿Para quién es la meta?</label>
                          <select 
                            value={goalChildId} 
                            onChange={(e) => setGoalChildId(e.target.value)}
                            className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-pink-400"
                          >
                              {user.children.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                      </div>

                      <div>
                          <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Nombre de la Meta</label>
                          <input 
                            value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)}
                            placeholder="Ej: Bicicleta Nueva"
                            className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-800 focus:border-pink-400 outline-none"
                          />
                      </div>

                      <div>
                          <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Monto Objetivo (Monedas)</label>
                          <div className="flex items-center gap-4">
                             <button onClick={() => setGoalTarget(Math.max(10, goalTarget - 10))} className="bg-slate-200 p-3 rounded-xl font-black text-slate-600 hover:bg-slate-300">-</button>
                             <div className="flex-1 bg-slate-50 border-2 border-slate-200 p-3 rounded-xl text-center font-black text-xl text-slate-800 flex items-center justify-center gap-2">
                                <CoinIcon size={24} /> {goalTarget}
                             </div>
                             <button onClick={() => setGoalTarget(goalTarget + 10)} className="bg-slate-200 p-3 rounded-xl font-black text-slate-600 hover:bg-slate-300">+</button>
                          </div>
                      </div>

                      <div>
                          <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Icono</label>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                              {GOAL_ICONS.map(icon => (
                                  <button 
                                    key={icon} 
                                    onClick={() => setGoalIcon(icon)}
                                    className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center border-2 transition-all ${goalIcon === icon ? 'bg-pink-100 border-pink-500 scale-110' : 'bg-slate-50 border-slate-200'}`}
                                  >
                                      {icon}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <GameButton onClick={handleGoalSubmit} variant="success" fullWidth>Crear Meta</GameButton>
                  </div>
              </div>
          </div>
      )}

      {/* GIVE REWARD MODAL */}
      {mode === 'GIVE_REWARD' && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 border-4 border-yellow-400">
                  <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 animate-bounce">
                          <Gift size={40} />
                      </div>
                      <h2 className="text-2xl font-display font-black text-slate-800">¡Dar Recompensa!</h2>
                      <p className="text-slate-500 font-bold text-sm">Premia el buen comportamiento</p>
                  </div>

                  <div className="space-y-6">
                      <select 
                        value={rewardChildId} 
                        onChange={(e) => setRewardChildId(e.target.value)}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-yellow-400"
                      >
                          {user.children.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>

                      <div className="grid grid-cols-3 gap-3">
                          {[20, 50, 100].map(amount => (
                              <button 
                                key={amount} 
                                onClick={() => setRewardAmount(amount)}
                                className={`py-4 rounded-2xl font-black border-b-4 active:translate-y-1 active:border-b-0 transition-all flex flex-col items-center gap-1
                                    ${rewardAmount === amount ? 'bg-yellow-400 border-yellow-600 text-yellow-900 shadow-lg' : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-yellow-50'}
                                `}
                              >
                                  <span className="text-2xl">+{amount}</span>
                                  <CoinIcon size={20} />
                              </button>
                          ))}
                      </div>

                      <GameButton onClick={handleRewardSubmit} fullWidth>Enviar Monedas</GameButton>
                      <button onClick={() => setMode('DASHBOARD')} className="w-full py-3 text-slate-400 font-bold hover:text-slate-600">Cancelar</button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};
