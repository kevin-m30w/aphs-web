import React from 'react';
import { Droplets, Target } from 'lucide-react';

export interface MoistureDisplayProps {
  humidity: number;
  humidityLimit?: number;
}

export const MoistureDisplay: React.FC<MoistureDisplayProps> = ({
  humidity,
  humidityLimit = 80,
}) => {
  const clampedHumidity = Math.min(Math.max(humidity, 0), 100);

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 py-1">
      {/* Left: Moisture Percentage & Icon */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-sky-100/90 flex items-center justify-center text-sky-600 border border-sky-300/80 shadow-xs shrink-0">
          <Droplets className="w-6 h-6 sm:w-7 sm:h-7 fill-sky-500 text-sky-500" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline text-black leading-none">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
              {clampedHumidity}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-black ml-0.5">
              %
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-amber-950/60 mt-1 uppercase tracking-wider">
            Current Moisture
          </span>
        </div>
      </div>

      {/* Right: Moisture Progress Bar with Target Guide */}
      <div className="flex-1 w-full flex flex-col justify-center gap-1.5">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-amber-950/75 px-0.5">
          <span>Soil Moisture Level</span>
          <span className="flex items-center gap-1 text-[#2b72a4]">
            <Target className="w-3.5 h-3.5" />
            Target: <span className="font-extrabold text-black">{humidityLimit}%</span>
          </span>
        </div>

        <div className="w-full bg-sky-950/10 h-4 sm:h-5 rounded-xl overflow-hidden p-0.5 border border-sky-300/70 shadow-inner relative">
          <div
            className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 h-full rounded-lg transition-all duration-500 ease-out shadow-xs"
            style={{ width: `${clampedHumidity}%` }}
          />
          {/* Target limit indicator line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#F7A503] z-10 shadow-xs"
            style={{ left: `${humidityLimit}%` }}
            title={`Target limit: ${humidityLimit}%`}
          />
        </div>

        {/* Clean 0% to 100% labels */}
        <div className="flex justify-between text-[11px] font-semibold text-slate-500 px-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
