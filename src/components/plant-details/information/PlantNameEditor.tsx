import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';

export interface PlantNameEditorProps {
  name: string;
  onSaveName: (newName: string) => void;
}

export const PlantNameEditor: React.FC<PlantNameEditorProps> = ({
  name,
  onSaveName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleSave = () => {
    if (tempName.trim() && tempName.trim() !== name) {
      onSaveName(tempName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(name);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <div className="flex items-center gap-1.5 w-full max-w-sm">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full bg-[#FFF8E7] border-2 border-[#F7A503] rounded-xl px-2.5 py-1 text-xl sm:text-2xl font-bold text-[#556925] outline-none shadow-inner"
          />
          <button
            type="button"
            onClick={handleSave}
            aria-label="Save name"
            className="p-1.5 rounded-lg bg-[#768C3A] text-white hover:bg-[#556925] transition-colors cursor-pointer shrink-0"
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            aria-label="Cancel editing"
            className="p-1.5 rounded-lg bg-amber-200 text-amber-900 hover:bg-amber-300 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => {
            setTempName(name);
            setIsEditing(true);
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#556925] tracking-tight">
            {name}
          </h2>
          <button
            type="button"
            aria-label="Edit plant name"
            className="p-1 rounded-lg text-[#556925]/70 group-hover:text-[#556925] group-hover:bg-[#F7A503]/20 transition-all"
            title="Edit name"
          >
            <Pencil className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
};
