'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePostum } from '@/context/postum-context';
import { CheckinFrequency, SubscriptionPlan } from '@/lib/types';
import { CheckoutModal } from '@/components/modals/CheckoutModal';
import { Settings, Shield, Clock, CreditCard, Bell, Sparkles, Check, AlertCircle, User } from 'lucide-react';

export default function ConfiguracoesPage() {
  const { profile, updateFrequency, updatePlan } = usePostum();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleFrequencyChange = (freq: CheckinFrequency) => {
    updateFrequency(freq);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePlanToggle = (plan: SubscriptionPlan) => {
    updatePlan(plan);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8 space-y-8">
      {/* Header section */}
      <div className="border-b border-[#E7E5E4] pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Configurações do Protocolo & Assinatura</h1>
          <p className="text-sm text-[#57534E] mt-1">
            Ajuste a frequência dos check-ins, canais de notificação e plano de proteção do Postum.
          </p>
        </div>
        <Link
          href="/dashboard/perfil"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-md transition-colors shadow-sm shrink-0"
        >
          <User className="w-4 h-4" />
          <span>Editar Meu Perfil</span>
        </Link>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-xs font-semibold rounded-md flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Configurações atualizadas com sucesso!</span>
        </div>
      )}

      {/* Section 1: Checkin Frequency Settings */}
      <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-6 space-y-6 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#0F172A] text-white flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-[#1C1917]">Frequência de Verificação (Heartbeat)</h2>
            <p className="text-xs text-[#57534E]">
              Escolha o intervalo de tempo no qual você deseja receber os lembretes de confirmação de presença.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: '30_days', label: '30 Dias', desc: 'Verificação mensal (Recomendado para máxima atualização)' },
            { id: '60_days', label: '60 Dias', desc: 'Bimestral (Padrão equilibrado)' },
            { id: '90_days', label: '90 Dias', desc: 'Trimestral' },
            { id: '180_days', label: '180 Dias', desc: 'Semestral (Exclusivo Pro Anual)' },
          ].map((item) => {
            const isSelected = profile.frequency === item.id;
            const isDisabled = item.id === '180_days' && profile.plan === 'starter_free';

            return (
              <button
                key={item.id}
                disabled={isDisabled}
                onClick={() => handleFrequencyChange(item.id as CheckinFrequency)}
                className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-[#ECFDF5] border-[#A7F3D0] ring-2 ring-[#0D9488]'
                    : isDisabled
                    ? 'bg-[#F5F5F4] border-[#E7E5E4] opacity-50 cursor-not-allowed'
                    : 'bg-white border-[#E7E5E4] hover:bg-[#FAFAF9]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-lg text-[#1C1917]">{item.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#0D9488]" />}
                  </div>
                  <p className="text-xs text-[#57534E]">{item.desc}</p>
                </div>
                {isDisabled && (
                  <span className="text-[10px] font-mono text-[#D97706] mt-3">Requer Plano Pro</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Grace Period & Safety Net */}
      <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#D97706]/10 text-[#D97706] flex items-center justify-center border border-[#D97706]/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-[#1C1917]">Parâmetros de Carência & Tolerância</h2>
            <p className="text-xs text-[#57534E]">
              Prazos de segurança estabelecidos para evitar falsos alarmes em caso de viagens ou indisponibilidade.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#57534E]">
          <div className="p-4 bg-white rounded-lg border border-[#E7E5E4]">
            <p className="font-semibold text-[#1C1917] mb-1">Período de Carência Padrão</p>
            <p className="text-[#78716C] mb-2">
              Caso você não confirme no dia exato, o protocolo entra na fase de carência durante <strong>14 dias</strong>.
            </p>
            <span className="inline-block px-2.5 py-1 bg-[#FEF3C7] text-[#B45309] rounded font-mono text-[11px] font-semibold">
              Status: 14 Dias de Janela de Alerta
            </span>
          </div>

          <div className="p-4 bg-white rounded-lg border border-[#E7E5E4]">
            <p className="font-semibold text-[#1C1917] mb-1">Carta de Aviso Urgente (Pre-Disparo)</p>
            <p className="text-[#78716C] mb-2">
              Notificação de prioridade máxima por e-mail e WhatsApp com contagem regressiva explícita de <strong>72 horas</strong>.
            </p>
            <span className="inline-block px-2.5 py-1 bg-red-50 text-red-700 rounded font-mono text-[11px] font-semibold">
              Disparo com Magic Link 1-click cancel
            </span>
          </div>
        </div>
      </div>

      {/* Section 3: Subscription & Billing */}
      <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#0D9488] text-white flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-[#1C1917]">Plano de Assinatura Atual</h2>
              <p className="text-xs text-[#57534E]">
                Plano ativo no momento: <strong className="text-[#1C1917]">{profile.plan === 'annual_pro' ? 'Postum Legado Pro (Anual)' : 'Starter Free (Gratuito)'}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Plan Starter Free */}
          <div
            className={`p-6 sm:p-8 rounded-xl border flex flex-col justify-between transition-all ${
              profile.plan === 'starter_free'
                ? 'bg-white border-[#0F172A] ring-2 ring-[#0F172A]'
                : 'bg-[#FAFAF9] border-[#E7E5E4]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1917]">Plano Starter</h3>
                <span className="px-3 py-1 bg-[#F5F5F4] text-[#57534E] text-xs font-semibold rounded-sm border border-[#E7E5E4]">
                  Gratuito
                </span>
              </div>
              <p className="text-xs text-[#78716C] mb-6">
                Ideal para testar e manter o mapeamento essencial de até 2 instituições.
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">R$ 0</span>
                <span className="text-xs text-[#78716C]">/ para sempre</span>
              </div>

              <ul className="space-y-3 text-xs text-[#57534E] mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Até <strong>2 avisos de instituições</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Até <strong>2 destinatários familiares</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Check-in exclusivo por E-mail (30 dias fixo)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Zero armazenamento de senhas</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handlePlanToggle('starter_free')}
              disabled={profile.plan === 'starter_free'}
              className="w-full py-3.5 bg-[#F5F5F4] hover:bg-[#EFEDEB] text-[#1C1917] border border-[#D6D3D1] font-semibold text-sm rounded-md text-center transition-colors min-h-[44px] flex items-center justify-center"
            >
              {profile.plan === 'starter_free' ? 'Plano Ativo' : 'Alterar para Starter Free'}
            </button>
          </div>

          {/* Plan Pro Anual */}
          <div
            className={`p-6 sm:p-8 rounded-xl flex flex-col justify-between transition-all relative overflow-hidden ${
              profile.plan === 'annual_pro'
                ? 'bg-[#0F172A] text-white border-2 border-[#0D9488] shadow-floating'
                : 'bg-[#0F172A] text-white border border-[#0F172A]'
            }`}
          >
            <div className="absolute top-0 right-0 bg-[#0D9488] text-white text-[10px] uppercase font-bold font-mono px-3 py-1 rounded-bl">
              Recomendado
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pt-2 sm:pt-0">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">Postum Legado Pro</h3>
                <span className="px-3 py-1 bg-[#0D9488]/20 text-[#A7F3D0] text-[10px] sm:text-xs font-semibold rounded-sm border border-[#0D9488]/40 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Economize 38%
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-5">
                Proteção completa sem limites, flexibilidade total para o seu legado (Acompanhamento por WhatsApp em breve).
              </p>
              
              <div className="mb-1">
                <span className="text-sm text-slate-400 line-through decoration-slate-500">De R$ 79,00</span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white">R$ 1</span>
                <span className="text-xs text-slate-400">,00 / ano (Teste)</span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-400 font-medium mb-8 bg-emerald-400/10 inline-block px-2.5 py-1.5 rounded border border-emerald-400/20">
                Apenas R$ 4,08 por mês — Menos que um café.
              </p>

              <ul className="space-y-3 text-xs text-slate-200 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span><strong>Avisos e instituições ilimitadas</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span><strong>Destinatários familiares ilimitados</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Check-in exclusivo por E-mail (WhatsApp em breve)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Frequência personalizável (30, 60, 90 ou 180 dias)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Envio da Carta de Aviso com prioridade máxima</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              disabled={profile.plan === 'annual_pro'}
              className="w-full py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm rounded-md text-center transition-colors shadow-accent-glow min-h-[44px] flex items-center justify-center"
            >
              {profile.plan === 'annual_pro' ? 'Plano Pro Ativo' : 'Ativar Plano Pro (R$ 1/ano)'}
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}
