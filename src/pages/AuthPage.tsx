import React, { useState } from 'react';
import { Header } from '../components/Header';
import { LoginForm, RegisterForm } from '../components/auth';
import { Sprout, ArrowRight } from 'lucide-react';

export interface AuthPageProps {
  onAuthSuccess: (user: { id: string; email: string; name: string }) => void;
  onSkip?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onSkip }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleSkipToMain = () => {
    if (onSkip) {
      onSkip();
    } else {
      onAuthSuccess({
        id: 'dev_user_123',
        email: 'dev@aphs.local',
        name: 'User',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#3B3A36] flex flex-col selection:bg-[#FFDABC]">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md bg-[#FFE8BC]/80 border-2 border-[#F7A503] rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden backdrop-blur-xs animate-in fade-in zoom-in-95 duration-200">
          
          {/* Plant Icon & Welcome Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF8E7] border-2 border-[#F7A503] flex items-center justify-center text-[#768C3A] mb-3 shadow-xs">
              <Sprout className="w-8 h-8 fill-[#B3BC53]/30" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#556925] tracking-tight">
              {activeTab === 'login' ? 'Welcome to APHS' : 'Start Your Plant Journey'}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-amber-900/60 mt-1">
              {activeTab === 'login'
                ? 'Sign in to check your plant babies & moisture telemetry'
                : 'Create an account to monitor and water your plants'}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex p-1 bg-[#FFF8E7] border-2 border-[#FFDABC] rounded-xl mb-6 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-[#F7A503] text-white shadow-xs'
                  : 'text-amber-900/60 hover:text-amber-950'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-[#F7A503] text-white shadow-xs'
                  : 'text-amber-900/60 hover:text-amber-950'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form Views */}
          {activeTab === 'login' ? (
            <LoginForm
              onSuccess={onAuthSuccess}
              onSwitchToRegister={() => setActiveTab('register')}
            />
          ) : (
            <RegisterForm
              onSuccess={onAuthSuccess}
              onSwitchToLogin={() => setActiveTab('login')}
            />
          )}

          {/* Quick Skip to Main Button */}
          <div className="mt-5 pt-4 border-t border-[#FFDABC] flex justify-center">
            <button
              type="button"
              onClick={handleSkipToMain}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFF8E7] hover:bg-white text-[#556925] hover:text-[#768C3A] font-bold text-xs border border-[#F7A503]/50 shadow-xs transition-all cursor-pointer"
            >
              <span>Skip & Open Main Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};
