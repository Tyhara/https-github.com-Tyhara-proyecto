import React from 'react';
import { AppView } from '../types';
import { ExpertIcon, UserIcon, StarIcon, MapIcon } from './Icons';

interface BottomNavProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/4 pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-yellow-400 font-bold' : 'text-white/60 hover:text-yellow-400'}`}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-blue-900/80 backdrop-blur-lg border-t-2 border-blue-700/50 flex-shrink-0">
      <div className="max-w-3xl mx-auto h-full flex justify-around">
        <NavItem
          label="Mapa"
          icon={<MapIcon className="w-7 h-7 mb-1" />}
          isActive={activeView === 'map'}
          onClick={() => setActiveView('map')}
        />
        <NavItem
          label="Experto"
          icon={<ExpertIcon className="w-7 h-7 mb-1" />}
          isActive={activeView === 'expert'}
          onClick={() => setActiveView('expert')}
        />
        <NavItem
          label="Bonus"
          icon={<StarIcon className="w-7 h-7 mb-1" />}
          isActive={activeView === 'bonus'}
          onClick={() => setActiveView('bonus')}
        />
        <NavItem
          label="Perfil"
          icon={<UserIcon className="w-7 h-7 mb-1" />}
          isActive={activeView === 'profile'}
          onClick={() => setActiveView('profile')}
        />
      </div>
    </div>
  );
};

export default BottomNav;