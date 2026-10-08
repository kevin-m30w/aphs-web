import React, { useState } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface DeviceStatusProps {
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
    <div className="w-full flex flex-col items-center gap-1.5">
      {/* Device Connection Status */}
      <div className="flex items-center gap-1.5 text-sm sm:text-base">
        <span className="font-semibold text-amber-950/70">Device:</span>
        <span
          className={`font-extrabold flex items-center gap-1 ${
            isConnected ? 'text-[#556925]' : 'text-rose-600'
          }`}
        >
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4" />
              Connected
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              Disconnected
            </>
          )}
        </span>
      </div>

      {/* QDP Code */}
      <p className="text-xs sm:text-sm font-semibold text-amber-950/60 tracking-wider">
        QDP:{' '}
        <span className="font-mono font-bold text-[#556925]">
          {qdp || '240124901'}
        </span>
      </p>

      {/* Reconnect / Toggle Connection Button */}
      <div className="mt-2.5">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isReconnecting}
          className={`text-xs sm:text-sm font-bold px-4 py-1.5 rounded-xl border-2 transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-xs ${
            isConnected
              ? 'bg-[#FCFAF6] hover:bg-rose-50 text-[#556925] hover:text-rose-700 border-[#768C3A]/60 hover:border-rose-400'
              : 'bg-[#768C3A] hover:bg-[#556925] text-white border-[#556925] animate-pulse'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isReconnecting ? 'animate-spin' : ''}`} />
          <span>
            {isReconnecting
              ? 'Connecting...'
              : isConnected
              ? 'Disconnect (Test)'
              : 'Reconnect'}
          </span>
        </button>
      </div>
    </div>
  );
};
