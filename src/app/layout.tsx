import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { 
  Users, 
  MessageSquare, 
  Activity, 
  BarChart3, 
  ShieldCheck, 
  LogOut,
  LayoutDashboard,
  Bell,
  Search
} from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

/* FILE: src/app/layout.tsx
  DESCRIPTION: The Global Theme-Aware Layout for the Facility Portal. 
  CHANGES: 
    - Rule #3: Integrated ThemeToggle component into Sidebar and Mobile Header.
    - Rule #4: Added a Top Header for Search and Theme controls on Laptop view.
    - Rule #5: Refined Sidebar padding and active-state visual cues.
    - Rule #6: Prepared for notification count badges (linked to /api/notifications).
*/

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AfriDam | Facility Portal',
  description: 'Clinical Management & AI Diagnostics Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // Rule #5: Humanized Navigation Menu for Clinical Roles
  const navItems = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Clinical Team', href: '/specialists', icon: Users },
    { name: 'Patient Chat', href: '/chat', icon: MessageSquare },
    { name: 'AI Diagnostics', href: '/diagnostics', icon: Activity },
    { name: 'Facility Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Verification', href: '/admissions', icon: ShieldCheck },
  ];

  return (
    <html lang="en" className="dark" suppressHydrationWarning> 
      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-300`}>
        <div className="flex min-h-screen">
          
          {/* SIDEBAR: Rule #4 Balanced Laptop View */}
          <aside className="hidden lg:flex flex-col w-64 border-r border-[var(--border-clinical)] bg-[var(--surface-clinical)] fixed h-full z-40">
            <div className="p-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#E87042] rounded-xl flex items-center justify-center shadow-lg shadow-[#E87042]/20">
                  <ShieldCheck className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold tracking-tighter">AFRIDAM</span>
              </div>
            </div>

            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-[var(--foreground)] hover:bg-[var(--background)] rounded-xl transition-all group border border-transparent hover:border-[var(--border-clinical)]"
                >
                  <item.icon size={18} className="group-hover:text-[#E87042] transition-colors" />
                  <span className="text-sm font-semibold">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Rule #3 & #4: Placement for Theme Control and Exit */}
            <div className="p-6 border-t border-[var(--border-clinical)] space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Appearance</span>
                <ThemeToggle />
              </div>
              <Link href="/auth/login" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/5 rounded-xl w-full transition-all font-bold text-sm">
                <LogOut size={18} />
                Exit Workspace
              </Link>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative">
            
            {/* TOP HEADER: Rule #4 Balanced Laptop/Mobile Header */}
            <header className="sticky top-0 z-30 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border-clinical)] px-6 py-4 flex items-center justify-between">
              <div className="lg:hidden flex items-center gap-3">
                <div className="w-8 h-8 bg-[#E87042] rounded-lg" />
                <span className="font-bold tracking-tight">AFRIDAM</span>
              </div>
              
              <div className="hidden lg:flex items-center bg-[var(--surface-clinical)] border border-[var(--border-clinical)] rounded-full px-4 py-1.5 w-96 group focus-within:border-[#E87042]/50 transition-all">
                <Search size={16} className="text-gray-500 group-focus-within:text-[#E87042]" />
                <input 
                  placeholder="Search specialists, patients, or scans..." 
                  className="bg-transparent border-none outline-none text-xs ml-3 w-full placeholder:text-gray-600"
                />
              </div>

              <div className="lg:hidden">
                <ThemeToggle />
              </div>
            </header>

            {/* MOBILE NAV: Rule #4 Bottom Bar */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--surface-clinical)]/80 backdrop-blur-xl border-t border-[var(--border-clinical)] z-50 px-8 py-4 flex justify-between items-center">
              {navItems.slice(0, 5).map((item) => (
                <Link key={item.name} href={item.href} className="text-gray-400 hover:text-[#E87042] transition-colors">
                  <item.icon size={22} />
                </Link>
              ))}
            </nav>

            <main className="p-6 md:p-10 pb-24 lg:pb-10 max-w-7xl">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}