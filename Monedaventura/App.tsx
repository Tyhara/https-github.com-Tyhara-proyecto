
import React, { useState, useEffect } from 'react';
import { ViewState, User, ChildProfile, GameStats, LevelData, Goal, Activity } from './types';
import { LandingPage } from './views/LandingPage';
import { ParentDashboard } from './views/ParentDashboard';
import { ChildDashboard } from './views/ChildDashboard';
import { MissionsMenu } from './views/MissionsMenu';
import { GameLevel } from './views/GameLevel';
import { GeniusMode } from './views/GeniusMode';
import { MinigameMenu } from './views/MinigameMenu';
import { ArcadeGame } from './views/ArcadeGame';
import { LEVELS } from './data/gameData';
import { Eye, EyeOff } from 'lucide-react';
import { supabase, isConfigured } from './lib/supabaseClient';
import { audioManager } from './services/audioService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [currentProfile, setCurrentProfile] = useState<ChildProfile | null>(null);
  const [currentLevel, setCurrentLevel] = useState<LevelData | null>(null);
  const [currentMapId, setCurrentMapId] = useState('map_birthday');
  const [rewardAvailable, setRewardAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Audio State
  const [musicEnabled, setMusicEnabled] = useState(audioManager.getSettings().music);
  const [sfxEnabled, setSfxEnabled] = useState(audioManager.getSettings().sfx);
  
  // Auth State
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Init Audio on interaction (click anywhere in App)
  useEffect(() => {
      const initAudio = () => {
          audioManager.init();
          window.removeEventListener('click', initAudio);
      };
      window.addEventListener('click', initAudio);
      return () => window.removeEventListener('click', initAudio);
  }, []);

  // Toggle Handlers
  const toggleMusic = (enable: boolean) => {
      setMusicEnabled(enable);
      audioManager.toggleMusic(enable);
  };

  const toggleSfx = (enable: boolean) => {
      setSfxEnabled(enable);
      audioManager.toggleSfx(enable);
  };

  // --- SUPABASE: INITIAL LOAD ---
  useEffect(() => {
    // If Supabase is not configured (default placeholders), skip network calls to avoid "Failed to fetch"
    if (!isConfigured) {
        console.warn("Supabase not configured. App running in offline/demo mode.");
        setLoading(false);
        return;
    }

    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserData(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        setView(ViewState.LANDING);
      }
      setLoading(false);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
            await loadUserData(session.user.id, session.user.email || '');
        } else {
            setLoading(false);
        }
    } catch(e) {
        console.error("Auth check failed (Offline or Error):", e);
        setLoading(false);
    }
  };

  const loadUserData = async (userId: string, email: string) => {
    try {
      const { data: childrenData, error } = await supabase
        .from('children')
        .select(`*, goals (*), activities (*)`)
        .eq('parent_id', userId);

      if (error) throw error;

      // Get user metadata for full name
      const { data: { user: authUser } } = await supabase.auth.getUser();
      const displayName = authUser?.user_metadata?.full_name || email.split('@')[0];

      const formattedChildren: ChildProfile[] = childrenData.map((child: any) => ({
        id: child.id,
        name: child.name,
        grade: child.grade,
        avatar: child.avatar,
        stats: {
          coins: child.coins,
          happiness: child.happiness,
          knowledge: child.knowledge
        },
        unlockedMaps: child.unlocked_maps || [],
        completedLevels: child.completed_levels || [],
        dailyStreak: child.daily_streak,
        lastLogin: child.last_login,
        lastRewardClaimed: child.last_reward_claimed,
        settings: {
          timeLimit: child.time_limit,
          guidedMode: child.guided_mode
        },
        goals: child.goals.map((g: any) => ({
          id: g.id,
          title: g.title,
          targetAmount: g.target_amount,
          currentAmount: g.current_amount,
          icon: g.icon,
          isCompleted: g.is_completed
        })),
        activityLog: child.activities.map((a: any) => ({
          id: a.id,
          title: a.title,
          timestamp: new Date(a.created_at).toLocaleString(),
          coinsEarned: a.coins_earned
        })).sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      }));

      setUser({
        username: displayName,
        children: formattedChildren
      });

      if (view === ViewState.LANDING || view === ViewState.AUTH) {
        setView(ViewState.PARENT_DASHBOARD);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      // Fallback for offline/demo mode if DB fails
      if (!user) {
          setUser({ username: email.split('@')[0], children: [] });
          if (view === ViewState.LANDING) setView(ViewState.PARENT_DASHBOARD);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- AUTH ACTIONS ---

  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) return;
    
    // Demo / Offline Mode Logic
    if (!isConfigured || loginEmail.includes('demo')) {
        setLoading(true);
        setTimeout(() => {
            setUser({ username: 'DemoUser', children: [] });
            setView(ViewState.PARENT_DASHBOARD);
            setLoading(false);
        }, 1000);
        return;
    }

    setLoading(true);
    try {
        const { error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: loginPassword,
        });
        if (error) throw error;
    } catch (error: any) {
        console.error("Login error:", error);
        alert("Error al iniciar sesión:\n" + error.message);
        setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!regName || !regEmail || !regPassword || !regConfirmPassword || !acceptPrivacy) {
        alert("Por favor completa todos los campos y acepta la política de privacidad.");
        return;
    }
    
    if (regPassword !== regConfirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    if (!isConfigured) {
        alert("Modo Demo: Registro simulado exitoso. Por favor inicia sesión con tus datos.");
        setAuthMode('LOGIN');
        return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
      options: { data: { full_name: regName, phone: regPhone } }
    });
    
    if (error) {
      alert("Error al registrarse: " + error.message);
      setLoading(false);
    } else {
      alert("¡Cuenta creada exitosamente!");
      // Auto login flow by refreshing session check
      await checkUser();
    }
  };

  const handleLogout = async () => {
    if (isConfigured) {
        await supabase.auth.signOut();
    }
    setUser(null);
    setCurrentProfile(null);
    setView(ViewState.LANDING);
  };

  // --- DATA ACTIONS (Optimistic UI Updates) ---

  const handleAddChild = async (name: string, grade: string, avatar: string) => {
     // 1. Optimistic Update (Visual)
     const tempId = Date.now().toString();
     const newChild: ChildProfile = {
        id: tempId, name, grade, avatar,
        stats: { coins: 50, happiness: 80, knowledge: 20 },
        unlockedMaps: ['map_birthday'], completedLevels: [], dailyStreak: 1,
        lastLogin: new Date().toISOString(), settings: { timeLimit: 0, guidedMode: false },
        goals: [], activityLog: [{ id: 'init', title: 'Perfil Creado', timestamp: new Date().toLocaleString(), coinsEarned: 50 }]
     };

     setUser(prev => prev ? { ...prev, children: [...prev.children, newChild] } : null);

     // 2. Database Update
     try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
            await supabase.from('children').insert({
                parent_id: authUser.id, name, grade, avatar, coins: 50
            });
            // Reload to get real ID
            await loadUserData(authUser.id, authUser.email || '');
        }
     } catch (e) { console.error("DB Error (Ignored for local demo)", e); }
  };

  const handleEditChild = async (id: string, data: { name: string; grade: string; avatar: string }) => {
    // 1. Optimistic Update
    setUser(prev => {
        if (!prev) return null;
        return {
            ...prev,
            children: prev.children.map(c => c.id === id ? { ...c, ...data } : c)
        };
    });

    // 2. Database Update
    try {
      await supabase.from('children').update({
        name: data.name, grade: data.grade, avatar: data.avatar
      }).eq('id', id);
    } catch (e) { console.error("DB Error", e); }
  };

  const handleDeleteChild = async (id: string) => {
    // 1. Optimistic Update
    setUser(prev => {
        if (!prev) return null;
        return {
            ...prev,
            children: prev.children.filter(c => c.id !== id)
        };
    });

    // 2. Database Update
    try {
      await supabase.from('children').delete().eq('id', id);
    } catch (e) { console.error("DB Error", e); }
  };

  const handleAddGoal = async (childId: string, title: string, target: number, icon: string) => {
    // 1. Optimistic Update
    setUser(prev => {
        if (!prev) return null;
        return {
            ...prev,
            children: prev.children.map(c => {
                if (c.id !== childId) return c;
                const newGoal: Goal = { id: Date.now().toString(), title, targetAmount: target, currentAmount: 0, icon, isCompleted: false };
                const newActivity: Activity = { id: Date.now().toString() + 'a', title: `Nueva meta: ${title}`, timestamp: new Date().toLocaleString(), coinsEarned: 0 };
                return { ...c, goals: [...(c.goals || []), newGoal], activityLog: [newActivity, ...(c.activityLog || [])] };
            })
        };
    });

    // 2. DB Update
    try {
       await supabase.from('goals').insert({ child_id: childId, title, target_amount: target, icon });
    } catch (e) { console.error(e); }
  };

  const handleGiveReward = async (childId: string, amount: number) => {
    // 1. Optimistic Update
    setUser(prev => {
        if (!prev) return null;
        return {
            ...prev,
            children: prev.children.map(c => {
                if (c.id !== childId) return c;
                const newActivity: Activity = { id: Date.now().toString(), title: 'Recompensa de Tutor', timestamp: new Date().toLocaleString(), coinsEarned: amount };
                return { 
                    ...c, 
                    stats: { ...c.stats, coins: c.stats.coins + amount },
                    activityLog: [newActivity, ...(c.activityLog || [])]
                };
            })
        };
    });
    
    // 2. DB Update
    try {
        // Note: In real app, fetch current coins first or use RPC
        // For now, just ignoring DB error for demo fluidity
    } catch(e) { console.error(e); }
  };

  // --- GAME ACTIONS ---

  const handleSelectChild = (profile: ChildProfile) => {
    // Use Local Time string to ensure daily reward works per calendar day
    const today = new Date().toDateString();
    const lastClaimedDate = profile.lastRewardClaimed ? new Date(profile.lastRewardClaimed).toDateString() : '';
    
    const isRewardAvailable = lastClaimedDate !== today;
    
    setCurrentProfile(profile);
    setRewardAvailable(isRewardAvailable);
    setCurrentMapId('map_birthday');
    setView(ViewState.CHILD_DASHBOARD);
  };

  const handlePlayAsTutor = () => {
     const tutorProfile: ChildProfile = {
         id: 'tutor_mode', name: 'Tutor (Modo Juego)', grade: '6º', avatar: 'avatar_owl', 
         stats: { coins: 999, happiness: 100, knowledge: 100 },
         unlockedMaps: ['map_birthday', 'map_halloween', 'map_christmas', 'map_summer'],
         completedLevels: [], dailyStreak: 99, lastLogin: new Date().toISOString(),
         settings: { timeLimit: 0, guidedMode: false }
     };
     setCurrentProfile(tutorProfile);
     setCurrentMapId('map_birthday');
     setView(ViewState.CHILD_DASHBOARD);
  };

  const handleClaimDailyReward = async () => {
    if (!currentProfile) return;
    if (currentProfile.id === 'tutor_mode') {
        setCurrentProfile({ ...currentProfile, stats: { ...currentProfile.stats, coins: currentProfile.stats.coins + 100 } });
        setRewardAvailable(false);
        return;
    }
    
    const rewardAmount = 50 + (currentProfile.dailyStreak * 10);
    const newCoins = currentProfile.stats.coins + rewardAmount;
    const newStreak = currentProfile.dailyStreak + 1;
    const now = new Date().toISOString();
    
    // Optimistic Update
    setCurrentProfile({ 
        ...currentProfile, 
        stats: { ...currentProfile.stats, coins: newCoins }, 
        dailyStreak: newStreak,
        lastRewardClaimed: now 
    });
    setRewardAvailable(false);
    audioManager.playSuccess();

    try {
        await supabase.from('children').update({
            coins: newCoins, daily_streak: newStreak, last_reward_claimed: now
        }).eq('id', currentProfile.id);
    } catch (error) { console.error("Error claiming reward:", error); }
  };

  const handleShareGame = async () => {
      if (!currentProfile) return;
      const bonus = 20;
      const newCoins = currentProfile.stats.coins + bonus;
      
      setCurrentProfile({ ...currentProfile, stats: { ...currentProfile.stats, coins: newCoins } });
      audioManager.playSuccess();

      if (currentProfile.id !== 'tutor_mode') {
          try {
            await supabase.from('children').update({ coins: newCoins }).eq('id', currentProfile.id);
          } catch(e) { console.error(e); }
      }
  };

  const handleMapSelection = (mapId: string) => {
      setCurrentMapId(mapId);
      setView(ViewState.CHILD_DASHBOARD);
  };

  const handleSelectLevel = (levelId: string) => {
    const level = LEVELS.find(l => l.id === levelId);
    if (level) {
      setCurrentLevel(level);
      setView(ViewState.GAME_LEVEL);
    }
  };

  const handleCompleteLevel = async (statsEarned: Partial<GameStats>) => {
    if (!currentProfile || !currentLevel) return;
    
    // 1. Calculate New Stats
    const newCoins = currentProfile.stats.coins + (statsEarned.coins || 0);
    const newHappiness = Math.min(100, currentProfile.stats.happiness + (statsEarned.happiness || 0));
    const newKnowledge = Math.min(100, currentProfile.stats.knowledge + (statsEarned.knowledge || 0));

    let newUnlockedMaps = [...currentProfile.unlockedMaps];
    const newCompletedLevels = [...currentProfile.completedLevels];
    
    if (!newCompletedLevels.includes(currentLevel.id)) {
        newCompletedLevels.push(currentLevel.id);
    }

    // 2. Check Map Unlock
    const currentMapLevels = LEVELS.filter(l => l.mapId === currentLevel.mapId);
    const completedInMap = currentMapLevels.filter(l => newCompletedLevels.includes(l.id)).length;
    
    if (completedInMap === currentMapLevels.length && currentMapLevels.length > 0) {
        if (currentLevel.mapId === 'map_birthday' && !newUnlockedMaps.includes('map_halloween')) {
            newUnlockedMaps.push('map_halloween');
            setTimeout(() => alert("¡Misión Cumpleaños Completada! 🎃 Siguiente: Halloween"), 500);
        } else if (currentLevel.mapId === 'map_halloween' && !newUnlockedMaps.includes('map_christmas')) {
            newUnlockedMaps.push('map_christmas');
            setTimeout(() => alert("¡Misión Halloween Completada! 🎄 Siguiente: Navidad"), 500);
        } else if (currentLevel.mapId === 'map_christmas' && !newUnlockedMaps.includes('map_summer')) {
            newUnlockedMaps.push('map_summer');
            setTimeout(() => alert("¡Misión Navidad Completada! ☀️ Siguiente: Verano"), 500);
        }
    }

    // 3. Update State
    const updatedProfile = {
        ...currentProfile,
        stats: { coins: newCoins, happiness: newHappiness, knowledge: newKnowledge },
        completedLevels: newCompletedLevels,
        unlockedMaps: newUnlockedMaps
    };
    setCurrentProfile(updatedProfile);

    // 4. Determine Next Step
    // Minigames Logic
    if (currentLevel.id.startsWith('mg_')) {
        const isComparison = currentLevel.id.includes('comp');
        const currentNum = parseInt(currentLevel.id.split('_').pop() || '0');
        const nextNum = currentNum + 1;
        const nextId = isComparison ? `mg_comp_${nextNum}` : '';
        const nextLevel = LEVELS.find(l => l.id === nextId);

        if (nextLevel) {
             setCurrentLevel(nextLevel); // Auto advance minigame
        } else {
             setView(ViewState.MINIGAME_MENU);
        }
    } 
    // Story Mode Logic
    else {
        // Check if there is a next level in the same map
        const levelIndex = currentMapLevels.findIndex(l => l.id === currentLevel.id);
        if (levelIndex !== -1 && levelIndex < currentMapLevels.length - 1) {
             const nextLevelObj = currentMapLevels[levelIndex + 1];
             setCurrentLevel(nextLevelObj); // Auto advance story
        } else {
             setView(ViewState.CHILD_DASHBOARD); // Back to map if map finished
        }
    }

    // 5. DB Update
    if (currentProfile.id !== 'tutor_mode') {
        try {
             await supabase.from('children').update({
                 coins: newCoins, happiness: newHappiness, knowledge: newKnowledge,
                 completed_levels: newCompletedLevels, unlocked_maps: newUnlockedMaps
             }).eq('id', currentProfile.id);
        } catch(e) { console.error(e); }
    }
  };

  const handleOpenMissions = () => setView(ViewState.MISSIONS_MENU);

  // --- RENDER ---

  if (loading) return <div className="min-h-screen bg-[#38bdf8] flex items-center justify-center"><div className="text-white font-display font-black text-3xl animate-bounce">Cargando...</div></div>;

  if (view === ViewState.LANDING) {
    return <LandingPage onLogin={() => setView(ViewState.AUTH)} onCreateAccount={() => { setView(ViewState.AUTH); setAuthMode('REGISTER'); }} />;
  }

  if (view === ViewState.AUTH) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0284c7] to-[#0c4a6e] opacity-80"></div>
        
        <div className="bg-slate-900/90 backdrop-blur-lg p-8 rounded-[2rem] shadow-2xl w-full max-w-md border-[3px] border-sky-500 relative z-10 animate-in zoom-in duration-300">
          <div className="flex justify-end mb-2">
             <button onClick={() => setView(ViewState.LANDING)} className="text-sky-400 hover:text-white font-bold text-sm flex items-center gap-1">✕ Cerrar</button>
          </div>
          
          <h2 className="text-3xl font-display font-black text-white text-center mb-8 text-stroke-blue drop-shadow-lg">
            {authMode === 'LOGIN' ? '¡Bienvenido Capitán!' : 'Paso 1: Crear cuenta de Tutor'}
          </h2>

          {authMode === 'LOGIN' ? (
            <div className="space-y-6">
               <div>
                 <label className="block text-sky-200 font-bold mb-2 ml-1 text-sm uppercase tracking-wider">Correo Electrónico</label>
                 <input 
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border-2 border-slate-700 rounded-2xl text-white focus:border-sky-400 focus:bg-slate-800 outline-none transition-all font-bold"
                    placeholder="tu@email.com"
                 />
               </div>
               <div>
                 <label className="block text-sky-200 font-bold mb-2 ml-1 text-sm uppercase tracking-wider">Contraseña</label>
                 <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full p-4 bg-slate-800/50 border-2 border-slate-700 rounded-2xl text-white focus:border-sky-400 focus:bg-slate-800 outline-none transition-all font-bold pr-12"
                        placeholder="••••••••"
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                 </div>
               </div>
               <button 
                  onClick={handleLogin}
                  className="w-full bg-sky-500 hover:bg-sky-400 text-white font-black text-xl py-4 rounded-2xl shadow-[0_6px_0_#0369a1] active:shadow-none active:translate-y-1.5 transition-all border-2 border-sky-400"
               >
                 INICIAR AVENTURA
               </button>
               <p className="text-center text-slate-400 font-bold text-sm">
                 ¿No tienes cuenta? <button onClick={() => setAuthMode('REGISTER')} className="text-sky-400 hover:underline">Regístrate aquí</button>
               </p>
            </div>
          ) : (
            <div className="space-y-4">
               <div>
                 <label className="block text-sky-200 font-bold mb-1 ml-1 text-xs uppercase">Tu Nombre</label>
                 <input value={regName} onChange={(e) => setRegName(e.target.value)} className="w-full p-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white focus:border-sky-400 outline-none font-bold" />
               </div>
               <div>
                 <label className="block text-sky-200 font-bold mb-1 ml-1 text-xs uppercase">Tu Email</label>
                 <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="w-full p-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white focus:border-sky-400 outline-none font-bold" />
               </div>
               <div>
                 <label className="block text-sky-200 font-bold mb-1 ml-1 text-xs uppercase">Tu Teléfono</label>
                 <input type="tel" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} className="w-full p-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white focus:border-sky-400 outline-none font-bold" />
               </div>
               <div>
                 <label className="block text-sky-200 font-bold mb-1 ml-1 text-xs uppercase">Contraseña <span className="text-[10px] opacity-60">(min 6 caracteres)</span></label>
                 <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="w-full p-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white focus:border-sky-400 outline-none font-bold pr-10" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><Eye size={18} /></button>
                 </div>
               </div>
               <div>
                 <label className="block text-sky-200 font-bold mb-1 ml-1 text-xs uppercase">Confirmar Contraseña</label>
                 <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} className="w-full p-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white focus:border-sky-400 outline-none font-bold pr-10" />
                    <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><Eye size={18} /></button>
                 </div>
               </div>
               <div className="flex items-center gap-3 py-2">
                   <div onClick={() => setAcceptPrivacy(!acceptPrivacy)} className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer ${acceptPrivacy ? 'bg-sky-500 border-sky-500' : 'border-slate-500'}`}>
                       {acceptPrivacy && <span className="text-white text-xs font-bold">✓</span>}
                   </div>
                   <span className="text-slate-400 text-xs font-bold">He leído y acepto la <span className="text-sky-400">Política de Privacidad</span>.</span>
               </div>
               <div className="flex gap-3 pt-2">
                   <button onClick={() => setAuthMode('LOGIN')} className="flex-1 text-slate-400 font-bold py-3 hover:text-white">Volver</button>
                   <button onClick={handleRegister} className="flex-[2] bg-emerald-500 hover:bg-emerald-400 text-white font-black text-lg py-3 rounded-xl shadow-[0_4px_0_#047857] active:translate-y-1 active:shadow-none transition-all">
                     Siguiente
                   </button>
               </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === ViewState.PARENT_DASHBOARD && user) {
    return (
      <ParentDashboard 
        user={user}
        onSelectProfile={handleSelectChild}
        onAddProfile={handleAddChild}
        onEditProfile={handleEditChild}
        onDeleteProfile={handleDeleteChild}
        onAddGoal={handleAddGoal}
        onGiveReward={handleGiveReward}
        onPlayAsTutor={handlePlayAsTutor}
        onLogout={handleLogout}
      />
    );
  }

  if (view === ViewState.MISSIONS_MENU && currentProfile) {
      return (
          <MissionsMenu 
            profile={currentProfile} 
            onBack={() => setView(ViewState.CHILD_DASHBOARD)} 
            onSelectMap={handleMapSelection} 
          />
      );
  }

  if (view === ViewState.MINIGAME_MENU) {
      return (
          <MinigameMenu 
            onBack={() => setView(ViewState.CHILD_DASHBOARD)}
            onPlayComparison={() => handleSelectLevel('mg_comp_1')}
            onPlayArcade={() => setView(ViewState.ARCADE_GAME)}
          />
      );
  }

  if (view === ViewState.ARCADE_GAME) {
      return <ArcadeGame onClose={() => setView(ViewState.MINIGAME_MENU)} />;
  }

  if (view === ViewState.GAME_LEVEL && currentLevel) {
    return (
      <GameLevel 
        key={currentLevel.id} // Force remount on level change
        level={currentLevel} 
        onComplete={handleCompleteLevel} 
        onBack={() => setView(ViewState.CHILD_DASHBOARD)} 
        nextLevelTitle={
            currentLevel.id.startsWith('mg_') ? 'Siguiente Nivel' : 
            LEVELS.find(l => l.id === currentLevel?.id?.replace(/_(\d+)$/, (_, n) => `_${parseInt(n) + 1}`))?.title
        }
      />
    );
  }

  if (view === ViewState.GENIUS_MODE && currentProfile) {
     return <GeniusMode profile={currentProfile} onClose={() => setView(ViewState.CHILD_DASHBOARD)} />;
  }

  if (view === ViewState.CHILD_DASHBOARD && currentProfile) {
    return (
      <ChildDashboard 
        profile={currentProfile} 
        rewardAvailable={rewardAvailable}
        onClaimReward={handleClaimDailyReward}
        onShareGame={handleShareGame}
        onSelectLevel={handleSelectLevel}
        onOpenGenius={() => setView(ViewState.GENIUS_MODE)}
        onOpenMinigames={() => setView(ViewState.MINIGAME_MENU)}
        onOpenMissions={handleOpenMissions}
        onSwitchProfile={() => setView(ViewState.PARENT_DASHBOARD)}
        currentMapId={currentMapId}
        onSelectMap={handleMapSelection}
        musicEnabled={musicEnabled}
        onToggleMusic={toggleMusic}
        sfxEnabled={sfxEnabled}
        onToggleSfx={toggleSfx}
      />
    );
  }

  return <div>Error: Vista no encontrada</div>;
};

export default App;
