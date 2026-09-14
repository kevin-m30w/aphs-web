import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading authentication state...</div>;
  }

  return session ? <Outlet /> : <Navigate to="/login" replace />;
}
