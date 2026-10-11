import { AuthPage } from "./pages";
import { useUser } from "./hooks/useUser";
import { AuthenticatedApp } from "./components/app/AuthenticatedApp";

function App() {
    const { user, isLoading } = useUser();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAF4E8] flex items-center justify-center">
                <p className="text-sm font-semibold text-amber-900/60">
                    Loading...
                </p>
            </div>
        );
    }

    if (!user) {
        return <AuthPage />;
    }

    return <AuthenticatedApp />;
}

export default App;
