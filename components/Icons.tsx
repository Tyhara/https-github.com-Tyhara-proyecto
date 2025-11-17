
import React from 'react';

export const CoinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6.546l-1.053-.526a.75.75 0 00-.94 1.25l2.25 1.125a.75.75 0 00.94-.14l3.75-5.25a.75.75 0 10-1.1-1.02L12.75 12.19V6z" clipRule="evenodd" />
  </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.344-.688 18.26 18.26 0 01-4.4-3.16c-3.162-4.024-1.6-8.75 1.4-11.58 3.061-2.836 7.625-2.836 10.686 0 3.06 2.83 4.562 7.556 1.4 11.58-1.522 1.942-3.28 3.262-4.4 3.16s-1.344.688-1.344.688l-.022.012-.007.002-.001.001A.752.752 0 0112 21.688a.752.752 0 01-.354-.078z" />
    </svg>
);

export const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M14.25 4.5A.75.75 0 0013.5 3h-3a.75.75 0 000 1.5h.75v1.125a2.25 2.25 0 00-1.04 1.899A2.25 2.25 0 0011.25 9v.375a3 3 0 01-1.022 2.121 3 3 0 01-2.121 1.022H7.5A2.25 2.25 0 005.25 14.25v.005a2.25 2.25 0 00-2.25 2.245V18a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-.005a2.25 2.25 0 00-1.5-2.122v-.878a.75.75 0 01.75-.75h.375a1.5 1.5 0 001.42-1.04A1.5 1.5 0 0012 11.25v-.878a1.5 1.5 0 00-1.04-1.42A1.5 1.5 0 009.75 7.5V6h4.5v1.5a2.25 2.25 0 001.04 1.899A2.25 2.25 0 0016.5 9v.375a3 3 0 01-1.022 2.121 3 3 0 01-2.121 1.022h-.375a.75.75 0 01-.75-.75v-.878a1.5 1.5 0 00-1.5-1.5h-1.5a1.5 1.5 0 00-1.5 1.5v.878a.75.75 0 01-.75.75h-.375a2.25 2.25 0 00-2.25 2.25v.005a2.25 2.25 0 001.5 2.122v.878a.75.75 0 01-.75.75H7.5a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 007.5 21h1.5a2.25 2.25 0 002.25-2.25v-.005a2.25 2.25 0 00-2.25-2.245V15a.75.75 0 01.75-.75h.375a3 3 0 012.121-1.022A3 3 0 0115 11.625V15a.75.75 0 01-.75.75h-.375a2.25 2.25 0 00-2.25 2.25v.005a2.25 2.25 0 002.25 2.25H15a2.25 2.25 0 002.25-2.25v-1.505a2.25 2.25 0 00-2.25-2.245V12a.75.75 0 01.75-.75h.375a3 3 0 012.121 1.022A3 3 0 0121 11.625V9a2.25 2.25 0 00-1.04-1.899A2.25 2.25 0 0018.75 5.625V4.5h.75a.75.75 0 00.75-.75V3a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75z" />
    </svg>
);

export const PiggyBankIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.032z" />
  </svg>
);

export const TreasureChestIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v2.25a3 3 0 01-3 3h-1.5V9a1.5 1.5 0 00-3 0v2.25H9A1.5 1.5 0 007.5 9v2.25H6a3 3 0 01-3-3V6zm15.75 3a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm-3 0a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM9 12.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" clipRule="evenodd" />
    <path d="M3 10.5a3 3 0 00-3 3V18a3 3 0 003 3h18a3 3 0 003-3v-4.5a3 3 0 00-3-3H3zm17.25 3a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM15 13.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" />
  </svg>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.061l1.591-1.59a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.803 17.803a.75.75 0 01-1.06 0l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.591a.75.75 0 010 1.06zM12 21.75a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0V21a.75.75 0 01-.75-.75zM5.106 17.803a.75.75 0 010-1.06l1.591-1.59a.75.75 0 111.06 1.061l-1.591 1.59a.75.75 0 01-1.06 0zM4.5 12.75a.75.75 0 01-.75-.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.106 6.106a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06l-1.59-1.591a.75.75 0 010-1.06z" />
    </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
);

export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);
export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);
export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
    </svg>
);

export const LockClosedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
    </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);

export const MapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M14.093 4.5a.75.75 0 01.185 1.043l-2.668 4.19a.75.75 0 00.22 1.004l3.708 2.318a.75.75 0 01.32.956l-2.024 4.048a.75.75 0 01-1.18.34l-3.32-1.992a.75.75 0 00-.818 0l-3.32 1.992a.75.75 0 01-1.18-.34L2.83 14.05a.75.75 0 01.32-.956l3.708-2.318a.75.75 0 00.22-1.004l-2.668-4.19a.75.75 0 011.228-.78l2.668 4.19a.75.75 0 00.94 0l2.668-4.19a.75.75 0 011.043-.185z" clipRule="evenodd" />
        <path d="M12.982 2.155a3 3 0 013.882 1.666l2.668 4.19a3 3 0 01-1.28 4.019l-3.708 2.318-1.54-2.421a.75.75 0 00-.938-.22l-1.156.578-2.23-4.46a.75.75 0 011.18-.59l1.156.578a.75.75 0 00.938-.22l1.54-2.421-2.024-4.048a3 3 0 013.27-2.08z" />
    </svg>
);

export const ExpertIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.315 7.583C11.42 6.026 14.58 6.026 16.685 7.583L18 8.417l1.315-.834a.75.75 0 00-.63-1.332l-1.315.834-1.124-.702a6 6 0 00-7.132 0L9.001 6.25l-1.315-.833a.75.75 0 00-.63 1.332L8.37 8.417l1.315-.834-1.315.834a.75.75 0 00.63 1.332l1.315-.834 1.124.702a6 6 0 007.132 0l1.124-.702 1.315.834a.75.75 0 10.63-1.332L18 8.417l-1.315.834c-2.105 1.557-5.265 1.557-7.37 0L8.001 8.417l-1.315.833a.75.75 0 10.63 1.332L8.63 9.75l1.124.703a6 6 0 007.132 0l1.124-.702 1.315.833a.75.75 0 10.63-1.332L18 8.417l-1.315.834c-2.105 1.557-5.265 1.557-7.37 0L8.001 8.417 6.686 9.25a.75.75 0 10.63 1.332L8.63 9.75l1.124.703a6 6 0 007.132 0l1.124-.702 1.315.833a.75.75 0 10.63-1.332l-1.315-.834-1.124.703a6 6 0 00-7.132 0L9.001 9.75l-1.315.833a.75.75 0 10.63 1.332L9.63 11.25l1.124.703a6 6 0 007.132 0l1.124-.702 1.315.833a.75.75 0 00.63-1.332l-1.315-.834L18 11.25l1.315-.833a.75.75 0 00-.63-1.332l-1.315.833-1.124-.702a6 6 0 00-7.132 0L9.001 9.75 7.686 8.917a.75.75 0 00-.63 1.332l1.315.833zm-5.63 6.834a.75.75 0 00.63-1.332l-1.315.834-1.315-.834a.75.75 0 00-.63 1.332l1.315.834 1.315-.834z" clipRule="evenodd" />
    </svg>
);

export const SpeakerWaveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.66 1.905H6.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.099 3.1 3.099 8.19 0 11.29a.75.75 0 11-1.06-1.06c2.52-2.52 2.52-6.61 0-9.17a.75.75 0 010-1.06z" />
      <path d="M16.464 7.225a.75.75 0 011.06 0 5.25 5.25 0 010 7.424.75.75 0 11-1.06-1.06 3.75 3.75 0 000-5.304.75.75 0 010-1.06z" />
    </svg>
);

export const MusicalNoteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.25 3v10.5a3.75 3.75 0 11-3.75-3.75H9V3h2.25z" />
    </svg>
);

export const QuestionMarkCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export const ScaleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M14.615 1.585a.75.75 0 01.359.852l-6.672 18.53a.75.75 0 01-1.402-.507l6.672-18.53a.75.75 0 011.045-.345zM5.25 3a.75.75 0 000 1.5h3.013l-4.106 11.405a.75.75 0 00.12 1.002l.043.043a.75.75 0 001.06 0l4.106-11.405H18.75a.75.75 0 000-1.5H5.25z" clipRule="evenodd" />
    </svg>
);

export const FamilyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M10.5 6a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
        <path fillRule="evenodd" d="M2.25 8.25c0 3.866 3.134 7 7 7h3c3.866 0 7-3.134 7-7V6.25a2.25 2.25 0 00-2.25-2.25H18a3.75 3.75 0 01-1.599.349 4.508 4.508 0 00-8.802 0A3.75 3.75 0 016 4H4.5A2.25 2.25 0 002.25 6.25v2zM6.953 15.606a.75.75 0 01.75-.052 16.49 16.49 0 008.592 0 .75.75 0 11.698-1.406 17.99 17.99 0 01-9.988 0 .75.75 0 01-.052 1.458z" clipRule="evenodd" />
    </svg>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
    </svg>
);

export const GameControllerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h2.25V18h3v4.5h2.25a2.25 2.25 0 002.25-2.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5v6H10.5V1.5z" />
        <path d="M4.5 9.75a1.5 1.5 0 00-1.5 1.5v1.5a1.5 1.5 0 001.5 1.5H6v-4.5H4.5zM19.5 9.75a1.5 1.5 0 00-1.5 1.5v1.5a1.5 1.5 0 001.5 1.5H21v-4.5h-1.5z" />
    </svg>
);

export const ClipboardListIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.5 3A2.5 2.5 0 008 5.5v1.25a1.75 1.75 0 01-3.5 0V5.5A2.5 2.5 0 017 3h3.5zm-2.25 1.75a.75.75 0 00-1.5 0v1.25a.25.25 0 01-.5 0V5.5C6.25 4.56 7.06 3.75 8 3.75h3a.75.75 0 010 1.5h-2.25V4.75z" clipRule="evenodd" />
        <path d="M6 5.5A3.5 3.5 0 019.5 2h5A3.5 3.5 0 0118 5.5v13A3.5 3.5 0 0114.5 22h-5A3.5 3.5 0 016 18.5v-13zm4.25 5.25a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7.5 12a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5H8.25A.75.75 0 017.5 12zm.75 2.25a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5H8.25z" />
    </svg>
);

export const GiftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.75 7.5A2.25 2.25 0 001.5 9.75v8.5A2.25 2.25 0 003.75 20.5h16.5A2.25 2.25 0 0022.5 18.25v-8.5A2.25 2.25 0 0020.25 7.5H3.75z" />
      <path fillRule="evenodd" d="M11.25 3.335V6.75a.75.75 0 001.5 0V3.335c0-.441.358-.883.882-1.012 1.413-.354 2.826.155 3.896 1.226 1.07 1.07 1.58 2.483 1.226 3.896a1.125 1.125 0 001.012.882h3.415a.75.75 0 000-1.5h-3.415c-.441 0-.883-.358-1.012-.882-.354-1.413.155-2.826 1.226-3.896 1.07-1.07 2.483-1.58 3.896-1.226a1.125 1.125 0 00.882-1.012V3.75a.75.75 0 00-1.5 0v.415c0 .441-.358.883-.882 1.012-1.21.302-2.34-.14-3.14-1.04a3.733 3.733 0 00-4.66 0c-.8.899-1.93 1.342-3.14 1.04a1.125 1.125 0 00-.882-1.012V3.75a.75.75 0 00-1.5 0v3.415c0 .441.358.883.882 1.012 1.413.354 2.826-.155 3.896-1.226 1.07-1.07 1.58-2.483 1.226-3.896A1.125 1.125 0 0011.25 3.335z" clipRule="evenodd" />
    </svg>
);

export const ChartPieIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 9.375a2.625 2.625 0 100 5.25 2.625 2.625 0 000-5.25z" />
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM11.25 7.5a.75.75 0 00-1.5 0v2.668l-3.323 3.323a.75.75 0 101.06 1.06l3.536-3.536A3.733 3.733 0 0112 11.25a3.75 3.75 0 013.75 3.75 1.5 1.5 0 103 0 6.75 6.75 0 00-6.75-6.75.75.75 0 00-.75.75z" clipRule="evenodd" />
    </svg>
);

export const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.052A6.75 6.75 0 0115.75 12c0 1.852-.713 3.567-1.86 4.815a.75.75 0 101.06 1.062A8.25 8.25 0 0017.25 12c0-4.556-3.694-8.25-8.25-8.25a.75.75 0 000 1.5c3.69 0 6.75 3.06 6.75 6.75 0 1.633-.594 3.125-1.577 4.254a.75.75 0 001.128 1.002A6.728 6.728 0 0115.75 12c0-2.226-1.084-4.14-2.71-5.321a.75.75 0 00-.077-1.393z" clipRule="evenodd" />
    </svg>
);

export const PresentationChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.75 3H5.25A2.25 2.25 0 003 5.25v13.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V5.25A2.25 2.25 0 0018.75 3zM9.75 16.5a.75.75 0 01-1.5 0V12a.75.75 0 011.5 0v4.5zM12.75 16.5a.75.75 0 01-1.5 0V9a.75.75 0 011.5 0v7.5zM15.75 16.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 011.5 0v4.5z" />
    </svg>
);

export const DotsVerticalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
  </svg>
);

export const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
    </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.006a.75.75 0 01-.749.658h-7.5a.75.75 0 01-.749-.658L5.13 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.9h1.368c1.603 0 2.816 1.336 2.816 2.9zM5.25 6.443L6.02 18.75h12L18.75 6.443A47.07 47.07 0 0012 5.25c-2.115 0-4.198.136-6.25.393z" clipRule="evenodd" />
    </svg>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.967l-4.383 2.529a3.007 3.007 0 010 1.012l4.383 2.529a3 3 0 11-.825 2.967l-4.383-2.529a3 3 0 110-7.006l4.383-2.529A3 3 0 0115.75 4.5z" clipRule="evenodd" />
    </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a.75.75 0 010-1.113zM12.001 18c3.922 0 7.27-2.56 8.527-6-1.257-3.44-4.605-6-8.527-6-3.922 0-7.27 2.56-8.527 6 1.257 3.44 4.605 6 8.527 6z" clipRule="evenodd" />
    </svg>
);

export const EyeSlashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
        <path d="M15.75 12c0 .18-.013.357-.037.53l-1.66-1.66A3.75 3.75 0 0012 9.75c-.18 0-.357.013-.53.037l-1.66-1.66A3.75 3.75 0 009.75 12c0 .18.013.357.037.53l-1.66 1.66A3.75 3.75 0 0012 14.25c.18 0 .357-.013.53-.037l1.66 1.66A3.75 3.75 0 0014.25 12c0-.18-.013-.357-.037-.53l1.66-1.66A3.75 3.75 0 0015.75 12z" />
        <path d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c1.272 0 2.493.212 3.634.606l-2.6-2.6A.75.75 0 0011.999 2.25c-4.97 0-9.185 3.223-10.675 7.69a.75.75 0 000 1.113z" />
    </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M15 2.25a.75.75 0 01.75.75v.754a3 3 0 012.091 1.773l.22.441a3 3 0 01-1.342 3.863l-2.613 1.306a3 3 0 01-3.153 0l-2.613-1.306a3 3 0 01-1.342-3.863l.22-.441A3 3 0 018.25 3.754V3a.75.75 0 011.5 0v.75c0 .355.072.7.207 1.026.045.109.091.217.14.321l.22.441c.219.438.53.818.91 1.121l.004.003h-2.955a.75.75 0 010-1.5h1.442c-.22-.395-.403-.815-.544-1.252a1.5 1.5 0 01.447-1.485.75.75 0 011.06 0c.297.298.375.73.236 1.103A4.51 4.51 0 0012 6.75a4.51 4.51 0 00-1.037-.662c-.14-.372-.06-.805.237-1.103a.75.75 0 011.06 0c.345.345.545.836.447 1.485-.14.437-.324.857-.543 1.252h1.442a.75.75 0 010 1.5H8.381l.004-.003c.38-.303.691-.683.91-1.121l.22-.441c.049-.104.095-.212.14-.321.135-.326.207-.67.207-1.026V3a.75.75 0 01.75-.75h4.5z" clipRule="evenodd" />
      <path d="M6 10.5c0-.621.4-1.173 1-1.417V8.08a4.5 4.5 0 119 0v1.003c.6.244 1 .796 1 1.417V17.25a3 3 0 01-3 3h-1.5a.75.75 0 010-1.5h1.5a1.5 1.5 0 001.5-1.5v-3a.75.75 0 00-.75-.75h-7.5a.75.75 0 00-.75.75v3a1.5 1.5 0 001.5 1.5h1.5a.75.75 0 010 1.5H6a3 3 0 01-3-3V10.5z" />
    </svg>
);
