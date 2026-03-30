"use client";

/* FILE: src/app/settings/page.tsx
  DESCRIPTION: Facility Profile and Regional settings management.
  CHANGES: 
    - Implemented a sectioned layout for Facility Identity and Region (Rule #4).
    - Rule #6: Prepared for PATCH /api/facilities/me updates.
    - Rule #5: Humanized labels for "Clinic Brand Name" and "Regional Focus".
    - Added a non-editable verification badge for clinical trust.
*/

import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Globe, 
  Save, 
  ShieldCheck, 
  Bell, 
  Camera
} from 'lucide-react';

export default function FacilitySettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  // Rule #6: Local state mapped to Facility Schema
  const [facilityData, setFacilityData] = useState({
    name: "St. Patrick's Dermatology Center",
    email: "admin@stpatricks.ng",
    location: "Lagos, Nigeria",
    region: "West Africa",
    timezone: "WAT (GMT+1)"
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Rule #6: Reference Backend - PATCH /api/facilities/me
    console.log("Saving Facility Profile to Backend...");
    
    setTimeout(() => {
      setIsSaving(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight">Facility Settings</h1>
          <p className="text-gray-400 mt-2">Manage your clinic's public identity and regional clinical preferences.</p>
        </header>

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* BRAND IDENTITY SECTION: Rule #4 Balanced Layout */}
          <section className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* Logo Upload: Rule #5 Humanized */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-white/5 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-gray-600 hover:border-[#E87042]/50 hover:text-[#E87042] transition-all cursor-pointer group">
                  <Camera size={24} className="mb-2" />
                  <span className="text-[10px] font-bold uppercase">Logo</span>
                </div>
                <p className="text-[10px] text-gray-500 text-center max-w-[100px]">PNG or JPG up to 2MB</p>
              </div>

              <div className="flex-1 w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Clinic Brand Name</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                      <input 
                        value={facilityData.name}
                        onChange={(e) => setFacilityData({...facilityData, name: e.target.value})}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Contact Email</label>
                    <input 
                      value={facilityData.email}
                      onChange={(e) => setFacilityData({...facilityData, email: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* REGIONAL SETTINGS: Rule #6 Preparedness */}
          <section className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Globe size={18} className="text-[#E87042]" /> Clinical Localization
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Physical Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                  <input 
                    value={facilityData.location}
                    className="input-field pl-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Regional AI Model</label>
                <select className="input-field appearance-none cursor-pointer">
                  <option>West Africa (Standard)</option>
                  <option>East Africa (Experimental)</option>
                  <option>Southern Africa (Beta)</option>
                </select>
              </div>
            </div>
          </section>

          {/* NOTIFICATIONS: Rule #5 Humanized */}
          <section className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Bell size={18} className="text-[#E87042]" /> Communication
            </h2>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
              <div>
                <p className="text-sm font-medium">Diagnostic Alerts</p>
                <p className="text-xs text-gray-500">Receive email notifications when AI detects high-severity conditions.</p>
              </div>
              <div className="w-12 h-6 bg-[#E87042] rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </section>

          {/* SAVE ACTION */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={16} /> Verified Facility Account
            </div>
            <button 
              type="submit" 
              disabled={isSaving}
              className="btn-primary w-full md:w-auto px-10"
            >
              {isSaving ? "Updating Facility..." : "Save Settings"}
              {!isSaving && <Save size={18} />}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}