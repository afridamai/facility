"use client";

/* FILE: src/app/auth/register/page.tsx
  DESCRIPTION: Admission application for new medical partners (Organizations).
  CHANGES: 
    - Created a comprehensive registration form aligned with CreateOrganizationDto.
    - Rule #4: High-aesthetic, dark-mode design with clinical precision.
    - Rule #5: Humanized labels and progressive disclosure.
    - Integrated 'lucide-react' for visual guidance.
*/

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Building2, 
  Phone, 
  MapPin, 
  FileText, 
  Image as ImageIcon,
  Palette,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { authApi } from '@/lib/api-client';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Rule #6: State aligned with CreateOrganizationDto
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    logoUrl: 'https://placeholder.com/logo.png', // Simulated
    brandingColors: { primary: '#E87042', secondary: '#0A0A0A' },
    licenseUrl: 'https://placeholder.com/license.pdf', // Simulated
    licenseNumber: '',
    isActive: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (type: 'primary' | 'secondary', value: string) => {
    setFormData(prev => ({
      ...prev,
      brandingColors: { ...prev.brandingColors, [type]: value }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.registerOrganization(formData);
      router.push(`/auth/register/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (error: any) {
      console.error("Registration failed:", error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col justify-center items-center p-6 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="text-green-500" size={40} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Application Received</h1>
        <p className="text-gray-400 max-w-sm">
          Our clinical compliance team will review your MDCN credentials. You'll receive an email once approved.
        </p>
        <p className="text-[#E87042] mt-8 text-sm font-medium">Redirecting to Login...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 lg:p-24">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <Link href="/auth/login" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
            </Link>
            <h1 className="text-4xl font-bold tracking-tight">Partner with AfriDam</h1>
            <p className="text-gray-400 mt-2">Apply for clinical admission to the Intelligence Hub.</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className={`w-10 h-1 rounded-full ${step >= 1 ? 'bg-[#E87042]' : 'bg-white/5'}`} />
            <div className={`w-10 h-1 rounded-full ${step >= 2 ? 'bg-[#E87042]' : 'bg-white/5'}`} />
            <div className={`w-10 h-1 rounded-full ${step >= 3 ? 'bg-[#E87042]' : 'bg-white/5'}`} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN: IDENTITY & AUTH */}
          <div className="space-y-8">
            <section className="space-y-6">
              <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-2">
                <Building2 className="text-[#E87042]" size={20} /> Facility Identity
              </h2>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Organization Name</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="St. Mary's Specialist Hospital"
                    className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#E87042] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@hospital.com"
                      className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#E87042] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input 
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#E87042] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Physical Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-600" size={18} />
                  <textarea 
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Clinical Way, Lagos, Nigeria"
                    rows={3}
                    className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#E87042] transition-all resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Access Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#E87042] transition-all"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: BRANDING & COMPLIANCE */}
          <div className="space-y-12">
            
            <section className="space-y-6">
              <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-2">
                <Palette className="text-[#E87042]" size={20} /> Clinical Branding
              </h2>
              
              {/* LOGO SIMULATION */}
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Facility Logo</label>
                <div className="border-2 border-dashed border-white/5 rounded-3xl p-8 text-center hover:border-[#E87042]/30 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ImageIcon className="text-gray-500" size={24} />
                  </div>
                  <p className="text-sm font-medium">Click to upload SVG or PNG</p>
                  <p className="text-[10px] text-gray-600 mt-1">Recommended: 512x512px</p>
                </div>
              </div>

              {/* COLORS */}
              <div className="flex gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Primary Color</label>
                  <div className="flex items-center gap-3 bg-[#0A0A0A] border border-white/5 p-2 rounded-2xl">
                    <input 
                      type="color" 
                      value={formData.brandingColors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-10 h-10 rounded-xl bg-transparent border-none cursor-pointer"
                    />
                    <span className="text-xs font-mono uppercase">{formData.brandingColors.primary}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Secondary</label>
                  <div className="flex items-center gap-3 bg-[#0A0A0A] border border-white/5 p-2 rounded-2xl">
                    <input 
                      type="color" 
                      value={formData.brandingColors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="w-10 h-10 rounded-xl bg-transparent border-none cursor-pointer"
                    />
                    <span className="text-xs font-mono uppercase">{formData.brandingColors.secondary}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-2">
                <ShieldCheck className="text-[#E87042]" size={20} /> Medical Compliance
              </h2>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">MDCN License Number</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    required
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="HEFAMAA/2026/0842"
                    className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#E87042] transition-all"
                  />
                </div>
              </div>

              {/* LICENSE UPLOAD SIMULATION */}
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Medical License PDF</label>
                <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl border-l-4 border-l-[#E87042]/50">
                  <div className="p-3 bg-[#E87042]/10 rounded-xl">
                    <FileText className="text-[#E87042]" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Digital MDCN License</p>
                    <p className="text-[10px] text-gray-500">Upload your latest verification certificate.</p>
                  </div>
                  <button type="button" className="text-xs font-bold uppercase tracking-widest hover:text-[#E87042] transition-colors">Select File</button>
                </div>
              </div>

              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex gap-4 items-start">
                <AlertCircle className="text-blue-500 shrink-0" size={18} />
                <p className="text-[10px] text-blue-200/60 leading-relaxed uppercase tracking-[0.05em]">
                  AfriDam uses deep-learning to verify MDCN credentials. Standard verification takes 24-48 business hours.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#E87042] hover:bg-[#ff8252] text-white py-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-[#E87042]/10 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Application...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={24} />
                    <span>Submit Admission Request</span>
                  </>
                )}
              </button>
            </section>

          </div>
        </form>

        <p className="text-center mt-12 text-gray-600 text-xs">
          By submitting, you agree to AfriDam's <span className="underline cursor-pointer">Clinical Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>

      </div>
    </main>
  );
}
