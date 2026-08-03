'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePostum } from '@/context/postum-context';
import { AlertTriangle, ShieldCheck, Heart, ArrowRight, CheckCircle2, Lock, Clock } from 'lucide-react';

export default function CancelReleasePage({ params }: { params: { token: string } }) {
  const { performCheckin, profile } = usePostum();
  const [cancelled, setCancelled] = useState(false);

  const handleCancelRelease = () => {
    performCheckin('web');
    setCancelled(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-[#FAFAF9] border-2 border-[#DC2626] rounded-xl p-8 text-center shadow-floating space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bg-[#DC2626] text-white text-[11px] font-mono font-bold py-1 uppercase tracking-wider">
          🚨 NOTIFICAÇÃO URGENTE DE PRIORIDADE MÁXIMA — CARTA DE AVISO
        </div>

        {cancelled ? (
          <div className="pt-6 space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-[#047857]" />
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-2xl font-bold text-[#1C1917]">
                Protocolo Restaurado com Sucesso!
              </h1>
              <p className="text-xs text-[#57534E] leading-relaxed">
                O envio do seu legado aos familiares foi <strong>cancelado imediatamente</strong>. Sua conta permanece ativa e segura.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-sm rounded-md transition-colors shadow-sm"
            >
              <span>Voltar ao Painel do Postum</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="pt-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] flex items-center justify-center mx-auto shadow-sm animate-pulse">
              <AlertTriangle className="w-8 h-8 text-[#DC2626]" />
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-2xl font-bold text-[#1C1917]">
                Contagem Regressiva de Disparo Ativa
              </h1>
              <p className="text-xs text-[#57534E] leading-relaxed max-w-sm mx-auto">
                O prazo de verificação do seu perfil expirou e o protocolo entrou na fase final de aviso prévio. Se você estiver bem, cancele o disparo abaixo.
              </p>
            </div>

            <div className="bg-[#FEF2F2] border border-[#FECACA] p-4 rounded-lg text-center space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#B91C1C] font-semibold">
                Tempo Restante para Disparo do Legado aos Familiares
              </span>
              <p className="font-mono text-3xl font-bold text-[#DC2626] tracking-wider">
                71:59:42
              </p>
              <p className="text-[11px] text-[#78716C]">
                Após este tempo, suas instruções mapeadas serão enviadas por e-mail aos destinatários.
              </p>
            </div>

            <button
              onClick={handleCancelRelease}
              className="w-full py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-base rounded-md transition-all shadow-accent-glow flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white/20" />
              <span>Estou bem! Manter conta ativa</span>
            </button>

            <p className="text-[11px] text-[#78716C]">
              Ao clicar no botão acima, a contagem é interrompida e o envio é suspenso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
