import { ArrowLeft } from "lucide-react";
import type React from "react";

export interface DetailNavBarProps {
    onBack: () => void;
}

export const DetailNavBar: React.FC<DetailNavBarProps> = ({ onBack }) => {
    return (
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#F7A503]/30 flex-wrap sm:flex-nowrap">
            <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 bg-[#F7A503] hover:bg-[#d69f30] text-white font-bold text-xs sm:text-sm py-2 px-3.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Back to Plants</span>
            </button>
        </div>
    );
};
