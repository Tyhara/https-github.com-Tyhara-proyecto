export interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ScenarioOption {
  text: string;
  outcome: string;
  effects: {
    score: number;
    happiness: number;
    knowledge: number;
  };
}

export interface ScenarioQuestion {
  type: 'scenario';
  scenario: string;
  question: string;
  options: ScenarioOption[];
  characterImage?: string; // Optional image for the scenario
}

export interface VisualComparisonItem {
  name: string;
  price: number;
  imageUrl: string;
}

export interface VisualComparisonQuestion {
  type: 'visual-comparison';
  question: string;
  items: [VisualComparisonItem, VisualComparisonItem];
  correctAnswerIndex: number;
  explanation: string;
}

export type Question = MultipleChoiceQuestion | ScenarioQuestion | VisualComparisonQuestion;

export interface StoryLevel {
  title: string;
  guide: {
    name: string;
    avatar: string; // URL to guide's image
  };
  introduction: string;
  questions: Question[];
}

export interface AdventureMapData {
  id: 'birthday' | 'halloween' | 'christmas';
  name: string;
  theme: string;
  backgroundImage: string;
  levels: StoryLevel[];
  unlockRequirement?: string;
}

export type UserGrade = '2º Básico' | '3º Básico' | '4º Básico' | '5º Básico' | '6º Básico' | 'Tutor';
export type UserRole = 'jugador' | 'tutor' | 'admin';

export interface User {
  username: string; // Child's name or Tutor's name
  avatarUrl: string; // For child players
  grade: UserGrade;
  role: UserRole;
  email?: string; // For tutors
  password?: string; // Hashed ideally
  phone?: string; // For tutors
  children?: User[]; // For tutors
}

export interface PlayerConfig {
  tiempoMaximo?: number; // in minutes
  modoGuiado?: boolean;
  sfxOn?: boolean;
  musicOn?: boolean;
}

export type AppView = 'map' | 'expert' | 'bonus' | 'profile' | 'parentDashboard';

export type AdventureState = 'map_selection' | 'adventure_map' | 'playing' | 'level_complete' | 'finished';

export interface PlayerProgress {
    score: number;
    happiness: number;
    knowledge: number;
    progressByMap: {
        [mapId: string]: { // mapId: 'birthday', 'halloween', 'christmas'
            level: number;
            completedQuestions: { [levelIndex: string]: number[] };
        }
    };
    lastLoginDate?: string;
    loginStreak?: number;
    stats?: {
      correct: number;
      incorrect: number;
    };
    configuraciones?: PlayerConfig;
}

export interface MonedaventuraData {
    tutor: User;
    activePlayerUsername: string | null;
    playerProgress: {
        [username: string]: PlayerProgress;
    };
    activeMapId?: 'birthday' | 'halloween' | 'christmas';
}


// Types for ComparAhorro Game
export interface ComparisonObject {
  name: string;
  cost: number;
  durability: number; // e.g., 1 to 5 stars
  imageUrl?: string;
}

export interface ComparisonLevel {
  id: string;
  title: string;
  objective: string;
  objects: [ComparisonObject, ComparisonObject] | [ComparisonObject, ComparisonObject, ComparisonObject];
  correctChoiceIndex: number;
  explanation: string;
  reward: number;
}