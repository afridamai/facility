"use client";

/* FILE: src/app/specialists/add/page.tsx
  DESCRIPTION: Onboarding form for Hospital Admins to register new Specialist sub-accounts.
  CHANGES: 
    - Created a single-column mobile-first layout (Rule #4).
    - Mapped form fields to CreateSpecialistDto (Rule #6).
    - Integrated 'lucide-react' for clinical iconography.
    - Added Humanized Language for error prevention (Rule #5).
    - Rule #3: Touched onSubmit logic to simulate backend latency.
*/

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ShieldCheck, 
  UserPlus, 
  Mail, 
  Stethoscope, 
  Loader2 
} from 'lucide-react';

export default function AddSpecialistPage() {
  const router = useRouter();
  
  // Rule #6: State structure aligned with CreateSpecialistDto on the Backend
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    specialty: '',
    licenseNumber: '', // Rule #6: Required for MDCN /api/specialist-documents
    email: '',
    role: 'SPECIALIST'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Rule #6: Referencing Backend Endpoint - POST /api/specialists
    // This will pull the current Facility ID from the Admin's session token.
    console.log("Connecting to API endpoint: POST /api/specialists...");
    
    // Simulate network delay for Localhost Preview
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/specialists'); // Redirect to directory on success
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-12 flex justify-center">
      <div className="w-full max-w-xl">
        
        {/* Navigation - Rule #4: High-hit-area button for mobile thumbs */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-[#E87042] transition-colors mb-10 group py-2"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Team Directory</span>
        </button>

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Onboard Specialist</h1>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            Register a new doctor. They will receive an email to activate their account and access the AI Diagnostic suite.
          </p>
        </header>

        {/* ONBOARDING FORM: Rule #4 Responsive Balance */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">First Name</label>
              <input 
                required
                type="text"
                className="input-field" // Rule #3: Utilizing the class defined in globals.css
                placeholder="e.g. Chidi"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Last Name</label>
              <input 
                required
                type="text"
                className="input-field"
                placeholder="e.g. Okoro"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* Specialty Section - Rule #5: Humanized labels */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Stethoscope size={14} className="text-gray-400" /> Area of Expertise
            </label>
            <select 
              required
              className="input-field appearance-none cursor-pointer"
              onChange={(e) => setFormData({...formData, specialty: e.target.value})}
            >
              <option value="" className="bg-[#0A0A0A]">Select Specialty</option>
              <option value="Dermatologist" className="bg-[#0A0A0A]">Dermatologist</option>
              <option value="General Practitioner" className="bg-[#0A0A0A]">General Practitioner</option>
              <option value="Clinical Pathologist" className="bg-[#0A0A0A]">Clinical Pathologist</option>
            </select>
          </div>

          {/* MDCN License - Rule #6: Reference /api/specialist-documents verification */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#E87042]" /> MDCN License Number
            </label>
            <input 
              required
              type="text"
              className="input-field font-mono"
              placeholder="MDCN/R/00000"
              onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
            />
            <p className="text-[10px] text-gray-600 ml-1 italic leading-relaxed">
              Official verification with the Medical and Dental Council of Nigeria will be initiated upon submission.
            </p>
          </div>

          {/* Email Section */}
          <div className="space-y-2 border-t border-white/5 pt-6">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Mail size={14} className="text-gray-400" /> Professional Email
            </label>
            <input 
              required
              type="email"
              className="input-field"
              placeholder="doctor@hospital-name.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Submit Action */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`btn-primary w-full mt-8 ${isSubmitting ? 'opacity-50' : ''}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Validating with MDCN...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Confirm & Create Sub-Account
              </>
            )}
          </button>
        </form>

      </div>
    </main>
  );
}