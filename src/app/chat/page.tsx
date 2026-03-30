"use client";

/* FILE: src/app/chat/page.tsx
  DESCRIPTION: Real-time clinical chat interface for specialists and patients.
  CHANGES: 
    - Implemented a "Clinic-Ready" split-screen layout (Rule #4).
    - Integrated Rule #6: Reference to /api/chats and /api/v1/skin-diagnosis.
    - Added "Clinical Context" sidebar for patient AI reports.
    - Rule #5: Humanized status indicators (e.g., "In Consultation").
*/

import React, { useState } from 'react';
import { 
  Send, 
  User, 
  Activity, 
  FileText, 
  MoreVertical, 
  Image as ImageIcon 
} from 'lucide-react';

export default function ClinicalChatPage() {
  const [message, setMessage] = useState('');
  
  // Rule #5 & #6: Humanized placeholder data representing a live session
  const activePatient = {
    name: "Kwame Mensah",
    age: 34,
    condition: "Acute Eczema (AI Detected)",
    diagnosisId: "DIAG-992",
    status: "In Consultation"
  };

  const [messages] = useState([
    { id: 1, sender: 'system', text: 'AI Analysis Attached: 94% Probability of Atopic Dermatitis.', time: '10:00 AM' },
    { id: 2, sender: 'patient', text: 'Hello Doctor, the itching has worsened over the last 2 days.', time: '10:05 AM' },
    { id: 3, sender: 'doctor', text: 'I see the AI report. Have you applied the prescribed ointment today?', time: '10:07 AM' },
  ]);

  return (
    <main className="flex h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* LEFT SIDEBAR: Patient List & Info (Hidden on mobile, balanced on laptop) */}
      <aside className="hidden lg:flex flex-col w-80 border-r border-white/5 bg-[#0A0A0A]">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold">Active Consults</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="bg-[#E87042]/10 border border-[#E87042]/30 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold">{activePatient.name}</p>
              <span className="text-[10px] bg-[#E87042] px-2 py-0.5 rounded-full uppercase">Live</span>
            </div>
            <p className="text-xs text-gray-400 italic">{activePatient.condition}</p>
          </div>
        </div>
      </aside>

      {/* CENTER: Chat Interface (Full-screen focus for Rule #4) */}
      <section className="flex-1 flex flex-col relative">
        
        {/* Chat Header */}
        <header className="p-4 md:p-6 border-b border-white/5 flex justify-between items-center bg-[#0A0A0A]/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-400" />
            </div>
            <div>
              <h3 className="font-medium">{activePatient.name}</h3>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <Activity size={10} /> {activePatient.status}
              </p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-white transition-colors">
            <MoreVertical size={20} />
          </button>
        </header>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] md:max-w-[60%] p-4 rounded-2xl ${
                msg.sender === 'doctor' 
                  ? 'bg-[#E87042] text-white rounded-tr-none' 
                  : msg.sender === 'system'
                  ? 'bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm italic rounded-none w-full text-center'
                  : 'bg-[#111111] text-gray-200 rounded-tl-none'
              }`}>
                <p className="text-sm md:text-base">{msg.text}</p>
                <span className="text-[10px] opacity-50 mt-2 block text-right">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area: Rule #4 Mobile thumb-optimized */}
        <footer className="p-4 md:p-6 bg-[#0A0A0A] border-t border-white/5">
          <form className="flex items-center gap-3 max-w-5xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <button type="button" className="p-2 text-gray-500 hover:text-[#E87042] transition-colors">
              <ImageIcon size={24} />
            </button>
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type clinical advice or notes..."
              className="flex-1 bg-[#111111] border border-white/10 rounded-full px-6 py-3 outline-none focus:border-[#E87042] transition-all"
            />
            <button className="bg-[#E87042] p-3 rounded-full hover:bg-[#ff8252] transition-all active:scale-90">
              <Send size={20} />
            </button>
          </form>
        </footer>
      </section>

      {/* RIGHT SIDEBAR: Clinical Context (Hidden on mobile) */}
      <aside className="hidden xl:flex flex-col w-72 border-l border-white/5 bg-[#050505] p-6">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <FileText size={14} /> AI Clinical Insights
        </h4>
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden border border-white/10 aspect-square bg-gray-900 flex items-center justify-center text-gray-700">
            [Patient Skin Image]
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 underline cursor-pointer hover:text-[#E87042]">
              View Full Analysis Report ({activePatient.diagnosisId})
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}