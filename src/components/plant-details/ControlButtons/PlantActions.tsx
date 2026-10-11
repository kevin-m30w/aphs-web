import { Calendar, Check, RefreshCw, Sliders } from "lucide-react";
import type React from "react";
import { useState } from "react";

export interface PlantActionsProps {
    onWater: () => void;
    onOpenLimitModal: () => void;
    humidityLimit: number;
    isConnected: boolean;
}

export const PlantActions: React.FC<PlantActionsProps> = ({
    onWater,
    onOpenLimitModal,
    humidityLimit,
    isConnected,
}) => {
    const [isWatering, setIsWatering] = useState(false);
    const [waterSuccess, setWaterSuccess] = useState(false);
    const [scheduleNotice, setScheduleNotice] = useState(false);

    const handleWaterClick = () => {
        if (isWatering || !isConnected) return;
        setIsWatering(true);
        setWaterSuccess(true);
        onWater();

        setTimeout(() => {
            setIsWatering(false);
            setTimeout(() => setWaterSuccess(false), 2000);
        }, 1000);
    };

    const handleScheduleClick = () => {
        if (!isConnected) return;
        setScheduleNotice(true);
        setTimeout(() => setScheduleNotice(false), 2500);
    };

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Primary Water Action Button */}
            <button
                type="button"
                onClick={handleWaterClick}
                disabled={isWatering || !isConnected}
                title={!isConnected ? "Connect the device to water" : undefined}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all duration-200 active:scale-95 ${
                    !isConnected
                        ? "bg-gray-300 text-gray-500 border-2 border-gray-400 cursor-not-allowed"
                        : waterSuccess
                          ? "bg-[#768C3A] text-white border-2 border-[#556925]"
                          : "bg-[#F7A503] hover:bg-[#d69f30] text-white border-2 border-[#e69800] cursor-pointer"
                }`}
            >
                {isWatering ? (
                    <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Watering...</span>
                    </>
                ) : waterSuccess ? (
                    <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Watered!</span>
                    </>
                ) : (
                    <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Water Now</span>
                    </>
                )}
            </button>

            {/* Schedule Button */}
            <button
                type="button"
                onClick={handleScheduleClick}
                disabled={!isConnected}
                title={
                    !isConnected
                        ? "Connect the device to schedule watering"
                        : undefined
                }
                className="w-full bg-[#FFF8E7] hover:bg-white text-[#556925] border-2 border-[#768C3A]/40 hover:border-[#768C3A] font-bold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-xs transition-all duration-200 cursor-pointer active:scale-98 flex items-center justify-center gap-2"
            >
                <Calendar className="w-4 h-4 text-[#768C3A] shrink-0" />
                <span className="truncate">
                    {scheduleNotice ? "Coming Soon" : "Schedule Routine"}
                </span>
            </button>

            {/* Humidity Limit Button */}
            <button
                type="button"
                onClick={onOpenLimitModal}
                className="w-full bg-[#FFF8E7] hover:bg-white text-[#556925] border-2 border-[#768C3A]/40 hover:border-[#768C3A] font-bold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-xs transition-all duration-200 cursor-pointer active:scale-98 flex items-center justify-center gap-1.5"
            >
                <Sliders className="w-4 h-4 text-[#768C3A] shrink-0" />
                <span>Humidity Limit</span>
                <span className="text-[11px] bg-[#48B0F7]/20 text-[#2573a7] px-2 py-0.5 rounded-md font-extrabold ml-1">
                    {humidityLimit}%
                </span>
            </button>
        </div>
    );
};
