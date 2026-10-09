import React, { useState } from 'react';
import {
  PlantNameEditor,
  MoistureDisplay,
  PlantActions,
  DeviceStatus,
  HumidityLimitModal,
} from './plant-details';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Sparkles,
  Sprout,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export interface PlantDetailData {
  id: string;
  name: string;
  status: 'Connected' | 'Disconnected';
  humidity: number;
  humidityLimit: number;
  qdp: string;
  schedule?: string;
  imageUrl?: string;
  lastWatered?: string;
}

export interface PlantDetailsProps {
  plant: PlantDetailData;
  onBack: () => void;
  onUpdatePlant: (updated: Partial<PlantDetailData>) => void;
}

export const PlantDetails: React.FC<PlantDetailsProps> = ({
  plant,
  onBack,
  onUpdatePlant,
}) => {
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleSaveName = (newName: string) => {
    onUpdatePlant({ name: newName });
  };

  const handleWater = () => {
    const newHumidity = Math.min(plant.humidityLimit || 80, plant.humidity + 15);
    onUpdatePlant({
      humidity: newHumidity,
      lastWatered: 'Just now',
    });
  };

  const handleToggleConnection = () => {
    onUpdatePlant({
      status: plant.status === 'Connected' ? 'Disconnected' : 'Connected',
    });
  };

  const handleSaveLimit = (newLimit: number) => {
    onUpdatePlant({ humidityLimit: newLimit });
    setShowLimitModal(false);
  };

  const isConnected = plant.status === 'Connected';
  const humidityLimit = plant.humidityLimit || 80;
  const isOptimal = plant.humidity >= 40 && plant.humidity <= humidityLimit;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-5 sm:gap-6 pb-14 animate-in fade-in duration-300">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFE8BC]/60 border-2 border-[#FFDABC] rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-xs backdrop-blur-xs">
        {/* Back Button with friendly text */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-[#F7A503] hover:bg-[#d69f30] text-white font-extrabold text-sm sm:text-base py-2 px-4 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          <span>Back to All Plants</span>
        </button>

        {/* Live Device Status Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 border border-[#FFDABC]">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isConnected ? 'bg-[#768C3A] animate-pulse' : 'bg-rose-500'
              }`}
            />
            <span className="text-xs font-bold text-[#556925]">
              {isConnected ? 'IoT Sensor Online' : 'Device Offline'}
            </span>
          </div>

          <span className="hidden sm:inline-block text-xs font-mono font-semibold text-amber-950/50 bg-[#FFF8E7] px-2.5 py-1.5 rounded-xl border border-[#FFDABC]">
            ID: {plant.id}
          </span>
        </div>
      </div>

      {/* Main Responsive Grid Layout: Split into 2 Balanced Panels on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* === LEFT COLUMN: Plant Showcase & Device Info (5 cols on Desktop) === */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Plant Profile Card */}
          <div className="bg-[#FFE8BC] border-2 border-[#F7A503] rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#F7A503]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Editable Name Header */}
            <div className="mb-5 w-full">
              <PlantNameEditor name={plant.name} onSaveName={handleSaveName} />
              <p className="text-xs font-semibold text-amber-950/60 mt-1">
                Monitored via QDP IoT Module
              </p>
            </div>

            {/* Blank Image Showcase Box */}
            <div className="w-full aspect-square max-w-[280px] bg-white border-2 border-[#B3BC53] rounded-3xl shadow-inner flex flex-col items-center justify-center relative group transition-transform hover:scale-[1.01]">
              <div className="flex flex-col items-center justify-center text-amber-900/30 p-4">
                <Sprout className="w-12 h-12 text-[#B3BC53]/60 mb-2" />
                <span className="text-xs font-bold tracking-wider uppercase text-[#556925]/60">
                  Plant Photo
                </span>
              </div>

              {/* Status Badge overlay on image */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs py-1.5 px-3 rounded-xl border border-[#FFDABC] flex items-center justify-between text-[11px] font-bold text-[#556925]">
                <span>Health Status</span>
                <span className="flex items-center gap-1 text-[#768C3A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isOptimal ? 'Thriving' : 'Needs Moisture'}
                </span>
              </div>
            </div>

            {/* Quick Metadata Badges */}
            <div className="w-full grid grid-cols-2 gap-2 mt-5 text-left">
              <div className="bg-[#FFF8E7] p-3 rounded-2xl border border-[#FFDABC]/80">
                <div className="flex items-center gap-1.5 text-[#556925] text-xs font-bold mb-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#F7A503]" />
                  <span>Last Watered</span>
                </div>
                <p className="text-xs font-semibold text-amber-950/80 truncate">
                  {plant.lastWatered || 'Yesterday'}
                </p>
              </div>

              <div className="bg-[#FFF8E7] p-3 rounded-2xl border border-[#FFDABC]/80">
                <div className="flex items-center gap-1.5 text-[#556925] text-xs font-bold mb-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[#768C3A]" />
                  <span>Schedule</span>
                </div>
                <p className="text-xs font-semibold text-amber-950/80 truncate">
                  {plant.schedule || 'Every 2 days'}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full my-5 border-t border-[#F7A503]/30" />

            {/* Device Hardware Status Section */}
            <DeviceStatus
              status={plant.status}
              qdp={plant.qdp}
              onToggleConnection={handleToggleConnection}
            />
          </div>
        </div>

        {/* === RIGHT COLUMN: Telemetry, Controls & Insights (7 cols on Desktop) === */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          {/* Main Moisture & Live Telemetry Card */}
          <div className="bg-[#FFE8BC] border-2 border-[#F7A503] rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[#F7A503]/25 pb-3.5">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#556925]">
                  Soil Moisture & Telemetry
                </h3>
                <p className="text-xs font-semibold text-amber-950/60 mt-0.5">
                  Live readings streamed from your soil sensor
                </p>
              </div>

              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#FFF8E7] text-[#556925] border border-[#FFDABC]">
                Target: {humidityLimit}%
              </span>
            </div>

            {/* Rich Moisture Meter */}
            <div className="bg-[#FFF8E7] border-2 border-[#FFDABC] rounded-2xl p-5 sm:p-6 shadow-inner flex flex-col items-center">
              <MoistureDisplay
                humidity={plant.humidity}
                humidityLimit={humidityLimit}
              />

              {/* Status helper text */}
              <div className="mt-2 flex items-center gap-2 text-xs font-semibold">
                {isOptimal ? (
                  <span className="text-[#556925] flex items-center gap-1.5 bg-[#B3BC53]/20 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-[#768C3A]" />
                    Moisture is in the optimal range
                  </span>
                ) : (
                  <span className="text-amber-800 flex items-center gap-1.5 bg-[#F7A503]/20 px-3 py-1 rounded-full">
                    <AlertTriangle className="w-4 h-4 text-[#F7A503]" />
                    Moisture is below target threshold ({humidityLimit}%)
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="pt-2">
              <PlantActions
                onWater={handleWater}
                onOpenLimitModal={() => setShowLimitModal(true)}
                humidityLimit={humidityLimit}
              />
            </div>
          </div>

          {/* Plant Care Tips & Recommendation Banner */}
          <div className="bg-gradient-to-r from-[#768C3A] to-[#8FA648] text-white p-5 sm:p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                🌱
              </div>
              <div>
                <h4 className="text-base font-bold text-[#FFFBF2]">
                  Care Guide for {plant.name}
                </h4>
                <p className="text-xs text-white/90 mt-0.5 max-w-md">
                  Keep soil moderately moist. Automatic watering will pause once sensor hits the {humidityLimit}% threshold.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowLimitModal(true)}
              className="bg-white hover:bg-[#FFF8E7] text-[#556925] font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
            >
              Adjust Limit
            </button>
          </div>

        </div>

      </div>

      {/* Target Humidity Limit Modal */}
      <HumidityLimitModal
        currentLimit={humidityLimit}
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onSave={handleSaveLimit}
      />
    </div>
  );
};
