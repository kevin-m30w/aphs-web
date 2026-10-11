import { AlertCircle, CheckCircle, UserPlus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";

export const RegisterForm = () => {
    const { register } = useUser();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {
            const result = await register(email, password, displayName);

            if (result.requiresEmailConfirmation) {
                setSuccessMsg(
                    "Account created! Please check your email to confirm your account.",
                );
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrorMsg(err.message);
            } else {
                setErrorMsg("Failed to register. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                </div>
            )}

            {successMsg && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-semibold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle className="w-4 h-4 shrink-0 text-green-600" />
                    <span>{successMsg}</span>
                </div>
            )}

            <div>
                <label
                    htmlFor="displayName"
                    className="block text-xs font-bold text-amber-950/70 mb-1.5"
                >
                    Your Name / Nickname
                </label>
                <input
                    type="text"
                    id="displayName"
                    placeholder="e.g. Aloe Buddy"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-[#FFF8E7] border-2 border-[#FFDABC] focus:border-[#F7A503] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#556925] outline-none transition-all placeholder-amber-900/40 focus:ring-2 focus:ring-[#F7A503]/20"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-xs font-bold text-amber-950/70 mb-1.5"
                >
                    Email Address
                </label>
                <input
                    type="email"
                    required
                    id="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FFF8E7] border-2 border-[#FFDABC] focus:border-[#F7A503] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#556925] outline-none transition-all placeholder-amber-900/40 focus:ring-2 focus:ring-[#F7A503]/20"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-xs font-bold text-amber-950/70 mb-1.5"
                >
                    Choose a Password
                </label>
                <input
                    type="password"
                    required
                    id="password"
                    minLength={6}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FFF8E7] border-2 border-[#FFDABC] focus:border-[#F7A503] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#556925] outline-none transition-all placeholder-amber-900/40 focus:ring-2 focus:ring-[#F7A503]/20"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-[#F7A503] hover:bg-[#e09400] text-white font-extrabold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-all disabled:opacity-50"
            >
                {loading ? (
                    <span className="inline-block animate-spin text-base">
                        ⏳
                    </span>
                ) : (
                    <>
                        <UserPlus className="w-4 h-4 stroke-[2.5]" />
                        Register Account
                    </>
                )}
            </button>
        </form>
    );
};
