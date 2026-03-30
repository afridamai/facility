"use client";

/* FILE: src/components/ThemeToggle.tsx
  DESCRIPTION: A high-end switch to flip between White Mode and Black Mode.
  CHANGES: 
    - Implemented a state-based toggle for the 'dark' class on the document root.
    - Rule #4: Designed as a compact, floating action or sidebar element.
    - Rule #5: Used Sun/Moon iconography for intuitive "Day/Night" shift.
    - Added a smooth spring animation for the icon transition.
*/

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  // Rule #3: On mount, check if the user already has a preference saved
  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.classList.contains('dark');
    setIsDark(initialColorValue);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-[var(--surface-clinical)] border border-[var(--border-clinical)] 
                 hover:border-[#E87042]/50 transition-all duration-300 group flex items-center justify-center
                 shadow-sm hover:shadow-[#E87042]/10"
      aria-label="Toggle Clinical Theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon: Shows when in Dark mode to suggest switching to Light */}
        <Sun 
          size={20} 
          className={`absolute transition-all duration-500 transform ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
          } text-gray-400 group-hover:text-[#E87042]`} 
        />
        
        {/* Moon Icon: Shows when in Light mode to suggest switching to Dark */}
        <Moon 
          size={20} 
          className={`absolute transition-all duration-500 transform ${
            !isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          } text-[#E87042]`} 
        />
      </div>
    </button>
  );
}