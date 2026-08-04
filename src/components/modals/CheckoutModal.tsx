'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Copy, Loader2, Shield, QrCode } from 'lucide-react';
import { usePostum } from '@/context/postum-context';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { user, profile } = usePostum();
  
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<{ code: string; base64: string; id: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'waiting' | 'paid'>('idle');

  // Helper to format CPF
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleBuy = async () => {
    if (cpf.replace(/\D/g, '').length !== 11) {
      alert('Por favor, informe um CPF válido.');
      return;
    }

    if (!user) {
      alert('Você precisa estar logado para assinar.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          firstName: profile?.full_name?.split(' ')[0] || 'Usuário',
          cpf: cpf.replace(/\D/g, '')
        })
      });

      const data = await res.json();
      
      if (data.qr_code_base64) {
        setQrCodeData({
          code: data.qr_code,
          base64: data.qr_code_base64,
          id: data.id?.toString()
        });
        setStatus('waiting');
      } else {
        alert('Erro ao gerar PIX: ' + (data.error || 'Erro desconhecido.'));
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão ao tentar gerar o PIX.');
    } finally {
      setLoading(false);
    }
  };

  const copyPix = () => {
    if (!qrCodeData) return;
    navigator.clipboard.writeText(qrCodeData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCpf('');
        setQrCodeData(null);
        setStatus('idle');
      }, 300);
    }
  }, [isOpen]);

  // Polling logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (qrCodeData?.id && status === 'waiting') {
      interval = setInterval(async () => {
        try {
          const { supabase } = await import('@/lib/supabase/client');
          const { data, error } = await supabase
            .from('transactions')
            .select('status')
            .eq('provider_id', qrCodeData.id)
            .maybeSingle();

          if (data?.status === 'approved') {
            setStatus('paid');
            clearInterval(interval);
            import('canvas-confetti').then(confetti => confetti.default());
            
            // Force reload to update profile in context after 3s
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } catch (e) {
          console.error('Polling error:', e);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [qrCodeData, status]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAFAF9] w-full max-w-md rounded-2xl border border-[#E7E5E4] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E7E5E4] bg-white">
          <div className="flex items-center gap-2 text-[#1C1917]">
            <Shield className="w-5 h-5 text-[#0D9488]" />
            <h2 className="font-serif font-bold text-lg">Assinatura Segura</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:bg-[#F5F5F4] hover:text-[#1C1917] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'paid' ? (
            <div className="flex flex-col items-center py-6 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold text-[#1C1917]">Pagamento Confirmado!</h3>
              <p className="text-sm text-[#57534E]">
                Sua assinatura Postum Legado Pro está ativa por 1 ano. 
                Atualizando seus dados...
              </p>
            </div>
          ) : qrCodeData ? (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
              <div className="text-sm font-bold text-[#059669] mb-4 bg-[#D1FAE5] px-4 py-1.5 rounded-full border border-[#A7F3D0]">
                PIX Gerado com Sucesso!
              </div>
              
              <div className="bg-white p-3 rounded-xl border border-[#E7E5E4] mb-4 shadow-sm">
                <img
                  src={`data:image/png;base64,${qrCodeData.base64}`}
                  alt="QR Code PIX"
                  className="w-48 h-48 mix-blend-multiply"
                />
              </div>
              
              <div className="w-full relative mb-4 group">
                <input
                  readOnly
                  value={qrCodeData.code}
                  className="w-full bg-[#F5F5F4] border border-[#E7E5E4] rounded-lg py-3 px-4 pr-12 text-xs font-mono text-[#57534E] truncate outline-none focus:border-[#0D9488]"
                />
                <button
                  onClick={copyPix}
                  className="absolute right-2 top-1.5 p-1.5 hover:bg-[#E7E5E4] rounded-md transition-colors text-[#0D9488]"
                  title="Copiar código PIX"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-[#78716C] mb-4">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Aguardando pagamento...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#0F172A] text-white p-4 rounded-xl shadow-inner">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">Postum Legado Pro</span>
                  <span className="font-serif font-bold text-lg text-teal-300">R$ 1,00</span>
                </div>
                <p className="text-xs text-slate-300">Assinatura Anual (Sem renovação automática)</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#1C1917]">
                  Informe seu CPF para emissão
                </label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className="w-full bg-white border border-[#E7E5E4] rounded-lg p-3 text-center text-lg font-mono tracking-widest outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
                />
              </div>

              <button
                onClick={handleBuy}
                disabled={loading || cpf.length < 14}
                className="w-full flex items-center justify-center gap-2 bg-[#0D9488] hover:bg-[#0F766E] disabled:bg-[#A8A29E] text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <QrCode className="w-5 h-5" />
                    Gerar PIX
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-[#78716C]">
                Pagamento processado de forma segura pelo Mercado Pago.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
