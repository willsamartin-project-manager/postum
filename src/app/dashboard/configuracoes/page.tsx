'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePostum } from '@/context/postum-context';
import { CheckinFrequency, SubscriptionPlan } from '@/lib/types';
import { ProtocolSimulator } from '@/components/ui/ProtocolSimulator';
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
              profile.plan === 'starter_free'
                ? 'bg-white border-[#0F172A] ring-2 ring-[#0F172A]'
                : 'bg-white border-[#E7E5E4]'
            }`}
          >
            <div>
              <span className="text-xs font-mono uppercase text-[#78716C]">Gratuito</span>
              <h3 className="font-serif text-2xl font-bold text-[#1C1917] my-1">Plano Starter Free</h3>
              <p className="text-xs text-[#57534E] mb-4">Mapeamento essencial de até 2 instituições.</p>
            </div>
            <button
              onClick={() => handlePlanToggle('starter_free')}
              disabled={profile.plan === 'starter_free'}
              className="w-full py-2.5 bg-[#F5F5F4] hover:bg-[#EFEDEB] text-[#1C1917] border border-[#D6D3D1] text-xs font-semibold rounded-md transition-colors"
            >
              {profile.plan === 'starter_free' ? 'Plano Ativo' : 'Alterar para Starter Free'}
            </button>
          </div>

          <div
            className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
              profile.plan === 'annual_pro'
                ? 'bg-[#0F172A] text-white border-[#0D9488] ring-2 ring-[#0D9488]'
                : 'bg-[#0F172A] text-white border-[#0F172A]'
            }`}
          >
            <div>
              <span className="text-xs font-mono uppercase text-[#0D9488]">R$ 49,00 / ano</span>
              <h3 className="font-serif text-2xl font-bold text-white my-1">Postum Legado Pro</h3>
              <p className="text-xs text-slate-300 mb-4">
                Avisos e destinatários ilimitados, WhatsApp + E-mail e frequências customizáveis.
              </p>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              disabled={profile.plan === 'annual_pro'}
              className="w-full py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold rounded-md transition-colors shadow-accent-glow"
            >
              {profile.plan === 'annual_pro' ? 'Plano Pro Ativo' : 'Ativar Plano Pro (R$ 49/ano)'}
            </button>
          </div>
        </div>
      </div>

      {/* Simulator Section */}
      <ProtocolSimulator />

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}
