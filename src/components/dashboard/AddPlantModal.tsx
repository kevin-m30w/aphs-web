import React, { useState } from 'react';
import { Sprout, X } from 'lucide-react';

export interface AddPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlant: (plantName: string) => void;
}

export const AddPlantModal: React.FC<AddPlantModalProps> = ({
  isOpen,
  onClose,
  onAddPlant,
}) => {
  const [plantName, setPlantName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plantName.trim()) return;
    onAddPlant(plantName.trim());
    setPlantName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF4E8] border-3 border-[#F7A503] rounded-2xl p-5 sm:p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#556925]">
            <Sprout className="w-5 h-5 text-[#768C3A]" />
            <h3 className="text-lg font-bold">Add New Plant</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-amber-900/50 hover:text-amber-950 p-1 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-amber-950/70 mb-1">
              Plant Name
            </label>
            <input
              type="text"
              placeholder="e.g. Monstera Deliciosa"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              autoFocus
              className="w-full bg-[#FFF8E7] border-2 border-[#F7A503] rounded-xl px-3 py-2 text-sm font-semibold text-[#556925] outline-none placeholder-amber-900/40"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-amber-900/20 text-amber-950 font-bold py-2 rounded-xl text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!plantName.trim()}
              className="flex-1 bg-[#F7A503] hover:bg-[#d69f30] disabled:opacity-50 text-white font-bold py-2 rounded-xl text-sm shadow-xs cursor-pointer transition-all"
            >
              Add Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
