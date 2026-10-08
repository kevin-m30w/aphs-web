import React, { useState, useEffect } from 'react';
import { Sliders, X } from 'lucide-react';

interface HumidityLimitModalProps {
  currentLimit: number;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newLimit: number) => void;
}

export const HumidityLimitModal: React.FC<HumidityLimitModalProps> = ({
  currentLimit,
  isOpen,
  onClose,
  onSave,
}) => {
  const [tempLimit, setTempLimit] = useState(currentLimit);

  useEffect(() => {
    setTempLimit(currentLimit);
  }, [currentLimit, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF4E8] border-3 border-[#F7A503] rounded-3xl p-5 sm:p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#556925]">
            <Sliders className="w-5 h-5 text-[#48B0F7]" />
            <h3 className="text-lg font-bold">Target Humidity Limit</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-amber-900/50 hover:text-amber-950 p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-amber-950/70 leading-relaxed">
            When soil moisture falls below or reaches this limit, APHS triggers automated watering alerts.
          </p>

          <div className="text-center bg-[#FFF8E7] border-2 border-[#F7A503] rounded-2xl p-4">
            <span className="text-3xl font-black text-[#48B0F7]">
              {tempLimit}%
            </span>
            <p className="text-[11px] font-semibold text-amber-950/60 mt-0.5">Threshold Target</p>
            <input
              type="range"
              min="20"
              max="95"
              step="5"
              value={tempLimit}
              onChange={(e) => setTempLimit(Number(e.target.value))}
              className="w-full mt-3 accent-[#F7A503] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-bold text-amber-900/50 mt-1">
              <span>20% (Dry)</span>
              <span>50%</span>
              <span>80% (Optimal)</span>
              <span>95% (Moist)</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-white border border-amber-900/20 text-amber-950 font-bold py-2 rounded-xl text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(tempLimit)}
            className="flex-1 bg-[#F7A503] hover:bg-[#d69f30] text-white font-bold py-2 rounded-xl text-sm shadow-xs cursor-pointer"
          >
            Save Limit
          </button>
        </div>
      </div>
    </div>
  );
};
