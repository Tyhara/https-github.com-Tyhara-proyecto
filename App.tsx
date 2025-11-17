import React, { useState, useEffect, useRef } from 'react';
import { ADVENTURE_MAPS, DAILY_REWARDS } from './constants';
import QuestionCard from './components/QuestionCard';
import ThinkingMode from './components/ThinkingMode';
import { TreasureChestIcon, UserIcon } from './components/Icons';
import { User, AppView, PlayerProgress, PlayerConfig, MonedaventuraData, AdventureState, StoryLevel, AdventureMapData } from './types';
import AuthScreen from './components/AuthScreen';
import BottomNav from './components/BottomNav';
import AdventureMap from './components/AdventureMap';
import BonusScreen from './components/BonusScreen';
import DailyReward from './components/DailyReward';
import ProfileScreen from './components/ProfileScreen';
import StatsDisplay from './components/StatsDisplay';
import ParentDashboard from './components/ParentDashboard';
import TimeUpModal from './components/TimeUpModal';
import LevelDetailModal from './components/LevelDetailModal';
import MapSelectionScreen from './components/MapSelectionScreen';
import LevelCompleteScreen from './components/LevelCompleteScreen';


type GameState = 'auth' | 'parentDashboard' | 'playingApp'; 

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('auth');
  const [tutor, setTutor] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // The active child player
  const [activeView, setActiveView] = useState<AppView>('map');
  
  const [adventureState, setAdventureState] = useState<AdventureState>('map_selection');
  const [activeMapId, setActiveMapId] = useState<string | null>(null);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  
  // Player progress, loaded for the currentUser
  const [playerProgress, setPlayerProgress] = useState<PlayerProgress | null>(null);
  
  // Parent/Tutor state
  const [timePlayed, setTimePlayed] = useState(0); // in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Daily Reward
  const [showDailyReward, setShowDailyReward] = useState(false);
  
  useEffect(() => {
    const storedDataJSON = localStorage.getItem('monedaventura_data');
    if (storedDataJSON) {
      let data: MonedaventuraData = JSON.parse(storedDataJSON);
      
      // Migration logic for old progress structure
      if (data.playerProgress) {
        Object.keys(data.playerProgress).forEach(username => {
            const progress = (data.playerProgress as any)[username];
            if (progress.level !== undefined && !progress.progressByMap) {
                progress.progressByMap = {
                    birthday: {
                        level: progress.level,
                        completedQuestions: progress.completedQuestions || {}
                    }
                };
                delete progress.level;
                delete progress.completedQuestions;
            }
        });
      }
      
      setTutor(data.tutor);
      setActiveMapId(data.activeMapId || null);
      
      const playerProgressMap = data.playerProgress || {};

      if (data.activePlayerUsername) {
        const allPlayers = [...(data.tutor.children || []), data.tutor];
        const activePlayer = allPlayers.find(c => c.username === data.activePlayerUsername);
        
        const progress = playerProgressMap[data.activePlayerUsername];
        if (activePlayer && progress) {
            setCurrentUser(activePlayer);
            setPlayerProgress(progress);
            
            const today = new Date().toISOString().split('T')[0];
            if (progress.lastLoginDate !== today) {
                setShowDailyReward(true);
            }
            
            setGameState('playingApp');
        } else {
            setGameState('parentDashboard');
        }
      } else {
         setGameState('parentDashboard');
      }
    }
  }, []);

  // Timer effect for parental controls
   useEffect(() => {
    if (gameState === 'playingApp' && playerProgress?.configuraciones?.tiempoMaximo) {
      timerRef.current = setInterval(() => {
        setTimePlayed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, playerProgress]);

  useEffect(() => {
    if (playerProgress?.configuraciones?.tiempoMaximo && timePlayed >= playerProgress.configuraciones.tiempoMaximo * 60) {
      setIsTimeUp(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [timePlayed, playerProgress]);

  const saveTutorData = (data: MonedaventuraData) => {
    localStorage.setItem('monedaventura_data', JSON.stringify(data));
  };
  
  const handleRegistrationSuccess = (newTutor: User, firstPlayer: User) => {
    const initialProgress: PlayerProgress = { 
        score: 100, 
        happiness: 50, 
        knowledge: 10, 
        progressByMap: {
            'birthday': { level: 0, completedQuestions: {} }
        }, 
        loginStreak: 1, 
        stats: { correct: 0, incorrect: 0 }, 
        configuraciones: { tiempoMaximo: undefined, modoGuiado: false }
    };
    
    const tutorProgressKey = newTutor.username;
    const firstPlayerProgressKey = firstPlayer.username;

    const playerProgressMap: { [username: string]: PlayerProgress } = {};
    
    playerProgressMap[tutorProgressKey] = { ...initialProgress };

    if(tutorProgressKey !== firstPlayerProgressKey) {
        playerProgressMap[firstPlayerProgressKey] = { ...initialProgress };
    }

    const newData: MonedaventuraData = {
      tutor: newTutor,
      activePlayerUsername: firstPlayer.username,
      playerProgress: playerProgressMap
    };

    saveTutorData(newData);
    setTutor(newTutor);
    setCurrentUser(firstPlayer);
    setPlayerProgress(playerProgressMap[firstPlayer.username]);
    setGameState('playingApp');
    setShowDailyReward(true);
  };

  const handleLoginSuccess = (loggedInTutor: User) => {
      const storedDataJSON = localStorage.getItem('monedaventura_data');
      if (!storedDataJSON) {
        setTutor(loggedInTutor);
        setGameState('parentDashboard');
        return;
      }
      
      const data: MonedaventuraData = JSON.parse(storedDataJSON);
      setTutor(data.tutor);
      setActiveMapId(data.activeMapId || null);
      const playerProgressMap = data.playerProgress || {};
      
      const allPlayers = [...(data.tutor.children || []), data.tutor];

      if (data.activePlayerUsername && playerProgressMap[data.activePlayerUsername]) {
          const activePlayer = allPlayers.find(c => c.username === data.activePlayerUsername);
          if (activePlayer) {
              setCurrentUser(activePlayer);
              setPlayerProgress(playerProgressMap[data.activePlayerUsername]);
              setGameState('playingApp');
              return;
          }
      }
      setGameState('parentDashboard');
  };


  const handleLogout = () => {
    localStorage.removeItem('monedaventura_data');
    setTutor(null);
    setCurrentUser(null);
    setPlayerProgress(null);
    setGameState('auth');
    setAdventureState('map_selection');
    setActiveMapId(null);
    setSelectedLevelIndex(null);
    setCurrentQuestionIndex(null);
  };
  
  const handleSelectMap = (mapId: string) => {
      setActiveMapId(mapId);
      setAdventureState('adventure_map');

      const storedData: MonedaventuraData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
      storedData.activeMapId = mapId as any;
      saveTutorData(storedData);
  }

  const handleSelectLevel = (levelIndex: number) => {
    if (playerProgress && activeMapId) {
       const mapProgress = playerProgress.progressByMap[activeMapId];
       if (mapProgress && levelIndex <= mapProgress.level) {
          setSelectedLevelIndex(levelIndex);
       }
    }
  };
  
  const handleSelectQuestion = (questionIndex: number) => {
      setCurrentQuestionIndex(questionIndex);
      setAdventureState('playing');
  };

  const handleCloseLevelDetail = () => {
      setSelectedLevelIndex(null);
  };

  const handleBackToMapSelection = () => {
      setActiveMapId(null);
      setAdventureState('map_selection');
      const storedData: MonedaventuraData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
      delete storedData.activeMapId;
      saveTutorData(storedData);
  }
  
  const handleProceedFromCompletion = () => {
    setSelectedLevelIndex(null);
    setCurrentQuestionIndex(null);
    setAdventureState('adventure_map');
  };

  const handleAnswer = (effects: { score: number, happiness: number, knowledge: number }) => {
    if (!currentUser || !playerProgress || !tutor || activeMapId === null || selectedLevelIndex === null || currentQuestionIndex === null) return;
    
    let updatedProgress = { ...playerProgress };
    
    updatedProgress.score = Math.max(0, playerProgress.score + effects.score);
    updatedProgress.happiness = Math.max(0, Math.min(100, playerProgress.happiness + effects.happiness));
    updatedProgress.knowledge = Math.max(0, playerProgress.knowledge + effects.knowledge);

    const isCorrect = effects.knowledge >= 0;
    
    const mapProgress = updatedProgress.progressByMap[activeMapId] || { level: 0, completedQuestions: {} };
    let levelIsNowComplete = false;

    if (isCorrect) {
        const completed = mapProgress.completedQuestions || {};
        const levelCompletions = completed[selectedLevelIndex] || [];
        if (!levelCompletions.includes(currentQuestionIndex)) {
            completed[selectedLevelIndex] = [...levelCompletions, currentQuestionIndex];
        }
        mapProgress.completedQuestions = completed;

        const currentMapData = ADVENTURE_MAPS.find(m => m.id === activeMapId);
        if (currentMapData) {
            const currentLevelData = currentMapData.levels[selectedLevelIndex];
            const allQuestionsInLevelAnswered = completed[selectedLevelIndex]?.length === currentLevelData.questions.length;

            if (allQuestionsInLevelAnswered && mapProgress.level === selectedLevelIndex) {
                mapProgress.level = mapProgress.level + 1;
                levelIsNowComplete = true;

                if (mapProgress.level === currentMapData.levels.length) {
                    const currentMapIndex = ADVENTURE_MAPS.findIndex(m => m.id === activeMapId);
                    const nextMap = ADVENTURE_MAPS[currentMapIndex + 1];
                    if (nextMap && !updatedProgress.progressByMap[nextMap.id]) {
                        updatedProgress.progressByMap[nextMap.id] = { level: 0, completedQuestions: {} };
                    }
                }
            }
        }
    }
    
    updatedProgress.progressByMap[activeMapId] = mapProgress;
    setPlayerProgress(updatedProgress);

    const storedData: MonedaventuraData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
    if (!storedData.playerProgress) storedData.playerProgress = {};
    storedData.playerProgress[currentUser.username] = updatedProgress;
    saveTutorData(storedData);
    
    if (levelIsNowComplete) {
        setAdventureState('level_complete');
    } else {
        setCurrentQuestionIndex(null);
        setAdventureState('adventure_map');
    }
  };
  
  const handleClaimReward = () => {
    if (!playerProgress || !currentUser || !tutor) return;

    const today = new Date().toISOString().split('T')[0];
    const lastLogin = playerProgress.lastLoginDate;
    let newStreak = 1;
    if (lastLogin) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastLogin === yesterday.toISOString().split('T')[0]) {
        newStreak = ((playerProgress.loginStreak || 0) % 7) + 1;
      }
    }

    const rewardAmount = DAILY_REWARDS[newStreak - 1] || 0;
    const newScore = playerProgress.score + rewardAmount;
    
    const updatedProgress = { ...playerProgress, score: newScore, loginStreak: newStreak, lastLoginDate: today };
    setPlayerProgress(updatedProgress);
    setShowDailyReward(false);
    
    const storedData: MonedaventuraData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
    if (!storedData.playerProgress) storedData.playerProgress = {};
    storedData.playerProgress[currentUser.username] = updatedProgress;
    saveTutorData(storedData);
  };
  
  const handleAddChild = (newChild: User) => {
      if(!tutor) return;
      const currentChildren = Array.isArray(tutor.children) ? tutor.children : [];
      const newTutor = { ...tutor, children: [...currentChildren, newChild] };
      setTutor(newTutor);

      const initialProgress: PlayerProgress = { 
        score: 100, 
        happiness: 50, 
        knowledge: 10, 
        stats: { correct: 0, incorrect: 0 }, 
        progressByMap: { 'birthday': { level: 0, completedQuestions: {} } }
      };
      
      const storedData: MonedaventuraData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
      storedData.tutor = newTutor;
      if (!storedData.playerProgress) storedData.playerProgress = {};
      storedData.playerProgress[newChild.username] = initialProgress;
      saveTutorData(storedData);
  }

  const handleSelectPlayer = (player: User) => {
      const storedData: MonedaventuraData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
      const playerProgressMap = storedData.playerProgress || {};
      
      setCurrentUser(player);
      setPlayerProgress(playerProgressMap[player.username]);
      storedData.activePlayerUsername = player.username;
      saveTutorData(storedData);
      setGameState('playingApp');
      setAdventureState('map_selection');
      setActiveMapId(null);
  }

  const handleConfigSave = (newConfig: PlayerConfig, username: string) => {
      if (!tutor) return;
      const storedData: MonedaventuraData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
      const progressMap = storedData.playerProgress || {};
      const progressToUpdate = progressMap[username];
      if(progressToUpdate) {
        progressToUpdate.configuraciones = newConfig;
        progressMap[username] = progressToUpdate;
        storedData.playerProgress = progressMap;
        saveTutorData(storedData);
        if(currentUser?.username === username) {
            setPlayerProgress(progressToUpdate);
        }
      }
  }
  
  const handleEditChild = (originalUsername: string, updatedData: User) => {
    if (!tutor) return;

    let finalTutor = tutor;
    const isEditingTutorProfile = originalUsername === tutor.username;
    
    if (isEditingTutorProfile) {
        finalTutor = { ...tutor, ...updatedData };
    } else {
        const updatedChildren = tutor.children?.map(child => 
            child.username === originalUsername ? { ...child, ...updatedData } : child
        ) || [];
        finalTutor = { ...tutor, children: updatedChildren };
    }
    
    setTutor(finalTutor);

    const storedData: MonedaventuraData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
    storedData.tutor = finalTutor;
    
    const progressMap = storedData.playerProgress || {};
    if (originalUsername !== updatedData.username && progressMap[originalUsername]) {
        progressMap[updatedData.username] = progressMap[originalUsername];
        delete progressMap[originalUsername];
        storedData.playerProgress = progressMap;
    }

    if (storedData.activePlayerUsername === originalUsername) {
        storedData.activePlayerUsername = updatedData.username;
    }

    saveTutorData(storedData);

    if (currentUser?.username === originalUsername) {
        setCurrentUser(prev => prev ? { ...prev, ...updatedData } : null);
    }
  };
  
  const handleDeleteChild = (usernameToDelete: string) => {
    if (!tutor || usernameToDelete === tutor.username) return; // Can't delete tutor

    const updatedChildren = tutor.children?.filter(child => child.username !== usernameToDelete);
    const newTutor = { ...tutor, children: updatedChildren };
    setTutor(newTutor);

    const storedData: MonedaventuraData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
    if (storedData.playerProgress) {
      delete storedData.playerProgress[usernameToDelete];
    }
    storedData.tutor = newTutor;

    if (storedData.activePlayerUsername === usernameToDelete) {
        storedData.activePlayerUsername = tutor.username; // Default back to tutor
        setCurrentUser(tutor);
        setPlayerProgress(storedData.playerProgress[tutor.username] || null);
    }
    
    saveTutorData(storedData);
  };
  
  const handleShareSuccess = () => {
    if (!currentUser || !playerProgress || !tutor) return;
    const updatedProgress = { ...playerProgress, score: playerProgress.score + 20 };
    setPlayerProgress(updatedProgress);

    const storedData: MonedaventuraData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
    if (!storedData.playerProgress) storedData.playerProgress = {};
    storedData.playerProgress[currentUser.username] = updatedProgress;
    saveTutorData(storedData);
  };


  if (gameState === 'auth') {
    return <AuthScreen onRegistrationSuccess={handleRegistrationSuccess} onLoginSuccess={handleLoginSuccess} />;
  }
  
  if (gameState === 'parentDashboard' && tutor) {
     const storedData = JSON.parse(localStorage.getItem('monedaventura_data') || '{}');
     const playerProgressData = storedData.playerProgress || {};
     return <ParentDashboard 
          tutor={tutor}
          playerProgressMap={playerProgressData}
          onAddChild={handleAddChild}
          onSelectPlayer={handleSelectPlayer}
          onLogout={handleLogout}
          onConfigSave={handleConfigSave}
          onEditChild={handleEditChild}
          onDeleteChild={handleDeleteChild}
      />;
  }
  
  if (gameState === 'playingApp' && currentUser && playerProgress) {
    const renderAdventureView = () => {
        if (adventureState === 'level_complete') {
            return <LevelCompleteScreen onNextLevel={handleProceedFromCompletion} />;
        }

        if (adventureState === 'playing' && activeMapId && selectedLevelIndex !== null && currentQuestionIndex !== null) {
            const mapData = ADVENTURE_MAPS.find(m => m.id === activeMapId);
            if (!mapData) return <div>Error: Mapa no encontrado</div>;
            
            const levelData = mapData.levels[selectedLevelIndex];
            const questionData = levelData.questions[currentQuestionIndex];
            return (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 bg-cover bg-center bg-[url('/imagenes/bg-story.png')] relative">
                <StatsDisplay score={playerProgress.score} happiness={playerProgress.happiness} knowledge={playerProgress.knowledge} />
                <div className="flex-grow w-full flex flex-col items-center justify-center">
                    <QuestionCard
                      key={`${selectedLevelIndex}-${currentQuestionIndex}`}
                      questionData={questionData}
                      onAnswer={handleAnswer}
                    />
                </div>
              </div>
            );
        }

        if (adventureState === 'adventure_map' && activeMapId) {
            const mapData = ADVENTURE_MAPS.find(m => m.id === activeMapId);
            if (!mapData) return <div>Error: Mapa no encontrado</div>;
            const mapProgress = playerProgress.progressByMap[activeMapId] || { level: 0, completedQuestions: {} };

            return (
                 <>
                    <AdventureMap 
                      mapData={mapData}
                      mapProgress={mapProgress}
                      onSelectLevel={handleSelectLevel}
                      onBackToSelection={handleBackToMapSelection}
                    />
                    {selectedLevelIndex !== null && (
                        <LevelDetailModal
                            levelData={mapData.levels[selectedLevelIndex]}
                            completedQuestionIndices={(mapProgress.completedQuestions || {})[selectedLevelIndex] || []}
                            onSelectQuestion={handleSelectQuestion}
                            onClose={handleCloseLevelDetail}
                        />
                    )}
                </>
            )
        }
        
        // Default: map_selection
        return (
            <MapSelectionScreen 
                playerProgress={playerProgress}
                onSelectMap={handleSelectMap}
            />
        )
      };

    const renderView = () => {      
        switch(activeView) {
            case 'map':
                return renderAdventureView();
            case 'expert':
                return <ThinkingMode />;
            case 'bonus':
                return <BonusScreen 
                            score={playerProgress.score} 
                            setScore={(updater) => setPlayerProgress(p => p ? {...p, score: typeof updater === 'function' ? updater(p.score) : updater} : null)}
                            currentUserGrade={currentUser.grade}
                        />;
            case 'profile':
                return <ProfileScreen 
                            user={currentUser}
                            progress={playerProgress}
                            onLogout={handleLogout}
                            onSwitchUser={() => setGameState('parentDashboard')}
                            onConfigSave={(config) => handleConfigSave(config, currentUser.username)}
                            onShareSuccess={handleShareSuccess}
                        />;
            default:
                return renderAdventureView();
        }
    }

    return (
        <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 relative font-sans flex flex-col">
             <button onClick={() => setGameState('parentDashboard')} className="absolute top-4 right-4 bg-orange-500/80 text-white p-2 rounded-full text-sm font-bold hover:bg-orange-600 transition-all flex items-center gap-2 z-30">
                <UserIcon className="w-5 h-5"/>
                <span className="hidden sm:inline">Panel</span>
            </button>
            <main className="flex-grow overflow-hidden">
                {renderView()}
            </main>
            {(adventureState === 'map_selection' || adventureState === 'adventure_map') && selectedLevelIndex === null && <BottomNav activeView={activeView} setActiveView={setActiveView} />}
            {showDailyReward && playerProgress && (
                <DailyReward 
                    streak={playerProgress.loginStreak || 1}
                    onClaim={handleClaimReward}
                />
            )}
            {isTimeUp && (
                <TimeUpModal />
            )}
        </div>
      );
  }
  
  return null; // Should not be reached if logic is correct
};

export default App;