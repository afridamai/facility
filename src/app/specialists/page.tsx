"use client"; // Essential for interactivity like the Access Toggle

/* FILE: src/app/specialists/page.tsx
  DESCRIPTION: Dashboard for Hospital Admins to manage Doctor/Specialist sub-accounts.
  CHANGES: 
    - Added "use client" to fix component rendering errors.
    - Simplified imports to avoid library conflicts.
    - Implemented Rule #4: Mobile-first responsive grid.
    - Rule #6: Mapped interface to 'SecureSpecialistResponseDto'.
*/

import React, { useState } from 'react';

// Rule #6: Reference Backend Map - SecureSpecialistResponseDto
interface Specialist {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  licenseNumber: string; // MDCN Number
  isActive: boolean;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function SpecialistPage() {
  // Humanized Language (Rule #5): Initializing state with a dummy list for localhost preview
  const [clinicalTeam, setClinicalTeam] = useState<Specialist[]>([
    {
      id: '1',
      firstName: 'Anand',
      lastName: 'Kumar',
      specialty: 'Dermatologist',
      licenseNumber: 'MDCN/12345',
      isActive: true,
      approvalStatus: 'APPROVED',
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Okonkwo',
      specialty: 'Clinical Nurse',
      licenseNumber: 'MDCN/98765',
      isActive: false,
      approvalStatus: 'PENDING',
    }
  ]);

  // Rule #6: Placeholder for PUT /api/specialists/{id}/active-status
  const toggleAccess = (id: string) => {
    setClinicalTeam(prev => prev.map(doc => 
      doc.id === id ? { ...doc, isActive: !doc.isActive } : doc
    ));
    console.log(`Backend Call: PUT /api/specialists/${id}/active-status triggered`);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-10">
      
      {/* HEADER: Mobile-First Stack (Rule #4) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Specialist Directory</h1>
          <p className="text-gray-400 mt-1">Manage your facility's medical personnel and sub-accounts.</p>
        </div>
        
        <button className="w-full md:w-auto bg-[#E87042] hover:bg-[#ff8252] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#E87042]/10 active:scale-95">
          + Add New Specialist
        </button>
      </div>

      {/* DIRECTORY GRID: Balanced View (Rule #4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicalTeam.map((doc) => (
          <div 
            key={doc.id} 
            className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-[#E87042]/40 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#E87042]/20 to-transparent rounded-2xl flex items-center justify-center text-[#E87042] text-xl font-bold border border-[#E87042]/10">
                {doc.firstName[0]}{doc.lastName[0]}
              </div>
              
              {/* Humanized Approval Status (Rule #5) */}
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                doc.approvalStatus === 'APPROVED' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
              }`}>
                {doc.approvalStatus === 'APPROVED' ? '● Verified' : '○ Under Review'}
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-1 group-hover:text-[#E87042] transition-colors">
              {`Dr. ${doc.firstName} ${doc.lastName}`}
            </h3>
            <p className="text-gray-500 text-sm mb-6">{doc.specialty}</p>

            <div className="space-y-4 border-t border-white/5 pt-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">MDCN License</span>
                <span className="text-gray-200 font-mono">{doc.licenseNumber}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Portal Access</span>
                {/* Rule #6: Interaction logic for toggling status */}
                <button 
                  onClick={() => toggleAccess(doc.id)}
                  className={`w-10 h-5 rounded-full p-1 transition-colors ${doc.isActive ? 'bg-[#E87042]' : 'bg-gray-800'}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${doc.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            <button className="w-full mt-6 py-3 rounded-lg border border-white/10 text-sm font-medium hover:bg-white hover:text-black transition-all">
              Launch Clinical Chat
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}