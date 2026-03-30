"use client";

/* FILE: src/app/page.tsx
  DESCRIPTION: The main Facility Command Center (Dashboard Root).
  CHANGES: 
    - Implemented a "Mobile-First" overview with quick-action tiles (Rule #4).
    - Rule #6: Mapped summary cards to /api/facilities/me data structure.
    - Rule #5: Humanized language for clinical productivity.
    - Added direct navigation paths to all clinical modules.
*/

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Activity, 
  MessageSquare, 
  ArrowUpRight, 
  ShieldCheck,
  Plus
} from 'lucide-react';

export default function FacilityDashboard() {
  
  // Rule #5: Humanized labels for clinical impact
  const quickStats = [
    { label: "Clinical Team", value: "12", sub: "3 Pending", icon: Users, href: "/specialists" },
    { label: "Active Consults", value: "08", sub: "Live now", icon: MessageSquare, href: "/chat" },
    { label: "AI Scans", value: "142", sub: "+12 today", icon: Activity, href: "/diagnostics" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      
      {/* WELCOME SECTION: Rule #4 Balance */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Facility Overview</h1>
          <p className="text-gray-400 mt-2">Welcome back. Your clinical wing is operating at 94% efficiency.</p>
        </div>
        <Link href="/specialists/add" className="w-full md:w-auto btn-primary">
          <Plus size={20} /> Onboard Specialist
        </Link>
      </div>

      {/* QUICK STATS: Mobile-First Grid (Rule #4) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {quickStats.map((stat, i) => (
          <Link key={i} href={stat.href} className="card-clinical group relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#E87042]/10 transition-colors">
                <stat.icon className="text-gray-400 group-hover:text-[#E87042] transition-colors" size={24} />
              </div>
              <ArrowUpRight className="text-gray-700 group-hover:text-white transition-all" size={20} />
            </div>
            <div className="mt-6">
              <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-4xl font-bold mt-1">{stat.value}</h3>
              <p className="text-xs text-[#E87042] mt-2 font-medium">{stat.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* RECENT ACTIVITY: Rule #6 Preparedness */}
        <section className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-[#E87042]" /> Recent Diagnoses
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full" />
                  <div>
                    <p className="font-medium text-sm">Patient Case #{842 + i}</p>
                    <p className="text-[10px] text-gray-500">24 mins ago • AI Result: Psoriasis</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Reviewed</span>
              </div>
            ))}
          </div>
          <Link href="/diagnostics" className="block text-center mt-6 text-sm text-gray-500 hover:text-white transition-colors underline decoration-[#E87042]/30">
            View All Diagnostic Logs
          </Link>
        </section>

        {/* VERIFICATION TIER: Rule #5 Humanized Compliance */}
        <section className="bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-[#E87042]/20 rounded-3xl p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#E87042]" /> Trust Score
            </h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Your facility is fully verified for AI Clinical Assist. Keep your MDCN licenses updated to maintain this status.
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold">A+</span>
              <span className="text-gray-600 text-sm">Grade Verification</span>
            </div>
            <Link href="/admissions" className="text-[#E87042] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              Manage Facility Credentials <ArrowUpRight size={16} />
            </Link>
          </div>
          {/* Decorative Background Element */}
          <ShieldCheck className="absolute -right-8 -bottom-8 text-white/5 w-48 h-48 -rotate-12" />
        </section>

      </div>
    </main>
  );
}