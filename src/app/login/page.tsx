'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePostum } from '@/context/postum-context';
import { formatPhoneBR } from '@/lib/masks';
import { Lock, Mail, Key, User, Phone, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail, signUpWithEmail, user } = usePostum();

  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // If already logged in, offer quick redirect to dashboard
  if (user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-8 text-center shadow-floating space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-[#1C1917]">Você já está autenticado</h1>
            <p className="text-xs text-[#57534E]">Conectado como <strong className="text-[#1C1917]">{user.email}</strong></p>
          </div>
          <Link
            href="/dashboard"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-sm rounded-md transition-colors shadow-sm"
          >
            <span>Ir para o Painel</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor, informe e-mail e senha.');
      return;
    }

    if (mode === 'signup' && !fullName.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const res = await signUpWithEmail(email, password, fullName, phone);
        if (res.error) {
          setError(res.error);
        } else {
          setMessage('Conta criada com sucesso! Redirecionando...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        }
      } else {
        const res = await loginWithEmail(email, password);
        if (res.error) {
          setError(res.error);
        } else {
          setMessage('Login efetuado com sucesso!');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erro durante a autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-8 shadow-floating space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-md bg-[#0F172A] text-white font-serif text-xl font-bold flex items-center justify-center mx-auto mb-3 shadow-sm">
            P
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1C1917]">
            {mode === 'signup' ? 'Criar sua Conta no Postum' : 'Acessar seu Protocolo'}
          </h1>
          <p className="text-xs text-[#57534E]">
            {mode === 'signup'
              ? 'Mapeie suas instituições e garanta o envio de instruções aos seus familiares.'
              : 'Entre com seu e-mail e senha cadastrados.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#EFEDEB] p-1 rounded-md text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); setMessage(''); }}
            className={`flex-1 py-2 text-center rounded transition-all ${
              mode === 'signup' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Criar Conta
          </button>
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); setMessage(''); }}
            className={`flex-1 py-2 text-center rounded transition-all ${
              mode === 'login' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Já tenho conta (Entrar)
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-xs rounded-md flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Nome Completo *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Guilherme Wilkinson"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 bg-white border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] placeholder-[#A8A29E] focus-ring"
                  />
                  <User className="w-4 h-4 text-[#78716C] absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  WhatsApp / Telefone
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="(11) 99876-5432"
                    value={phone}
                    onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
                    className="w-full h-11 pl-9 pr-3 bg-white border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] placeholder-[#A8A29E] focus-ring font-mono"
                  />
                  <Phone className="w-4 h-4 text-[#78716C] absolute left-3 top-3.5" />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">
              E-mail *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-9 pr-3 bg-white border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] placeholder-[#A8A29E] focus-ring"
              />
              <Mail className="w-4 h-4 text-[#78716C] absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">
              Senha *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-9 pr-3 bg-white border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] placeholder-[#A8A29E] focus-ring"
              />
              <Key className="w-4 h-4 text-[#78716C] absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-sm rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Processando...</span>
            ) : mode === 'signup' ? (
              <>
                <span>Cadastrar e Acessar Painel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Entrar no Postum</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#E7E5E4] text-center text-[11px] text-[#78716C] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>Zero armazenamento de senhas de bancos ou documentos sensíveis.</span>
        </div>
      </div>
    </div>
  );
}
