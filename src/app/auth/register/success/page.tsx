"use client";

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock
} from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center p-6 text-center">
      <div className="w-full max-w-lg">
        {/* SUCCESS ICON ANIMATION */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20 animate-pulse">
            <CheckCircle2 className="text-green-500" size={48} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 animate-bounce">
            <ShieldCheck className="text-blue-400" size={16} />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-4">Registration Successful</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto">
          Your clinical admission request has been verified. Our compliance team will now review your credentials.
        </p>

        {/* STEP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-3xl text-left">
            <Building2 className="text-[#E87042] mb-4" size={24} />
            <h3 className="font-bold mb-1">Facility Review</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We are verifying your MDCN license and facility details. Usually takes 24-48h.
            </p>
          </div>
          <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-3xl text-left">
            <Lock className="text-[#E87042] mb-4" size={24} />
            <h3 className="font-bold mb-1">Secure Access</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Once approved, you'll receive an email to set up your primary administrator account.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link 
            href="/auth/login" 
            className="w-full bg-white text-black py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-lg hover:bg-gray-200 active:scale-95"
          >
            Go to Login
            <ArrowRight size={20} />
          </Link>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">
            Admission ID: AD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>
    </main>
  );
}
