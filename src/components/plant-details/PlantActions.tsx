import React, { useState } from 'react';
import { Check, RefreshCw, Calendar, Sliders } from 'lucide-react';

interface PlantActionsProps {
  onWater: () => void;
  onOpenLimitModal: () => void;
  humidityLimit: number;
}

export const PlantActions: React.FC<PlantActionsProps> = ({
  onWater,
  onOpenLimitModal,
  humidityLimit,
}) => {
  const [isWatering, setIsWatering] = useState(false);
  const [waterSuccess, setWaterSuccess] = useState(false);
  const [scheduleNotice, setScheduleNotice] = useState(false);

  const handleWaterClick = () => {
    if (isWatering) return;
    setIsWatering(true);
    setWaterSuccess(true);
    onWater();

    setTimeout(() => {
      setIsWatering(false);
      setTimeout(() => setWaterSuccess(false), 2000);
    }, 1000);
  };

  const handleScheduleClick = () => {
    setScheduleNotice(true);
    setTimeout(() => setScheduleNotice(false), 2500);
  };

  return (
    <div className="w-full max-w-xs flex flex-col gap-3">
      {/* Water Button */}
      <button
        type="button"
        onClick={handleWaterClick}
        disabled={isWatering}
        className={`w-full py-3 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer active:scale-95 ${
          waterSuccess
            ? 'bg-[#768C3A] text-white border-2 border-[#556925]'
            : 'bg-[#F7A503] hover:bg-[#d69f30] text-white border-2 border-[#e69800]'
        }`}
      >
        {isWatering ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Watering...</span>
          </>
        ) : waterSuccess ? (
          <>
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Watered! (+15%)</span>
          </>
        ) : (
          <>
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Water</span>
          </>
        )}
      </button>

      {/* Schedule Button (Temporary interactive button) */}
      <button
        type="button"
        onClick={handleScheduleClick}
        className="w-full bg-[#FFF8E7] hover:bg-white text-[#556925] border-2 border-[#768C3A]/50 hover:border-[#768C3A] font-bold text-sm sm:text-base py-2.5 px-4 rounded-xl sm:rounded-2xl shadow-xs transition-all duration-200 cursor-pointer active:scale-98 flex items-center justify-center gap-2 relative"
      >
        <Calendar className="w-4 h-4 text-[#768C3A]" />
        <span>{scheduleNotice ? 'Schedule (Coming Soon)' : 'Schedule'}</span>
      </button>

      {/* Humidity Limit Button */}
      <button
        type="button"
        onClick={onOpenLimitModal}
        className="w-full bg-[#FFF8E7] hover:bg-white text-[#556925] border-2 border-[#768C3A]/50 hover:border-[#768C3A] font-bold text-sm sm:text-base py-2.5 px-4 rounded-xl sm:rounded-2xl shadow-xs transition-all duration-200 cursor-pointer active:scale-98 flex items-center justify-center gap-2"
      >
        <Sliders className="w-4 h-4 text-[#768C3A]" />
        <span>Humidity limit</span>
        <span className="text-xs bg-[#48B0F7]/20 text-[#2573a7] px-2 py-0.5 rounded-md font-semibold ml-1">
          {humidityLimit}%
        </span>
      </button>
    </div>
  );
};
