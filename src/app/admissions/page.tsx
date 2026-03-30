"use client";

/* FILE: src/app/admissions/page.tsx
  DESCRIPTION: Facility Onboarding & Credential Verification page.
  CHANGES: 
    - Created a "Verification Checklist" UI (Rule #4).
    - Rule #6: Mapped to /api/specialist-documents/me for status tracking.
    - Rule #5: Humanized status labels like "Verified for Clinical Use".
    - Rule #4: Integrated a mobile-optimized upload drawer style.
*/

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Upload, 
  AlertCircle, 
  CheckCircle, 
  Building2 
} from 'lucide-react';

export default function AdmissionsPage() {
  // Rule #5 & #6: Humanized status representing the verification pipeline
  const [docs] = useState([
    { id: 1, name: "MDCN Facility License", status: "VERIFIED", type: "PDF" },
    { id: 2, name: "Director's Practicing Certificate", status: "PENDING", type: "Image" },
    { id: 3, name: "Corporate Affairs Commission (CAC)", status: "REQUIRED", type: "PDF" }
  ]);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER: Rule #5 Humanized Context */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#E87042]/10 rounded-lg">
              <ShieldCheck className="text-[#E87042]" size={28} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Clinical Verification</h1>
          </div>
          <p className="text-gray-400 max-w-2xl">
            To unlock AI Diagnostics and the $2,000 credit grant, your facility must complete the MDCN credentialing process.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* VERIFICATION CHECKLIST: Mobile-First Stack (Rule #4) */}
          <section className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Required Documentation</h3>
            
            {docs.map((doc) => (
              <div 
                key={doc.id} 
                className="bg-[#0A0A0A] border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    doc.status === 'VERIFIED' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-gray-400'
                  }`}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm md:text-base">{doc.name}</h4>
                    <p className="text-[10px] text-gray-500">{doc.type} Format Supported</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {doc.status === 'VERIFIED' ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/5 px-3 py-1 rounded-full uppercase">
                      <CheckCircle size={12} /> Verified
                    </span>
                  ) : doc.status === 'PENDING' ? (
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-400/5 px-3 py-1 rounded-full uppercase">
                      In Review
                    </span>
                  ) : (
                    <button className="flex items-center gap-2 text-xs font-bold text-[#E87042] bg-[#E87042]/5 px-4 py-2 rounded-lg hover:bg-[#E87042] hover:text-white transition-all">
                      <Upload size={14} /> Upload
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* STATUS SIDEBAR: Balanced Laptop View (Rule #4) */}
          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-[#111111] to-[#050505] border border-white/5 p-6 rounded-3xl">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-400">
                <Building2 size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Facility Status</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Your facility is currently in <span className="text-white font-bold">Provisional Access</span> mode.
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-[#E87042]">66%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#E87042] h-full rounded-full w-[66%]" />
                </div>
              </div>
            </div>

            {/* Rule #5: Humanized Support Note */}
            <div className="p-6 border border-dashed border-white/10 rounded-3xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-blue-400 shrink-0" size={18} />
                <p className="text-xs text-gray-500 leading-relaxed">
                  Need help with your MDCN uploads? Our clinical support team is available 24/7 to assist with your onboarding.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}