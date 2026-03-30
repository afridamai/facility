/* FILE: src/app/specialists/loading.tsx
  DESCRIPTION: Performance-focused skeleton loader for the Specialist Directory.
  CHANGES: 
    - Created a 3-column grid skeleton to match specialists/page.tsx (Rule #4).
    - Implemented a "shimmer" animation to provide visual feedback.
    - Balanced the layout for both mobile-first single column and laptop-fitted view.
    - Rule #5: Used soft, non-distracting colors to maintain a calm clinical feel.
*/

import React from 'react';

export default function SpecialistsLoading() {
  // We generate 6 skeleton cards to fill the initial screen view
  const skeletonCards = Array.from({ length: 6 });

  return (
    <main className="min-h-screen bg-[#050505] p-6 md:p-12 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SKELETON */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="h-10 w-64 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-4 w-48 bg-white/5 rounded-lg animate-pulse" />
          </div>
          <div className="h-14 w-full md:w-48 bg-white/5 rounded-xl animate-pulse" />
        </header>

        {/* SEARCH & FILTER SKELETON */}
        <div className="h-14 w-full bg-white/5 rounded-2xl mb-10 animate-pulse" />

        {/* CARD GRID SKELETON: Rule #4 Responsive Logic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonCards.map((_, i) => (
            <div 
              key={i} 
              className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 space-y-6"
            >
              {/* Profile Picture & Status Skeleton */}
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-white/5 rounded-2xl animate-pulse" />
                <div className="w-20 h-6 bg-white/5 rounded-full animate-pulse" />
              </div>

              {/* Text Info Skeleton */}
              <div className="space-y-3">
                <div className="h-6 w-3/4 bg-white/5 rounded-md animate-pulse" />
                <div className="h-4 w-1/2 bg-white/5 rounded-md animate-pulse" />
              </div>

              {/* Action Button Skeleton */}
              <div className="pt-4">
                <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}