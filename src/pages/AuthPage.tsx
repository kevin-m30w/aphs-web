import { Sprout } from "lucide-react";
import { useState } from "react";
import { LoginForm, RegisterForm } from "../components/auth";
import { Header } from "../components/Header";

export const AuthPage = () => {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");

    return (
        <div className="min-h-screen bg-[#FAF4E8] text-[#3B3A36] flex flex-col selection:bg-[#FFDABC]">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
                <div className="w-full max-w-md bg-[#FFE8BC]/80 border-2 border-[#F7A503] rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden backdrop-blur-xs animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#FFF8E7] border-2 border-[#F7A503] flex items-center justify-center text-[#768C3A] mb-3 shadow-xs">
                            <Sprout className="w-8 h-8 fill-[#B3BC53]/30" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#556925] tracking-tight">
                            {activeTab === "login"
                                ? "Welcome to APHS"
                                : "Start Your Plant Journey"}
                        </h2>
                        <p className="text-xs sm:text-sm font-semibold text-amber-900/60 mt-1">
                            {activeTab === "login"
                                ? "Sign in to check your plant babies & moisture telemetry"
                                : "Create an account to monitor and water your plants"}
                        </p>
                    </div>

                    <div className="flex p-1 bg-[#FFF8E7] border-2 border-[#FFDABC] rounded-xl mb-6 shadow-inner">
                        <button
                            type="button"
                            onClick={() => setActiveTab("login")}
                            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                                activeTab === "login"
                                    ? "bg-[#F7A503] text-white shadow-xs"
                                    : "text-amber-900/60 hover:text-amber-950"
                            }`}
                        >
                            Log In
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("register")}
                            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                                activeTab === "register"
                                    ? "bg-[#F7A503] text-white shadow-xs"
                                    : "text-amber-900/60 hover:text-amber-950"
                            }`}
                        >
                            Register
                        </button>
                    </div>

                    {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
                </div>
            </main>
        </div>
    );
};
