import React from 'react';
import { Clock, Calendar, Sliders } from 'lucide-react';

export interface PlantMetaCardsProps {
  lastWatered?: string;
  schedule?: string;
  humidityLimit: number;
}

export const PlantMetaCards: React.FC<PlantMetaCardsProps> = ({
  lastWatered = 'Yesterday',
  schedule = 'Every 2 days',
  humidityLimit = 80,
}) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
      {/* Last Watered Card */}
      <div className="bg-[#FFF8E7]/90 p-3 rounded-xl border border-[#FFDABC] shadow-2xs">
        <div className="flex items-center gap-1.5 text-[#556925] text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-[#F7A503] shrink-0" />
          <span>Last Watered</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-amber-950/80 truncate mt-1">
          {lastWatered}
        </p>
      </div>

      {/* Routine Card */}
      <div className="bg-[#FFF8E7]/90 p-3 rounded-xl border border-[#FFDABC] shadow-2xs">
        <div className="flex items-center gap-1.5 text-[#556925] text-xs font-bold">
          <Calendar className="w-3.5 h-3.5 text-[#768C3A] shrink-0" />
          <span>Routine</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-amber-950/80 truncate mt-1">
          {schedule}
        </p>
      </div>

      {/* Target Limit Card */}
      <div className="bg-[#FFF8E7]/90 p-3 rounded-xl border border-[#FFDABC] shadow-2xs">
        <div className="flex items-center gap-1.5 text-[#556925] text-xs font-bold">
          <Sliders className="w-3.5 h-3.5 text-[#48B0F7] shrink-0" />
          <span>Target Limit</span>
        </div>
        <p className="text-xs sm:text-sm font-bold text-black truncate mt-1">
          {humidityLimit}% Max
        </p>
      </div>
    </div>
  );
};
