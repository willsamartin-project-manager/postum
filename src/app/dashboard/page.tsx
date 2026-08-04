'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePostum } from '@/context/postum-context';
import { CheckinButton } from '@/components/ui/CheckinButton';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { NoticeModal } from '@/components/modals/NoticeModal';
import { RecipientModal } from '@/components/modals/RecipientModal';
import { Calendar, Shield, Building2, Users, ArrowRight, Plus, Clock, History, AlertTriangle, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const { profile, notices, recipients, logs } = usePostum();

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Math calculation for days remaining
  const nextCheckinDate = new Date(profile.next_checkin_at);
  const now = new Date();
  const diffTime = nextCheckinDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const formatDateTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const dateStr = d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const timeStr = d.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return `${dateStr} às ${timeStr}`;
    } catch {
      return isoString;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8 space-y-6 sm:space-y-8">
      {/* Top Banner & Status Bar */}
      <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-subtle">
        <div className="space-y-2 w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1917] tracking-tight">
              Olá, {profile.full_name.split(' ')[0]}
            </h1>
            <StatusBadge status={profile.status} size="sm" />
          </div>
          <p className="text-xs sm:text-sm text-[#57534E]">
            Seu protocolo de legado está ativado com verificação a cada{' '}
            <strong className="text-[#1C1917]">{profile.frequency.replace('_days', '')} dias</strong>.
          </p>
        </div>

        <div className="w-full md:w-auto flex items-center gap-3 bg-[#F5F5F4] p-3 rounded-lg border border-[#E7E5E4] text-xs text-[#57534E]">
          <Calendar className="w-5 h-5 text-[#0D9488] shrink-0" />
          <div>
            <p className="text-[#78716C]">Próxima confirmação até:</p>
            <p className="font-semibold text-[#1C1917] text-xs sm:text-sm">{formatDate(profile.next_checkin_at)}</p>
          </div>
        </div>
      </div>

      {/* Main Heartbeat Hero Box */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white rounded-xl p-5 sm:p-8 md:p-12 text-center shadow-floating relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-5 sm:space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] sm:text-xs font-mono text-teal-200">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate max-w-[260px] sm:max-w-none">
              {daysRemaining > 0
                ? `${daysRemaining} dias restantes para confirmação`
                : '⚠️ Check-in pendente — Em carência'}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Confirmar Presença (Heartbeat)
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            Ao clicar no botão abaixo, a contagem do protocolo é zerada e seu status é mantido ativo com segurança.
          </p>

          <div className="pt-2 w-full">
            <CheckinButton />
          </div>

          <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono pt-1">
            Último check-in realizado em: {formatDateTime(profile.last_checkin_at)} via Web
          </p>
        </div>
      </div>

      {/* Quick Stats & Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Avisos */}
        <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-[#F5F5F4] border border-[#E7E5E4] flex items-center justify-center text-[#0F172A] shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">Instituições Mapeadas</h3>
                <p className="text-[11px] sm:text-xs text-[#78716C]">{notices.length} avisos cadastrados</p>
              </div>
            </div>
            <button
              onClick={() => setIsNoticeModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 min-h-[38px] bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-md transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" /> Mapear
            </button>
          </div>

          <div className="space-y-2">
            {notices.slice(0, 3).map((notice) => (
              <div
                key={notice.id}
                className="p-3 bg-white rounded-md border border-[#E7E5E4] flex items-center justify-between text-xs gap-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#1C1917] truncate">{notice.institution_name}</p>
                  <p className="text-[#78716C] text-[11px]">{notice.category}</p>
                </div>
                <span className="text-[10px] bg-[#F5F5F4] text-[#57534E] px-2 py-0.5 rounded border border-[#E7E5E4] shrink-0">
                  {notice.recipient_ids.length} destinatário(s)
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/avisos"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D9488] hover:underline pt-1"
          >
            Gerenciar todas as instituições <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card Destinatários */}
        <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-[#F5F5F4] border border-[#E7E5E4] flex items-center justify-center text-[#0D9488] shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">Destinatários</h3>
                <p className="text-[11px] sm:text-xs text-[#78716C]">{recipients.length} familiares cadastrados</p>
              </div>
            </div>
            <button
              onClick={() => setIsRecipientModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 min-h-[38px] bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold rounded-md transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" /> Cadastrar
            </button>
          </div>

          <div className="space-y-2">
            {recipients.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                className="p-3 bg-white rounded-md border border-[#E7E5E4] flex items-center justify-between text-xs gap-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#1C1917] truncate">{rec.name}</p>
                  <p className="text-[#78716C] text-[11px] truncate">{rec.relationship || 'Familiar'}</p>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#57534E] truncate max-w-[120px] sm:max-w-none">{rec.email}</span>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/familiares"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D9488] hover:underline pt-1"
          >
            Gerenciar familiares destinatários <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* History Log */}
      <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-4 h-4 text-[#78716C]" />
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#1C1917]">Histórico Recente de Check-ins</h3>
        </div>
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-2.5 bg-white rounded border border-[#E7E5E4] flex items-center justify-between text-xs text-[#57534E] gap-2"
            >
              <span className="flex items-center gap-2 truncate">
                <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Check-in confirmado via <strong>{log.channel.toUpperCase()}</strong></span>
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#78716C] shrink-0">{formatDateTime(log.checked_at)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <NoticeModal isOpen={isNoticeModalOpen} onClose={() => setIsNoticeModalOpen(false)} />
      <RecipientModal isOpen={isRecipientModalOpen} onClose={() => setIsRecipientModalOpen(false)} />
    </div>
  );
}
