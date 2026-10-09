import React from 'react';
import { Sprout } from 'lucide-react';

export const PlantImageBox: React.FC = () => {
  return (
    <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-white/95 border-2 border-[#B3BC53] rounded-2xl shrink-0 shadow-inner flex flex-col items-center justify-center transition-transform hover:scale-[1.01]">
      <Sprout className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#768C3A]/60" />
      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#556925]/60 mt-1">
        Plant Photo
      </span>
    </div>
  );
};
