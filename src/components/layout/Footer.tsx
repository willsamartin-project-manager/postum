import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5F5F4] border-t border-[#E7E5E4] pt-12 pb-8 text-[#57534E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-[#0F172A] text-white flex items-center justify-center font-serif font-bold text-sm">
                P
              </div>
              <span className="font-serif font-bold text-lg text-[#1C1917]">Postum.app</span>
            </div>
            <p className="text-xs leading-relaxed text-[#78716C]">
              Plataforma humanizada, segura e sóbria de mapeamento de legado e notificação de presença pós-morte (Dead Man's Switch).
            </p>
          </div>

          <div className="p-4 bg-[#FAFAF9] rounded-md border border-[#E7E5E4]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917] mb-1.5">
              <Lock className="w-4 h-4 text-[#0D9488]" />
              Compromisso LGPD & Zero Storage
            </div>
            <p className="text-[11px] leading-relaxed text-[#78716C]">
              O Postum <strong>NÃO</strong> armazena senhas, extratos bancários, valores, apólices digitalizadas ou documentos sensíveis. Apenas mapeamos instituições para direcionamento aos familiares.
            </p>
          </div>

          <div className="p-4 bg-[#FAFAF9] rounded-md border border-[#E7E5E4]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917] mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0F172A]" />
              Aviso Legal Importante
            </div>
            <p className="text-[11px] leading-relaxed text-[#78716C]">
              O Postum é um serviço privado de notificação programada de auxílio familiar e <strong>não substitui</strong> testamentos públicos, inventários cartorários ou escrituras legais.
            </p>
          </div>
        </div>

        <div className="border-t border-[#E7E5E4] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} Postum — Preservando instruções com dignidade e privacidade.</p>
          <div className="flex items-center gap-4">
            <Link href="/termos" className="hover:text-[#1C1917] transition-colors">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-[#1C1917] transition-colors">Política de Privacidade</Link>
            <Link href="/lgpd" className="hover:text-[#1C1917] transition-colors">LGPD</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
