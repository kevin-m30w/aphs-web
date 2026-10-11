import { Save, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

export interface QdpEditModalProps {
    currentQdp: string;
    isOpen: boolean;
    onClose: () => void;
    onSave: (qdp: string) => void;
}

export const QdpEditModal: React.FC<QdpEditModalProps> = ({
    currentQdp,
    isOpen,
    onClose,
    onSave,
}) => {
    const [qdp, setQdp] = useState(
        currentQdp === "Not paired" ? "" : currentQdp,
    );

    useEffect(() => {
        if (isOpen) {
            setQdp(currentQdp === "Not paired" ? "" : currentQdp);
        }
    }, [currentQdp, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave(qdp.trim());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-[#FAF4E8] border-3 border-[#F7A503] rounded-2xl p-5 sm:p-6 w-full max-w-sm shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#556925]">
                        Edit QDP Serial
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close QDP editor"
                        className="text-amber-900/50 hover:text-amber-950 p-1 rounded-lg cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-xs font-bold text-amber-950/70">
                        QDP Serial
                        <input
                            value={qdp}
                            onChange={(event) => setQdp(event.target.value)}
                            placeholder="Enter device serial"
                            autoFocus
                            className="mt-1 w-full bg-[#FFF8E7] border-2 border-[#F7A503] rounded-xl px-3 py-2 text-sm font-semibold text-[#556925] outline-none placeholder-amber-900/40"
                        />
                    </label>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white border border-amber-900/20 text-amber-950 font-bold py-2 rounded-xl text-sm cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-[#F7A503] hover:bg-[#d69f30] text-white font-bold py-2 rounded-xl text-sm shadow-xs cursor-pointer inline-flex items-center justify-center gap-1.5"
                        >
                            <Save className="w-4 h-4" />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
