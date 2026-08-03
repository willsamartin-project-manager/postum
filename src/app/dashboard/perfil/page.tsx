'use client';

import React, { useState, useEffect } from 'react';
import { usePostum } from '@/context/postum-context';
import { formatPhoneBR } from '@/lib/masks';
import { User, Phone, Mail, Shield, Check, AlertCircle, Save, KeyRound, Trash2, Calendar, Clock, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function PerfilPage() {
  const { profile, user, updateProfileData } = usePostum();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordResetSent, setPasswordResetSent] = useState(false);

  // Sync profile data when loaded
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(formatPhoneBR(profile.phone || ''));
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await updateProfileData({
        full_name: fullName,
        phone: phone || null,
      });

      if (res?.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage('Dados do perfil atualizados com sucesso!');
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Falha ao salvar as alterações.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneBR(e.target.value);
    setPhone(formatted);
  };

  const handlePasswordReset = () => {
    setPasswordResetSent(true);
    setTimeout(() => setPasswordResetSent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8 space-y-8">
      {/* Header section */}
      <div className="border-b border-[#E7E5E4] pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Meu Perfil & Dados Cadastrais</h1>
          <p className="text-sm text-[#57534E] mt-1">
            Gerencie suas informações pessoais, canal de notificação por WhatsApp e segurança da conta.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFEDEB] text-[#57534E] rounded-full text-xs font-mono font-medium border border-[#D6D3D1]">
            <Shield className="w-3.5 h-3.5 text-[#0D9488]" />
            Dados Protegidos por RLS
          </span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Edit Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#E7E5E4] rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E7E5E4]">
              <div className="w-10 h-10 rounded-md bg-[#0F172A] text-white flex items-center justify-center font-serif text-lg font-bold">
                {fullName.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl text-[#1C1917]">Editar Informações do Titular</h2>
                <p className="text-xs text-[#78716C]">Esses dados serão utilizados para identificação no envio aos familiares.</p>
              </div>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-xs font-semibold rounded-md flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-md flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full h-11 pl-10 pr-4 bg-[#FAFAF9] border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-all"
                  />
                </div>
              </div>

              {/* Email (Read only authentication email) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                  E-mail Cadastrado (Login & Magic Link)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    disabled
                    value={user?.email || profile.id + '@postum.app'}
                    className="w-full h-11 pl-10 pr-4 bg-[#EFEDEB] border border-[#E7E5E4] rounded-md text-sm text-[#78716C] cursor-not-allowed font-mono"
                  />
                </div>
                <p className="text-[11px] text-[#78716C]">
                  O e-mail principal é vinculado à sua autenticação de acesso e aos links mágicos de confirmação.
                </p>
              </div>

              {/* Phone / WhatsApp */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                  WhatsApp / Celular de Notificação
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="(11) 99876-5432"
                    className="w-full h-11 pl-10 pr-4 bg-[#FAFAF9] border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#78716C]">
                  Canal alternativo para envio de lembretes urgentes e avisos prioritários de Check-in.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-semibold rounded-md transition-colors shadow-sm focus-ring disabled:opacity-50 min-h-[44px]"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? 'Salvando...' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Security & Password Section */}
          <div className="bg-white border border-[#E7E5E4] rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#EFEDEB] text-[#1C1917] flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl text-[#1C1917]">Segurança & Acesso</h2>
                <p className="text-xs text-[#78716C]">Redefinição de senha e preferências de acesso à plataforma.</p>
              </div>
            </div>

            {passwordResetSent ? (
              <div className="p-4 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-xs font-semibold rounded-md flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 shrink-0" />
                <span>Instruções para redefinição de senha foram simuladas/enviadas ao seu e-mail!</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4]">
                <div>
                  <p className="text-xs font-semibold text-[#1C1917]">Redefinir Senha de Acesso</p>
                  <p className="text-[11px] text-[#78716C]">Receba um link de alteração de senha no e-mail cadastrado.</p>
                </div>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="px-4 py-2 bg-white hover:bg-[#F5F5F4] text-[#1C1917] border border-[#D6D3D1] text-xs font-semibold rounded-md transition-colors shrink-0"
                >
                  Enviar E-mail de Redefinição
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Account Status & Summary Card */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-[#0F172A] text-white rounded-xl p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#0D9488] uppercase tracking-wider">Conta Protegida</span>
                <h3 className="font-serif font-bold text-lg text-white">{profile.full_name || 'Usuário Postum'}</h3>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/40 text-[#0D9488] flex items-center justify-center font-bold font-serif">
                P
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#0D9488]" /> Plano Ativo:
                </span>
                <span className="font-semibold text-white">
                  {profile.plan === 'annual_pro' ? 'Legado Pro (Anual)' : 'Starter Free'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0D9488]" /> Frequência de Check-in:
                </span>
                <span className="font-semibold text-white font-mono">
                  {profile.frequency.replace('_days', ' dias')}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0D9488]" /> Próxima Verificação:
                </span>
                <span className="font-semibold text-white font-mono">
                  {new Date(profile.next_checkin_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard/configuracoes"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md transition-colors border border-white/10"
              >
                Ajustar Frequência & Plano
              </Link>
            </div>
          </div>

          {/* Privacy & LGPD Rights Box */}
          <div className="bg-white border border-[#E7E5E4] rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-[#1C1917] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#0D9488]" />
              Seus Direitos (LGPD)
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Você possui total soberania sobre seus dados. A qualquer momento você pode solicitar a exportação ou exclusão definitiva de todo o histórico.
            </p>
            <div className="pt-2 border-t border-[#E7E5E4]">
              <Link
                href="/lgpd"
                className="text-xs text-[#0D9488] hover:underline font-semibold flex items-center gap-1"
              >
                Ver declaração de conformidade LGPD &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
