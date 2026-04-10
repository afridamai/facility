"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { authApi } from '@/lib/api-client';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authApi.verifyOrganizationCode({ email, code: verificationCode });
      router.push('/auth/register/success');
    } catch (err: any) {
      console.error("Verification failed:", err);
      setError(err.response?.data?.message || "Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-[#E87042]/10 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-[#E87042]/20">
            <Mail className="text-[#E87042]" size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Verify your Email</h1>
          <p className="text-gray-400 text-sm">
            We've sent a 6-digit verification code to <br />
            <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                required
                className="w-12 h-16 bg-[#0A0A0A] border border-white/5 rounded-2xl text-center text-2xl font-bold focus:border-[#E87042] outline-none transition-all"
              />
            ))}
          </div>

          {error && (
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex gap-3 items-center text-red-500 text-sm">
              <AlertCircle size={18} />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#E87042] hover:bg-[#ff8252] text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-lg shadow-xl shadow-[#E87042]/10 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              "Verify Code"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button"
            className="text-gray-500 hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-2 mx-auto"
            onClick={() => window.location.reload()}
          >
            Didn't receive the code? <span className="text-[#E87042]">Resend</span>
          </button>
        </div>

        <Link href="/auth/register" className="mt-12 flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors text-sm group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Admission Request
        </Link>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="text-[#E87042] animate-spin" size={48} />
      </main>
    }>
      <VerifyContent />
    </Suspense>
  );
}
