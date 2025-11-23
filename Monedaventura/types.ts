
export interface User {
  username: string; 
  children: ChildProfile[];
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  isCompleted: boolean;
}

export interface Activity {
  id: string;
  title: string;
  timestamp: string;
  coinsEarned?: number;
}

export interface ChildProfile {
  id: string;
  name: string;
  grade: string; 
  avatar: string; 
  stats: GameStats;
  unlockedMaps: string[]; 
  completedLevels: string[]; 
  dailyStreak: number;
  lastLogin: string;
  lastRewardClaimed?: string; 
  settings: {
    timeLimit: number; 
    guidedMode: boolean;
  };
  goals?: Goal[];
  activityLog?: Activity[];
}

export interface GameStats {
  coins: number;
  happiness: number; 
  knowledge: number; 
}

export enum ViewState {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  PARENT_DASHBOARD = 'PARENT_DASHBOARD',
  CHILD_DASHBOARD = 'CHILD_DASHBOARD',
  MISSIONS_MENU = 'MISSIONS_MENU', 
  GAME_LEVEL = 'GAME_LEVEL',
  GENIUS_MODE = 'GENIUS_MODE', 
  MINIGAME_MENU = 'MINIGAME_MENU',
  ARCADE_GAME = 'ARCADE_GAME' 
}

export enum LevelType {
  SCENARIO = 'SCENARIO', 
  COMPARISON = 'COMPARISON', 
  QUIZ = 'QUIZ' 
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LevelData {
  id: string;
  mapId: string; 
  title: string;
  type: LevelType;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  scenario?: {
    prompt: string;
    options: {
      text: string;
      outcome: string;
      rewards: Partial<GameStats>;
    }[];
  };
  comparison?: {
    productA: ProductData;
    productB: ProductData;
    correctProduct: 'A' | 'B';
    reason: string;
  };
  quiz?: QuizQuestion;
}

export interface ProductData {
  name: string;
  price: number;
  stars: number; 
  image?: string;
  icon?: string; 
}

export interface MapConfig {
  id: string;
  name: string;
  theme: 'birthday' | 'halloween' | 'christmas' | 'summer';
  description: string;
  minLevel: number;
  bgGradient: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
