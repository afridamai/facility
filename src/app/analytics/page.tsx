"use client";

/* FILE: src/app/analytics/page.tsx
  DESCRIPTION: Performance and impact dashboard for the Facility Portal.
  CHANGES: 
    - Created a "Metric-First" mobile layout (Rule #4).
    - Rule #6: Mapped data structure to Wallet and Appointment statistics.
    - Rule #5: Used Humanized Language like "Lives Impacted" vs "Total Users".
    - Removed all credit-addition logic as per user request.
*/

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Zap, 
  BarChart3,
  Clock
} from 'lucide-react';

export default function AnalyticsPage() {
  
  // Rule #5: Humanized clinical metrics for the director
  const stats = [
    { label: "Lives Impacted", value: "1,284", icon: Users, color: "text-blue-400" },
    { label: "AI Diagnoses", value: "856", icon: Zap, color: "text-[#E87042]" },
    { label: "Verification Rate", value: "98.2%", icon: ShieldCheck, color: "text-green-400" },
    { label: "Avg. Consult Time", value: "12m", icon: Clock, color: "text-purple-400" }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER: Rule #4 Balance */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Facility Insights</h1>
            <p className="text-gray-400 mt-1">Real-time overview of clinical performance and patient success.</p>
          </div>
          <div className="bg-[#111111] border border-white/5 px-4 py-2 rounded-lg text-xs font-mono text-gray-400">
            REF: FAC-2026-AFRIDAM
          </div>
        </header>

        {/* METRIC GRID: Mobile-First (Rule #4) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#0A0A0A] border border-white/5 p-5 rounded-2xl">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* TRENDS CHART SHELL: Rule #4 Balanced Laptop View */}
          <section className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <BarChart3 size={18} className="text-[#E87042]" /> Diagnostic Volume
              </h3>
              <select className="bg-transparent text-xs border border-white/10 rounded-md p-1 outline-none">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
              </select>
            </div>
            
            {/* Rule #4: Responsive height for the chart container */}
            <div className="h-64 w-full bg-gradient-to-t from-[#E87042]/5 to-transparent border-b border-l border-white/5 relative flex items-end gap-2 px-2">
              {[40, 70, 45, 90, 65, 80, 95].map((height, i) => (
                <div 
                  key={i} 
                  style={{ height: `${height}%` }} 
                  className="flex-1 bg-[#E87042]/20 border-t border-[#E87042] rounded-t-sm"
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-gray-600 font-mono">
              <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            </div>
          </section>

          {/* TOP CONDITIONS: Rule #5 Humanized Data */}
          <section className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-[#E87042]" /> Top Conditions
            </h3>
            <div className="space-y-6">
              {[
                { name: "Atopic Dermatitis", count: 432, percent: 85 },
                { name: "Psoriasis", count: 124, percent: 45 },
                { name: "Acne Vulgaris", count: 98, percent: 30 }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-gray-500">{item.count} cases</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#E87042] h-full rounded-full" 
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 text-xs text-gray-400 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all">
              Export Clinical Data (CSV)
            </button>
          </section>

        </div>
      </div>
    </main>
  );
}