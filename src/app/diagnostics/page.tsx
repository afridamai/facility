"use client";

/* FILE: src/app/diagnostics/page.tsx
  DESCRIPTION: AI Skin Analysis portal for specialists to upload and review patient cases.
  CHANGES: 
    - Implemented a "Mobile-First" upload zone for quick skin capture.
    - Rule #6: Prepared mappings for /api/v1/skin-diagnosis and GCS uploads.
    - Rule #5: Humanized clinical confidence scores.
    - Rule #4: Balanced view for reviewing full AI reports on laptop.
*/

import React, { useState } from 'react';
import { 
  UploadCloud, 
  Camera, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  Activity 
} from 'lucide-react';

export default function DiagnosticsPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | any>(null);

  // Humanized Language (Rule #5): Simulating the AI analysis flow
  const handleDiagnosisRequest = () => {
    setIsUploading(true);
    // Rule #6: Placeholder for POST /api/v1/skin-diagnosis
    setTimeout(() => {
      setAnalysisResult({
        condition: "Psoriasis",
        confidence: 0.94,
        severity: "Moderate",
        recommendation: "Biopsy suggested to confirm clinical findings."
      });
      setIsUploading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold">AI Diagnostic Portal</h1>
          <p className="text-gray-400 mt-2">Upload clinical images for real-time melanin-optimized skin analysis.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* UPLOAD ZONE: Mobile-First Balance (Rule #4) */}
          <section className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all ${
                isUploading ? 'border-[#E87042] bg-[#E87042]/5' : 'border-white/10 hover:border-[#E87042]/40 bg-[#0A0A0A]'
              }`}
            >
              <div className="w-20 h-20 bg-[#E87042]/10 rounded-full flex items-center justify-center text-[#E87042] mb-6">
                {isUploading ? <Activity className="animate-spin" size={32} /> : <UploadCloud size={32} />}
              </div>
              
              <h2 className="text-xl font-semibold mb-2">Capture or Upload Image</h2>
              <p className="text-gray-500 text-sm mb-8 max-w-xs">
                Ensure the skin area is well-lit and the image is clear for the AI to analyze.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full px-4">
                <button 
                  onClick={handleDiagnosisRequest}
                  className="flex-1 bg-[#E87042] hover:bg-[#ff8252] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Camera size={20} /> Use Camera
                </button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold transition-all">
                  Browse Files
                </button>
              </div>
            </div>

            {/* Rule #5: Humanized Clinical Reminder */}
            <div className="bg-[#111111] border border-white/5 p-4 rounded-2xl flex items-start gap-4">
              <ShieldAlert className="text-[#E87042] shrink-0" size={20} />
              <p className="text-xs text-gray-400">
                <strong>Professional Disclaimer:</strong> This AI tool is a diagnostic aid. Final clinical decisions must be verified by a licensed specialist.
              </p>
            </div>
          </section>

          {/* ANALYSIS RESULT: Balanced Laptop View (Rule #4) */}
          <section className="space-y-6">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 min-h-[400px]">
              {!analysisResult ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-600">
                  <div className="w-16 h-16 border-4 border-white/5 rounded-full mb-4" />
                  <p>Pending Image Analysis...</p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex justify-between items-start mb-8">
                    <span className="bg-green-500/10 text-green-500 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-2">
                      <CheckCircle2 size={12} /> Analysis Complete
                    </span>
                    <span className="text-gray-500 text-xs">ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                  </div>

                  <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Primary Detection</h3>
                  <div className="text-4xl font-bold text-white mb-6">{analysisResult.condition}</div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 p-4 rounded-2xl">
                      <p className="text-gray-500 text-[10px] uppercase">AI Confidence</p>
                      <p className="text-2xl font-bold text-[#E87042]">{Math.round(analysisResult.confidence * 100)}%</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl">
                      <p className="text-gray-500 text-[10px] uppercase">Severity</p>
                      <p className="text-2xl font-bold">{analysisResult.severity}</p>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-6">
                    <p className="text-sm text-gray-400 leading-relaxed italic">
                      "{analysisResult.recommendation}"
                    </p>
                    <button className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all">
                      Generate Full Report <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}