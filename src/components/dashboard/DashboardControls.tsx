import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

export interface DashboardControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAddModal: () => void;
  plantCount: number;
}

export const DashboardControls: React.FC<DashboardControlsProps> = ({
  searchQuery,
  onSearchChange,
  onOpenAddModal,
  plantCount,
}) => {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-900/50">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search plants by name or ID..."
            className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-[#FFF8E7] border-2 border-[#F7A503] rounded-xl text-sm font-medium text-[#3B3A36] placeholder-amber-900/40 outline-none transition-all focus:ring-2 focus:ring-[#F7A503]/30"
          />
        </div>

        {/* Notification Bell (Visible on Desktop here) */}
        <button
          type="button"
          aria-label="Notifications"
          className="hidden lg:flex w-11 h-11 rounded-xl bg-[#FFE8BC] border-2 border-[#F7A503] items-center justify-center text-[#F7A503] shadow-xs shrink-0 cursor-pointer hover:bg-[#ffdabc] transition-colors"
        >
          <Bell className="w-5 h-5 fill-[#F7A503]/20" />
        </button>
      </div>

      {/* Action Bar: New Plant Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 bg-[#FFF8E7] hover:bg-white text-[#768C3A] font-bold text-xs px-3.5 py-1.5 rounded-xl border-2 border-[#F7A503] shadow-xs cursor-pointer active:scale-95 transition-all"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#F7A503] text-white flex items-center justify-center">
            <Plus className="w-2.5 h-2.5 stroke-[3]" />
          </span>
          New plant
        </button>

        <span className="text-xs font-semibold text-amber-950/60">
          {plantCount} {plantCount === 1 ? 'plant' : 'plants'} monitored
        </span>
      </div>
    </div>
  );
};
