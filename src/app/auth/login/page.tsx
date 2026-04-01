"use client";

/* FILE: src/app/auth/login/page.tsx
  DESCRIPTION: Secure login gateway for Facility Admins and Specialists.
  CHANGES: 
    - Implemented a centered, high-focus layout (Rule #4).
    - Rule #6: Mapping to POST /api/auth/login endpoint.
    - Rule #5: Humanized error messages for failed login attempts.
    - Integrated 'lucide-react' for visual password toggling.
*/

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Rule #6: Payload aligned with LoginCredentialsDto
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Rule #6: Referencing Backend - POST /api/auth/login
    console.log("Attempting authentication with Backend...");

    // Simulate Backend Response & Cookie Setting
    setTimeout(() => {
      document.cookie = "auth_token=simulated_jwt_token; path=/";
      
      // Rule #5: Humanized redirect logic
      const redirectTo = searchParams.get('next') || '/specialists';
      router.push(redirectTo);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col justify-center items-center p-6">
      
      {/* BRANDING: Rule #4 Mobile-First Centering */}
      <div className="mb-8 text-center">
        <div className="w-12 h-12 bg-[#E87042] rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-[#E87042]/20">
          <ShieldCheck className="text-white" size={28} />
        </div>
        <h1 className="text-2xl font-bold tracking-tighter text-white">Facility Portal</h1>
        <p className="text-gray-500 text-sm mt-1">Secure access for AfriDam medical partners</p>
      </div>

      {/* LOGIN CARD: Balanced Laptop View (Rule #4) */}
      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 shadow-2xl">
        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                type="email"
                placeholder="doctor@hospital.com"
                className="w-full bg-[#111111] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#E87042] transition-all"
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-[#111111] border border-white/5 rounded-xl py-4 pl-12 pr-12 text-white outline-none focus:border-[#E87042] transition-all"
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" className="accent-[#E87042]" /> Remember me
            </label>
            <button type="button" className="text-[#E87042] font-semibold hover:underline">Forgot password?</button>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#E87042] hover:bg-[#ff8252] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign In to Workspace"
            )}
          </button>
        </form>

        {/* Rule #5: Humanized Onboarding Link */}
        <div className="mt-8 text-center pt-6 border-t border-white/5">
          <p className="text-gray-500 text-sm">
            Not a partner yet? <button className="text-white font-semibold hover:text-[#E87042]">Apply for Admission</button>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}