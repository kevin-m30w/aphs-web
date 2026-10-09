import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Sprout, X, LogIn, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { id: string; email: string; name: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (!isSupabaseConfigured()) {
        // Fallback for preview/demo when Supabase credentials aren't set in .env yet
        setTimeout(() => {
          onSuccess({
            id: `usr_${Math.random().toString(36).substr(2, 9)}`,
            email: email.trim(),
            name: name.trim() || email.split('@')[0],
          });
          setLoading(false);
          onClose();
        }, 500);
        return;
      }

      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              display_name: name.trim() || email.split('@')[0],
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          if (data.session) {
            onSuccess({
              id: data.user.id,
              email: data.user.email || '',
              name: data.user.user_metadata?.display_name || 'Plant Parent',
            });
            onClose();
          } else {
            setSuccessMsg('Registration successful! Please check your email to confirm your account.');
          }
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        if (data.user) {
          onSuccess({
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.display_name || 'Plant Parent',
          });
          onClose();
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF4E8] border-3 border-[#F7A503] rounded-3xl p-6 sm:p-7 w-full max-w-sm shadow-2xl relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-900/40 hover:text-amber-950 p-1 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE8BC] border-2 border-[#F7A503] flex items-center justify-center text-[#768C3A] mb-2 shadow-xs">
            <Sprout className="w-7 h-7 fill-[#B3BC53]/30" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#556925]">
            {isRegister ? 'Join APHS' : 'Welcome Back'}
          </h2>
          <p className="text-xs font-semibold text-amber-900/60 mt-0.5">
            {isRegister
              ? 'Create an account to monitor your plant babies'
              : 'Log in to access your connected plants'}
          </p>
        </div>

        {/* Error / Success Feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-green-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-amber-950/70 mb-1">
                Display Name
              </label>
              <input
                type="text"
                placeholder="e.g. Plant Lover"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FFF8E7] border-2 border-[#FFDABC] focus:border-[#F7A503] rounded-xl px-3 py-2 text-sm font-semibold text-[#556925] outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-amber-950/70 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FFF8E7] border-2 border-[#FFDABC] focus:border-[#F7A503] rounded-xl px-3 py-2 text-sm font-semibold text-[#556925] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-950/70 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FFF8E7] border-2 border-[#FFDABC] focus:border-[#F7A503] rounded-xl px-3 py-2 text-sm font-semibold text-[#556925] outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#F7A503] hover:bg-[#e09400] text-white font-extrabold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block animate-spin text-base">⏳</span>
            ) : isRegister ? (
              <>
                <UserPlus className="w-4 h-4 stroke-[2.5]" />
                Create Account
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 stroke-[2.5]" />
                Log In
              </>
            )}
          </button>
        </form>

        {/* Toggle Switch */}
        <div className="mt-4 pt-4 border-t border-[#FFDABC] text-center">
          <p className="text-xs font-semibold text-amber-900/60">
            {isRegister ? 'Already have an account?' : "Don't have an account yet?"}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className="mt-1 text-xs font-extrabold text-[#768C3A] hover:text-[#556925] underline cursor-pointer"
          >
            {isRegister ? 'Log in here' : 'Register a new account'}
          </button>
        </div>
      </div>
    </div>
  );
};
