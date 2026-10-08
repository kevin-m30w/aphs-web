import React from 'react';
import { Droplet } from 'lucide-react';

interface MoistureDisplayProps {
  humidity: number;
  humidityLimit: number;
}

export const MoistureDisplay: React.FC<MoistureDisplayProps> = ({
  humidity,
  humidityLimit,
}) => {
  return (
    <div className="w-full flex flex-col items-center mb-6">
      {/* Moisture Level Readout */}
      <div className="flex items-center justify-center gap-1.5 mb-2">
        <Droplet className="w-6 h-6 fill-[#48B0F7] text-[#48B0F7]" />
        <span className="text-2xl sm:text-3xl font-black text-[#556925]">
          {humidity}%
        </span>
        <span className="text-xl sm:text-2xl font-bold text-[#768C3A]/70">
          /{humidityLimit}%
        </span>
      </div>

      {/* Moisture Progress Bar */}
      <div className="w-full max-w-xs bg-[#62C6FC]/25 h-4 sm:h-5 rounded-full overflow-hidden border-2 border-[#62C6FC]/70 shadow-inner relative">
        <div
          className="bg-gradient-to-r from-[#62C6FC] to-[#48B0F7] h-full rounded-full transition-all duration-700 relative"
          style={{ width: `${Math.min(Math.max(humidity, 0), 100)}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
        {/* Target limit marker line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#F7A503] z-10"
          style={{ left: `${humidityLimit}%` }}
          title={`Humidity Limit: ${humidityLimit}%`}
        />
      </div>
    </div>
  );
};
