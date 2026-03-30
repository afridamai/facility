/* FILE: src/app/diagnostics/loading.tsx
  DESCRIPTION: Skeleton loader for the AI Skin Analysis portal.
  CHANGES: 
    - Designed a split-pane skeleton to match the diagnostics/page.tsx (Rule #4).
    - Rule #5: Humanized placeholders that mimic a "Scanning" state.
    - Added a large placeholder for the clinical image preview.
    - Balanced for mobile-first stacking and laptop-fitted side-by-side view.
*/

import React from 'react';

export default function DiagnosticsLoading() {
  return (
    <main className="min-h-screen bg-[#050505] p-4 md:p-10 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SKELETON */}
        <header className="mb-10 space-y-3">
          <div className="h-9 w-64 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-4 w-96 bg-white/5 rounded-lg animate-pulse max-w-full" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT SIDE: UPLOAD ZONE SKELETON */}
          <section className="space-y-6">
            <div className="border-2 border-dashed border-white/5 rounded-3xl p-12 bg-[#0A0A0A] flex flex-col items-center">
              <div className="w-20 h-20 bg-white/5 rounded-full animate-pulse mb-6" />
              <div className="h-6 w-48 bg-white/5 rounded-md animate-pulse mb-2" />
              <div className="h-4 w-64 bg-white/5 rounded-md animate-pulse mb-8" />
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="h-14 flex-1 bg-white/5 rounded-xl animate-pulse" />
                <div className="h-14 flex-1 bg-white/5 rounded-xl animate-pulse" />
              </div>
            </div>

            {/* Disclaimer Skeleton */}
            <div className="bg-[#111111] border border-white/5 p-4 rounded-2xl flex gap-4">
              <div className="w-5 h-5 bg-white/5 rounded-full animate-pulse shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
                <div className="h-3 w-3/4 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          </section>

          {/* RIGHT SIDE: ANALYSIS RESULT SKELETON */}
          <section className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 min-h-[400px] space-y-8">
            <div className="flex justify-between">
              <div className="h-6 w-32 bg-white/5 rounded-full animate-pulse" />
              <div className="h-4 w-20 bg-white/5 rounded-md animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
              <div className="h-12 w-48 bg-white/5 rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-white/5 rounded-2xl animate-pulse" />
              <div className="h-24 bg-white/5 rounded-2xl animate-pulse" />
            </div>

            <div className="space-y-3 pt-6 border-t border-white/5">
              <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
              <div className="h-14 w-full bg-white/5 rounded-xl animate-pulse mt-4" />
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}