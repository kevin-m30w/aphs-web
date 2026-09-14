import type { Provider } from "@supabase/supabase-js";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

interface UseSocialAuthReturn {
  loadingProvider: Provider | null;
  error: string | null;
  signInWithProvider: (provider: Provider) => Promise<void>;
  signOut: () => Promise<void>;
}

export function useSocialAuth(): UseSocialAuthReturn {
  const navigate = useNavigate();

  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signInWithProvider = async (provider: Provider): Promise<void> => {
    try {
      setError(null);
      setLoadingProvider(provider);

      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (authError) throw authError;

      navigate("/add-device");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setLoadingProvider(null);
    }
  };

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      navigate("/login", { replace: true });
    }
  };

  return { loadingProvider, error, signInWithProvider, signOut };
}
