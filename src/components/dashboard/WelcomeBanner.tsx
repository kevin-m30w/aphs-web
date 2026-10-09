import React from 'react';
import { Bell, LogOut } from 'lucide-react';

export interface WelcomeBannerProps {
  userName: string;
  onLogout: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ userName, onLogout }) => {
  return (
    <div className="flex items-center gap-3 w-full lg:w-auto">
      {/* User Welcome Card */}
      <div className="flex-1 lg:w-72 xl:w-80 bg-[#F7A503] text-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-xs flex items-center justify-between gap-3 sm:gap-4 border border-[#F7A503]">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar Placeholder */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D4D8DC] shrink-0 border-2 border-white/50 flex items-center justify-center text-xl">
            🌱
          </div>

          <div className="min-w-0">
            <p className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
              Welcome back!
            </p>
            <p className="text-xs sm:text-sm font-semibold text-white/95 truncate mt-0.5">
              {userName}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={onLogout}
          title="Log Out"
          className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Notification Bell (Visible on Mobile here) */}
      <button
        type="button"
        aria-label="Notifications"
        className="lg:hidden w-12 h-12 rounded-xl bg-[#FFE8BC] border-2 border-[#F7A503] flex items-center justify-center text-[#F7A503] shadow-xs shrink-0 cursor-pointer hover:bg-[#ffdabc] transition-colors"
      >
        <Bell className="w-6 h-6 fill-[#F7A503]/20" />
      </button>
    </div>
  );
};
