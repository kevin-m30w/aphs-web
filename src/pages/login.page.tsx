import type { Provider } from "@supabase/supabase-js";
import { useSocialAuth } from "../hooks/useSocialAuth";

export default function LoginPage() {
  const { loadingProvider, error, signInWithProvider, signOut } =
    useSocialAuth();

  const handleLogin = (provider: Provider) => () => {
    signInWithProvider(provider);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={handleLogin("google")}
          disabled={loadingProvider !== null}
        >
          {loadingProvider === "google"
            ? "Connecting..."
            : "Sign in with Google"}
        </button>
        <button
          onClick={handleLogin("github")}
          disabled={loadingProvider !== null}
        >
          {loadingProvider === "github"
            ? "Connecting..."
            : "Sign in with GitHub"}
        </button>

        <button onClick={signOut}>SignOut</button>
      </div>
    </div>
  );
}
