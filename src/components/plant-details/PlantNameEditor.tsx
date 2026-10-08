import React, { useState, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface PlantNameEditorProps {
  name: string;
  onSaveName: (newName: string) => void;
}

export const PlantNameEditor: React.FC<PlantNameEditorProps> = ({ name, onSaveName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  useEffect(() => {
    setTempName(name);
  }, [name]);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (tempName.trim()) {
      onSaveName(tempName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(name);
    setIsEditing(false);
  };

  return (
    <div className="w-full flex items-center justify-center gap-2 mb-4">
      {isEditing ? (
        <form onSubmit={handleSave} className="flex items-center gap-2 max-w-full">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            autoFocus
            className="text-xl sm:text-2xl font-black text-[#556925] bg-white px-3 py-1 rounded-xl border-2 border-[#768C3A] outline-none text-center shadow-inner"
          />
          <button
            type="submit"
            className="bg-[#768C3A] hover:bg-[#556925] text-white p-1.5 rounded-lg shadow-xs cursor-pointer transition-transform active:scale-90"
            title="Save Name"
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-amber-800/20 hover:bg-amber-800/30 text-amber-950 p-1.5 rounded-lg cursor-pointer transition-transform active:scale-90"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => {
            setTempName(name);
            setIsEditing(true);
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-black text-[#556925] tracking-tight">
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
