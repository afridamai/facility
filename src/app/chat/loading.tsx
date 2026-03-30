/* FILE: src/app/chat/loading.tsx
  DESCRIPTION: Skeleton loader for the Clinical Chat and Patient History interface.
  CHANGES: 
    - Created a three-pane skeleton layout to match chat/page.tsx (Rule #4).
    - Rule #5: Humanized "Bubbles" that mimic patient and doctor message positions.
    - Implemented Rule #4: Hidden sidebars on mobile to prioritize the message thread.
    - Balanced for laptop-fitted view with a loading sidebar for clinical context.
*/

import React from 'react';

export default function ChatLoading() {
  return (
    <main className="flex h-screen bg-[#050505] overflow-hidden animate-in fade-in duration-500">
      
      {/* LEFT SIDEBAR SKELETON (Hidden on mobile) */}
      <aside className="hidden lg:flex flex-col w-80 border-r border-white/5 bg-[#0A0A0A]">
        <div className="p-6 border-b border-white/5">
          <div className="h-7 w-32 bg-white/5 rounded-md animate-pulse" />
        </div>
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 w-full bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      </aside>

      {/* CENTER: CHAT THREAD SKELETON */}
      <section className="flex-1 flex flex-col relative">
        
        {/* Chat Header Skeleton */}
        <header className="p-4 md:p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 rounded-full animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
            <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
          </div>
        </header>

        {/* Message Thread Skeleton: Rule #5 Humanized bubble placement */}
        <div className="flex-1 p-4 md:p-8 space-y-8">
          {/* System/AI Message Skeleton */}
          <div className="h-10 w-full bg-blue-500/5 border border-blue-500/10 rounded-md animate-pulse" />
          
          {/* Patient Message Skeleton (Left) */}
          <div className="flex justify-start">
            <div className="w-2/3 md:w-1/2 space-y-2">
              <div className="h-16 bg-white/5 rounded-2xl rounded-tl-none animate-pulse" />
              <div className="h-2 w-10 bg-white/5 rounded ml-auto animate-pulse" />
            </div>
          </div>

          {/* Doctor Message Skeleton (Right) */}
          <div className="flex justify-end">
            <div className="w-2/3 md:w-1/2 space-y-2">
              <div className="h-12 bg-[#E87042]/10 rounded-2xl rounded-tr-none animate-pulse" />
              <div className="h-2 w-10 bg-white/5 rounded ml-auto animate-pulse" />
            </div>
          </div>

          {/* Patient Message Skeleton (Left) */}
          <div className="flex justify-start">
            <div className="w-1/2 h-12 bg-white/5 rounded-2xl rounded-tl-none animate-pulse" />
          </div>
        </div>

        {/* Input Area Skeleton */}
        <footer className="p-4 md:p-6 bg-[#0A0A0A] border-t border-white/5">
          <div className="flex items-center gap-3 max-w-5xl mx-auto">
            <div className="w-10 h-10 bg-white/5 rounded-full animate-pulse" />
            <div className="h-12 flex-1 bg-white/5 rounded-full animate-pulse" />
            <div className="w-12 h-12 bg-white/5 rounded-full animate-pulse" />
          </div>
        </footer>
      </section>

      {/* RIGHT SIDEBAR SKELETON (Hidden on mobile/tablet) */}
      <aside className="hidden xl:flex flex-col w-72 border-l border-white/5 bg-[#050505] p-6 space-y-6">
        <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
        <div className="aspect-square w-full bg-white/5 rounded-xl animate-pulse" />
        <div className="space-y-3">
          <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-3/4 bg-white/5 rounded animate-pulse" />
        </div>
      </aside>
    </main>
  );
}