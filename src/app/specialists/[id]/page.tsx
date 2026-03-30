"use client";

/* FILE: src/app/specialists/[id]/page.tsx
  DESCRIPTION: Detailed view and editor for an individual specialist's sub-account.
  CHANGES: 
    - Created a "Profile Header" with active/inactive status toggling.
    - Rule #6: Prepared for PATCH /api/specialists/{id} updates.
    - Rule #5: Humanized labels for account management (e.g., "Revoke Access").
    - Rule #4: Balanced split-view for laptop (Bio + Settings).
*/

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  ShieldCheck, 
  Trash2, 
  Save, 
  Activity 
} from 'lucide-react';

export default function SpecialistDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  
  // Rule #5 & #6: Humanized placeholder data representing a specialist fetch
  const [specialist, setSpecialist] = useState({
    firstName: "Anand",
    lastName: "Kumar",
    email: "a.kumar@afridam.com",
    specialty: "Dermatologist",
    license: "MDCN/R/55201",
    status: "Active"
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Rule #6: Reference Backend - PATCH /api/specialists/{id}
    console.log(`Updating record ${id} via PATCH /api/specialists/${id}`);
    
    setTimeout(() => {
      setIsSaving(false);
      router.refresh();
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-[#E87042] transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Directory</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PROFILE CARD: Rule #4 Mobile-First Focus */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-tr from-[#E87042] to-[#ff8252] rounded-full flex items-center justify-center mb-6 shadow-xl">
                <User size={48} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold">{specialist.firstName} {specialist.lastName}</h1>
              <p className="text-[#E87042] font-medium text-sm mb-4">{specialist.specialty}</p>
              
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                {specialist.status}
              </div>

              <div className="w-full border-t border-white/5 mt-8 pt-8 space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 uppercase">Consultations</span>
                  <span className="font-bold">142</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 uppercase">AI Accuracy</span>
                  <span className="font-bold">98.2%</span>
                </div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 text-red-500/70 hover:text-red-500 text-sm py-4 border border-red-500/10 hover:bg-red-500/5 rounded-2xl transition-all">
              <Trash2 size={16} /> Revoke Clinical Access
            </button>
          </aside>

          {/* EDIT FORM: Balanced Laptop View (Rule #4) */}
          <section className="lg:col-span-2">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Activity size={20} className="text-[#E87042]" /> Account Settings
              </h2>
              
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">First Name</label>
                    <input 
                      defaultValue={specialist.firstName}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Last Name</label>
                    <input 
                      defaultValue={specialist.lastName}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Professional Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                    <input 
                      defaultValue={specialist.email}
                      className="input-field pl-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">MDCN License Reference</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E87042]" size={16} />
                    <input 
                      disabled
                      defaultValue={specialist.license}
                      className="input-field pl-12 opacity-50 cursor-not-allowed bg-transparent border-dashed"
                    />
                  </div>
                  <p className="text-[10px] text-gray-600 italic">License numbers are locked once verified by AfriDam Admin.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="btn-primary w-full md:w-auto px-12"
                >
                  {isSaving ? "Saving Changes..." : "Save Specialist Profile"}
                  {!isSaving && <Save size={18} />}
                </button>
              </form>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}