import React, { useState } from 'react';
import {
  DetailNavBar,
  PlantNameEditor,
  PlantImageBox,
  PlantMetaCards,
  DeviceStatus,
  MoistureDisplay,
  PlantActions,
  HumidityLimitModal,
} from '../components/plant-details';

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

export interface PlantDetailsPageProps {
  plant: PlantDetailData;
  onBack: () => void;
  onUpdatePlant: (updated: Partial<PlantDetailData>) => void;
}

export const PlantDetailsPage: React.FC<PlantDetailsPageProps> = ({
  plant,
  onBack,
  onUpdatePlant,
}) => {
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleSaveName = (newName: string) => {
    onUpdatePlant({ name: newName });
  };

  const handleWater = () => {
    const targetLimit = plant.humidityLimit || 80;
    onUpdatePlant({
      humidity: targetLimit,
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

  return (
    <div className="w-full max-w-5xl mx-auto pb-14 animate-in fade-in duration-200">
      
      {/* Master Window Card with Warm Subtle Gradient */}
      <div className="bg-gradient-to-br from-[#FFF3D9] via-[#FFE8BC] to-[#FFDE99] border-2 border-[#F7A503] rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm flex flex-col gap-5 sm:gap-7 relative overflow-hidden">

        {/* 1. Bar: Integrated Top Navigation & Status Bar */}
        <DetailNavBar
          onBack={onBack}
          isConnected={isConnected}
          plantId={plant.id}
        />

        {/* 2. Information Section: Photo Box (Left) + Plant Profile & Device (Right) */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          
          {/* Photo Box */}
          <PlantImageBox />

          {/* Plant Profile, Meta & Device */}
          <div className="flex-1 w-full flex flex-col justify-between gap-3.5">
            {/* Plant Name Title Header & ID */}
            <div>
              <PlantNameEditor name={plant.name} onSaveName={handleSaveName} />
              <p className="text-xs sm:text-sm font-semibold text-amber-950/70 mt-0.5">
                ID: <span className="font-mono text-amber-950/90 font-bold">{plant.id}</span>
              </p>
            </div>

            {/* 3 Quick Overview Metadata Cards */}
            <PlantMetaCards
              lastWatered={plant.lastWatered}
              schedule={plant.schedule}
              humidityLimit={humidityLimit}
            />

            {/* Device & Hardware Telemetry Widget */}
            <div className="w-full pt-3 border-t border-[#F7A503]/25">
              <DeviceStatus
                status={plant.status}
                qdp={plant.qdp}
                onToggleConnection={handleToggleConnection}
              />
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full border-t border-[#F7A503]/30" />

        {/* 3. Controls & 4. Buttons Section */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#556925]">
              Moisture Telemetry & Actions
            </h3>
          </div>

          {/* Controls: Moisture Meter */}
          <div className="bg-[#FFF8E7]/95 border-2 border-[#FFDABC] rounded-xl px-4 sm:px-6 py-4 sm:py-5 shadow-inner">
            <MoistureDisplay
              humidity={plant.humidity}
              humidityLimit={humidityLimit}
            />
          </div>

          {/* Buttons: Actions */}
          <div className="pt-1">
            <PlantActions
              onWater={handleWater}
              onOpenLimitModal={() => setShowLimitModal(true)}
              humidityLimit={humidityLimit}
            />
          </div>
        </div>

      </div>

      {/* Target Humidity Limit Modal (from controls) */}
      <HumidityLimitModal
        currentLimit={humidityLimit}
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onSave={handleSaveLimit}
      />
    </div>
  );
};
