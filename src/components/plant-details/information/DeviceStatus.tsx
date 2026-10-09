import React, { useState } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export interface DeviceStatusProps {
  status: 'Connected' | 'Disconnected';
  qdp: string;
  onToggleConnection: () => void;
}

export const DeviceStatus: React.FC<DeviceStatusProps> = ({
  status,
  qdp,
  onToggleConnection,
}) => {
  const [isReconnecting, setIsReconnecting] = useState(false);
  const isConnected = status === 'Connected';

  const handleToggle = () => {
    if (isConnected) {
      onToggleConnection();
    } else {
      setIsReconnecting(true);
      setTimeout(() => {
        setIsReconnecting(false);
        onToggleConnection();
      }, 1200);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
      {/* Device Info (Left) */}
      <div className="flex flex-col gap-1 text-left">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isConnected ? 'bg-[#768C3A] animate-pulse' : 'bg-rose-500'
            }`}
          />
          <span
            className={`text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5 ${
              isConnected ? 'text-[#556925]' : 'text-rose-600'
            }`}
          >
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                Device Connected
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                Device Offline
              </>
            )}
          </span>
        </div>

        <p className="text-xs font-semibold text-amber-950/70">
          QDP Serial:{' '}
          <span className="font-mono font-bold text-[#556925] bg-white/70 px-1.5 py-0.5 rounded-md border border-[#FFDABC]">
            {qdp || '240124901'}
          </span>
        </p>
      </div>

      {/* Connect / Toggle Connection Button (Right) */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={isReconnecting}
        className={`text-xs sm:text-sm font-black px-4 py-2 rounded-xl border-2 transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-xs shrink-0 ${
          isConnected
            ? 'bg-white hover:bg-rose-50 text-[#556925] hover:text-rose-700 border-[#768C3A]/60 hover:border-rose-300'
            : 'bg-[#768C3A] hover:bg-[#556925] text-white border-[#556925]'
        }`}
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isReconnecting ? 'animate-spin' : ''}`} />
        <span>
          {isReconnecting
            ? 'Connecting...'
            : isConnected
            ? 'Disconnect'
            : 'Connect'}
        </span>
      </button>
    </div>
  );
};
