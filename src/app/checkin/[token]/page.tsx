'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePostum } from '@/context/postum-context';
import { ShieldCheck, Heart, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export default function MagicCheckinPage({ params }: { params: { token: string } }) {
  const { performCheckin, profile } = usePostum();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Simula validação do token e executa o check-in de 1 clique
    performCheckin('email');
    setCompleted(true);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-8 text-center shadow-floating space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-[#0D9488]/10 text-[#0D9488] text-xs font-mono font-semibold rounded-full">
            Magic Link Válido
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#1C1917]">
            Check-in Confirmado com Sucesso!
          </h1>
          <p className="text-xs text-[#57534E] leading-relaxed">
            Sua presença foi registrada no protocolo Postum. O contador do seu legado foi zerado e atualizado com segurança.
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg border border-[#E7E5E4] text-xs space-y-2 font-mono text-[#57534E]">
          <div className="flex justify-between">
            <span>Titular:</span>
            <strong className="text-[#1C1917] font-sans">{profile.full_name}</strong>
          </div>
          <div className="flex justify-between">
            <span>Frequência:</span>
            <strong className="text-[#1C1917] font-sans">{profile.frequency.replace('_days', '')} dias</strong>
          </div>
          <div className="flex justify-between">
            <span>Status Atual:</span>
            <strong className="text-[#047857] font-sans">Protocolo Ativo</strong>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-sm rounded-md transition-colors shadow-sm"
        >
          <span>Ir para o Painel Principal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
