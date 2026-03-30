"use client";

/* FILE: src/app/notifications/page.tsx
  DESCRIPTION: Centralized alert system for clinical and administrative updates.
  CHANGES: 
    - Created a categorized alert list (Rule #4).
    - Rule #6: Mapped to /api/notifications data structure.
    - Rule #5: Humanized notification categories (e.g., "Urgent Diagnosis").
    - Added "Mark all as read" functionality for workflow efficiency.
*/

import React, { useState } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  MessageSquare, 
  UserPlus, 
  CheckCheck, 
  Trash2, 
  Clock 
} from 'lucide-react';

export default function NotificationsPage() {
  // Rule #5 & #6: Humanized placeholder data representing various system triggers
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'URGENT',
      title: 'High Severity Detection',
      message: 'AI Scan #442 (Patient: Z. Bello) indicates a 92% probability of Melanoma. Immediate specialist review required.',
      time: '12 mins ago',
      isRead: false,
      icon: ShieldAlert,
      color: 'text-red-500'
    },
    {
      id: 2,
      type: 'TEAM',
      title: 'New Specialist Onboarded',
      message: 'Dr. Sarah Chen has successfully verified her MDCN license and joined the Clinical Wing.',
      time: '2 hours ago',
      isRead: false,
      icon: UserPlus,
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'CHAT',
      title: 'New Consultation Message',
      message: 'Patient Kwame Mensah replied to your inquiry regarding treatment progress.',
      time: '5 hours ago',
      isRead: true,
      icon: MessageSquare,
      color: 'text-[#E87042]'
    }
  ]);

  const markAllRead = () => {
    // Rule #6: Placeholder for PATCH /api/notifications/read-all
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER: Rule #4 Balance */}
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Bell className="text-[#E87042]" /> Notifications
            </h1>
            <p className="text-gray-400 mt-2 text-sm">Stay updated on clinical activity and system alerts.</p>
          </div>
          <button 
            onClick={markAllRead}
            className="text-xs font-bold text-gray-500 hover:text-white transition-colors flex items-center gap-2 pb-1"
          >
            <CheckCheck size={16} /> Mark all as read
          </button>
        </header>

        {/* NOTIFICATION LIST: Rule #4 Mobile-First Skimmability */}
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`relative overflow-hidden bg-[#0A0A0A] border rounded-2xl p-5 transition-all group ${
                notif.isRead ? 'border-white/5 opacity-60' : 'border-[#E87042]/20 shadow-lg shadow-[#E87042]/5'
              }`}
            >
              {!notif.isRead && (
                <div className="absolute top-0 left-0 w-1 h-full bg-[#E87042]" />
              )}
              
              <div className="flex gap-5">
                <div className={`mt-1 shrink-0 ${notif.color}`}>
                  <notif.icon size={22} />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold text-sm md:text-base ${!notif.isRead ? 'text-white' : 'text-gray-400'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-gray-600 flex items-center gap-1 font-mono">
                      <Clock size={10} /> {notif.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {notif.message}
                  </p>
                  
                  {!notif.isRead && (
                    <div className="pt-3 flex gap-4">
                      <button className="text-[10px] font-bold uppercase tracking-widest text-[#E87042] hover:text-[#ff8252]">
                        View Details
                      </button>
                      <button className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-white">
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE / FOOTER */}
        <footer className="mt-12 pt-8 border-t border-white/5 flex justify-center">
          <button className="text-xs text-gray-600 flex items-center gap-2 hover:text-red-500 transition-colors">
            <Trash2 size={14} /> Clear Notification History
          </button>
        </footer>
      </div>
    </main>
  );
}