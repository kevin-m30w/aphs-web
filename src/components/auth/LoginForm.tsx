import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { LogIn, AlertCircle } from 'lucide-react';

export interface LoginFormProps {
  onSuccess: (user: { id: string; email: string; name: string }) => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (!isSupabaseConfigured()) {
        setTimeout(() => {
          onSuccess({
            id: `usr_${Math.random().toString(36).substring(2, 9)}`,
            email: email.trim(),
            name: email.split('@')[0] || 'User',
          });
          setLoading(false);
        }, 400);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      if (data.user) {
        onSuccess({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.display_name || data.user.email?.split('@')[0] || 'User',
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Failed to log in. Please check your credentials.');
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

      <div>
        <label className="block text-xs font-bold text-amber-950/70 mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          required
          placeholder="yourname@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#FFF8E7] border-2 border-[#FFDABC] focus:border-[#F7A503] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#556925] outline-none transition-all placeholder-amber-900/40 focus:ring-2 focus:ring-[#F7A503]/20"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-amber-950/70 mb-1.5">
          Password
        </label>
        <input
          type="password"
          required
          placeholder="••••••••"
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
          <span className="inline-block animate-spin text-base">⏳</span>
        ) : (
          <>
            <LogIn className="w-4 h-4 stroke-[2.5]" />
            Log In
          </>
        )}
      </button>

      <div className="pt-3 text-center">
        <p className="text-xs font-semibold text-amber-900/60">
          Don't have an account yet?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-extrabold text-[#768C3A] hover:text-[#556925] underline cursor-pointer"
          >
            Create one
          </button>
        </p>
      </div>
    </form>
  );
};
