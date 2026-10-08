import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PlantBreadcrumbProps {
  onBack: () => void;
}

export const PlantBreadcrumb: React.FC<PlantBreadcrumbProps> = ({ onBack }) => {
  return (
    <button
      type="button"
      onClick={onBack}
      className="w-full bg-[#F7A503] hover:bg-[#d69f30] text-white font-bold py-2.5 px-4 rounded-xl shadow-xs flex items-center gap-2 transition-all active:scale-[0.99] cursor-pointer text-sm sm:text-base border border-amber-600/20"
    >
      <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
      <span>Plant Information</span>
    </button>
  );
};
