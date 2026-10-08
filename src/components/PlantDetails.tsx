import React, { useState } from 'react';
import {
  PlantInformation,
  PlantNameEditor,
  PlantImageBox,
  MoistureDisplay,
  PlantActions,
  DeviceStatus,
  HumidityLimitModal,
} from './plant-details';

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
    const newHumidity = Math.min(100, plant.humidity + 15);
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

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-4 pb-12 animate-in fade-in duration-300">
      {/* Top Plant Information / Back Button */}
      <PlantInformation onBack={onBack} />

      {/* Main Plant Detail Card */}
      <div className="bg-[#FFE8BC] border-2 border-[#F7A503] rounded-3xl p-5 sm:p-7 shadow-md flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#F7A503]/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#768C3A]/10 rounded-full blur-xl pointer-events-none" />

        {/* Plant Name Editor Header */}
        <PlantNameEditor name={plant.name} onSaveName={handleSaveName} />

        {/* Clean Square Placeholder Box */}
        <PlantImageBox />

        {/* Moisture Level Readout & Progress */}
        <MoistureDisplay
          humidity={plant.humidity}
          humidityLimit={plant.humidityLimit || 80}
        />

        {/* Action Buttons: Water, Schedule (temporary button), Humidity Limit */}
        <PlantActions
          onWater={handleWater}
          onOpenLimitModal={() => setShowLimitModal(true)}
          humidityLimit={plant.humidityLimit || 80}
        />

        {/* Divider */}
        <div className="w-full my-6 border-t border-[#F7A503]/30" />

        {/* Device Status & QDP */}
        <DeviceStatus
          status={plant.status}
          qdp={plant.qdp}
          onToggleConnection={handleToggleConnection}
        />
      </div>

      {/* Target Humidity Limit Modal */}
      <HumidityLimitModal
        currentLimit={plant.humidityLimit || 80}
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onSave={handleSaveLimit}
      />
    </div>
  );
};
