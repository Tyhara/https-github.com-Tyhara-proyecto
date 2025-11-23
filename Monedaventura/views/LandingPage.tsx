
import React from 'react';
import { CoinIcon } from '../components/CoinIcon';
import { Cloud } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onCreateAccount: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onCreateAccount }) => {
  return (
    <div className="fixed inset-0 h-[100dvh] w-full bg-[#38bdf8] overflow-hidden font-sans select-none flex flex-col">
      
      {/* --- Background Elements (Sky) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] left-[-10%] opacity-60 animate-float">
              <Cloud size={120} fill="white" className="text-white" strokeWidth={0} />
          </div>
          <div className="absolute top-[15%] right-[-5%] opacity-80 animate-float delay-1000">
              <Cloud size={180} fill="white" className="text-white" strokeWidth={0} />
          </div>
          <div className="absolute top-[40%] left-[20%] opacity-40 animate-float delay-500 scale-75">
              <Cloud size={100} fill="white" className="text-white" strokeWidth={0} />
          </div>

          <div className="absolute top-[15%] left-[8%] animate-bounce duration-[3000ms] opacity-90"><CoinIcon size={56} className="-rotate-12" /></div>
          <div className="absolute top-[25%] right-[12%] animate-bounce duration-[4000ms] delay-500 opacity-90"><CoinIcon size={48} className="rotate-12" /></div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="relative z-30 flex flex-col items-center w-full h-full px-4 pt-[8vh]">
        
        {/* Logo Block */}
        <div className="w-full text-center animate-bounce-in origin-center flex flex-col items-center">
          
          {/* Title: Responsive Fluid Text (11vw ensures it fits on small screens) */}
          <h1 className="font-display font-black tracking-normal title-stroke 
                         text-[11vw] md:text-8xl lg:text-9xl 
                         drop-shadow-2xl whitespace-nowrap leading-none 
                         filter drop-shadow-[0_6px_0px_rgba(0,0,0,0.15)]">
            MONEDAVENTURA
          </h1>
          
          {/* Subtitle */}
          <h2 className="font-display font-black tracking-wider subtitle-stroke 
                         text-[4.5vw] md:text-3xl lg:text-4xl 
                         drop-shadow-xl mt-1 md:mt-4 text-white
                         filter drop-shadow-[0_3px_0px_rgba(0,0,0,0.1)]">
            APRENDE FINANZAS JUGANDO
          </h2>
        </div>

        {/* Buttons - Pushed down but kept within reachable area */}
        {/* mt-auto pushes it down, mb-[30vh] keeps it above the grass/characters */}
        <div className="mt-auto mb-[28vh] md:mb-[30vh] w-full max-w-[280px] sm:max-w-sm md:max-w-md flex flex-col gap-4">
          <button 
            onClick={onCreateAccount}
            className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#78350f] font-display font-black text-lg md:text-2xl py-3 md:py-4 rounded-3xl border-b-[6px] border-[#b45309] shadow-2xl active:border-b-0 active:translate-y-2 transition-all transform hover:scale-105 tracking-wide"
          >
            CREAR NUEVA CUENTA
          </button>
          
          <button 
            onClick={onLogin}
            className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-display font-black text-lg md:text-2xl py-3 md:py-4 rounded-3xl border-b-[6px] border-[#0c4a6e] shadow-2xl active:border-b-0 active:translate-y-2 transition-all transform hover:scale-105 tracking-wide"
          >
            INICIAR SESIÓN
          </button>
        </div>

      </div>

      {/* --- Landscape (Bottom) --- */}
      <div className="absolute bottom-0 left-0 w-full h-[35%] z-20 pointer-events-none">
         <div className="absolute bottom-0 left-0 w-full h-full bg-grass-400 rounded-t-[40px] md:rounded-t-[100%] border-t-[8px] border-grass-600 shadow-inner overflow-hidden origin-bottom">
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[80%] bg-grass-500 rounded-full opacity-50"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[80%] bg-grass-600 rounded-full opacity-30"></div>
            
            {/* Characters Scene */}
            <div className="absolute bottom-[5%] w-[95%] max-w-7xl mx-auto left-0 right-0 px-4 flex justify-between items-end">
                
                {/* Girl */}
                <div className="w-[35%] max-w-[200px] md:max-w-[300px] animate-float delay-700 hover:scale-110 transition-transform origin-bottom duration-500 relative">
                     <img src="https://api.dicebear.com/9.x/adventurer/svg?seed=Annie&backgroundColor=transparent" alt="Pirate Girl" className="w-full h-auto drop-shadow-2xl filter saturate-150 contrast-125" />
                     <div className="absolute -bottom-2 left-1/4 w-1/2 h-4 bg-black/20 blur-md rounded-[100%]"></div>
                </div>

                {/* Chest */}
                <div className="w-[25%] max-w-[150px] md:max-w-[200px] z-20 animate-bounce duration-[2000ms] mb-[2%] relative">
                    <div className="w-full aspect-square bg-amber-700 rounded-3xl border-4 border-amber-900 shadow-2xl relative flex items-center justify-center overflow-visible">
                        <div className="w-[15%] h-[25%] bg-yellow-400 rounded border-2 border-yellow-600"></div>
                        <div className="absolute -top-[25%] w-[110%] h-[50%] bg-amber-600 rounded-t-full border-4 border-amber-900 border-b-0"></div>
                        <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 animate-pulse"><CoinIcon size={50} className="w-12 h-12 md:w-16 md:h-16" /></div>
                    </div>
                    <div className="absolute -bottom-4 left-0 w-full h-8 bg-black/30 blur-lg rounded-[100%]"></div>
                </div>

                {/* Boy */}
                <div className="w-[35%] max-w-[200px] md:max-w-[300px] animate-float delay-200 hover:scale-110 transition-transform origin-bottom duration-500 relative">
                     <img src="https://api.dicebear.com/9.x/adventurer/svg?seed=Jack&backgroundColor=transparent&flip=true" alt="Pirate Boy" className="w-full h-auto drop-shadow-2xl filter saturate-150 contrast-125" />
                     <div className="absolute -bottom-2 left-1/4 w-1/2 h-4 bg-black/20 blur-md rounded-[100%]"></div>
                </div>

            </div>
         </div>
      </div>
    </div>
  );
};
