import React from 'react';
import { Leaf } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#768C3A] text-white py-3.5 sm:py-4 px-4 sm:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start gap-2.5">
        {/* Leaf Logo Placeholder Icon */}
        <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-[#B3BC53] fill-[#B3BC53] transform -rotate-12" />
        
        {/* APHS Title */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-white font-sans">
          APHS
        </h1>
      </div>
    </header>
  );
};
