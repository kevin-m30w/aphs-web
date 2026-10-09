import React from 'react';
import { ArrowLeft } from 'lucide-react';

export interface DetailNavBarProps {
  onBack: () => void;
  isConnected: boolean;
  plantId: string;
}

export const DetailNavBar: React.FC<DetailNavBarProps> = ({
  onBack,
  isConnected,
  plantId,
}) => {
  return (
    <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#F7A503]/30 flex-wrap sm:flex-nowrap">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 bg-[#F7A503] hover:bg-[#d69f30] text-white font-bold text-xs sm:text-sm py-2 px-3.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Back to Plants</span>
      </button>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 border border-[#FFDABC]">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isConnected ? 'bg-[#768C3A] animate-pulse' : 'bg-rose-500'
            }`}
          />
          <span className="text-xs font-bold text-[#556925]">
            {isConnected ? 'IoT Sensor Online' : 'Device Offline'}
          </span>
        </div>

        <span className="text-xs font-mono font-semibold text-amber-950/70 bg-[#FFF8E7] px-2.5 py-1.5 rounded-xl border border-[#FFDABC]">
          ID: {plantId}
        </span>
      </div>
    </div>
  );
};
