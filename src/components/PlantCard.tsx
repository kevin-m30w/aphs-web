import React from 'react';
import { Droplet, Droplets, Info } from 'lucide-react';

export interface PlantCardProps {
  id?: string;
  name?: string;
  status?: 'Connected' | 'Disconnected' | string;
  humidity?: number;
  imageUrl?: string;
  onSelectDetail?: (id: string) => void;
  onWater?: (id: string) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  id = 'F199238FN',
  name = 'Aloevera',
  status = 'Connected',
  humidity = 50,
  onSelectDetail,
  onWater,
}) => {
  const isConnected = status.toLowerCase() === 'connected';

  return (
    <div className="bg-[#FFE8BC]/80 border-2 border-[#F7A503] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Plant Image Placeholder Square */}
        <div 
          onClick={() => onSelectDetail?.(id)}
          className="w-20 h-20 sm:w-24 sm:h-24 bg-white/70 border-2 border-[#768C3A]/40 rounded-xl shrink-0 shadow-inner flex items-center justify-center cursor-pointer hover:border-[#768C3A] transition-colors"
        />

        {/* Plant Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <h3 
              onClick={() => onSelectDetail?.(id)}
              className="text-lg sm:text-xl font-bold text-[#556925] truncate cursor-pointer hover:underline"
            >
              {name}
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold text-amber-950/60 mt-0.5">
              ID: <span className="font-mono">{id}</span>
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-amber-950/70 mt-0.5">
              Status:{' '}
              <span className={isConnected ? 'text-[#556925] font-bold' : 'text-rose-700 font-bold'}>
                {status}
              </span>
            </p>
          </div>

          {/* Humidity & Action Row */}
          <div className="mt-1.5 flex items-end justify-between gap-1">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[11px] sm:text-xs text-amber-950/75 font-medium">Humidity:</p>
                <div className="flex items-center gap-1 text-[#48B0F7] font-bold text-sm sm:text-base">
                  <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#48B0F7] text-[#48B0F7]" />
                  <span className="text-[#F7A503] font-extrabold">{humidity}%</span>
                </div>
              </div>

              {/* Circular Droplets Button */}
              <button
                type="button"
                onClick={() => onWater?.(id)}
                aria-label={`Water ${name}`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#48B0F7] hover:bg-[#3ba0e6] 
                text-white flex items-center justify-center shadow-xs transition-transform active:scale-95 hover:scale-110 cursor-pointer shrink-0"
                title="Quick Water"
              >
                <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              </button>
            </div>

            {/* Detail Button */}
            <button
              type="button"
              onClick={() => onSelectDetail?.(id)}
              aria-label={`Details for ${name}`}
              className="bg-[#F7A503] text-white font-bold text-[11px] 
              sm:text-xs px-3 sm:px-3.5 
              py-1.5 rounded-lg sm:rounded-xl flex items-center gap-1 shadow-sm opacity-100 cursor-pointer select-none 
              hover:bg-[#d69f30] transition-transform duration-200 active:scale-90 hover:scale-105 border border-amber-600/20"
            >
              <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
              detail
            </button>
          </div>
        </div>
      </div>

      {/* Moisture Progress Bar */}
      <div className="w-full bg-[#62C6FC]/30 h-2.5 sm:h-3 rounded-full overflow-hidden border border-[#62C6FC]/60 shadow-inner mt-2.5">
        <div
          className="bg-[#62C6FC] h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(Math.max(humidity, 0), 100)}%` }}
        />
      </div>
    </div>
  );
};
