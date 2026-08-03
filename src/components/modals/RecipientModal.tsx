'use client';

import React, { useState, useEffect } from 'react';
import { X, UserPlus, Mail, Phone, HeartHandshake } from 'lucide-react';
import { Recipient } from '@/lib/types';
import { usePostum } from '@/context/postum-context';
import { formatPhoneBR } from '@/lib/masks';

interface RecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Recipient | null;
}

export const RecipientModal: React.FC<RecipientModalProps> = ({ isOpen, onClose, initialData }) => {
  const { addRecipient, updateRecipient } = usePostum();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(formatPhoneBR(initialData.phone || ''));
      setRelationship(initialData.relationship || '');
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setRelationship('');
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe o nome do familiar.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Informe um e-mail válido para envio da carta de legado.');
      return;
    }

    if (initialData) {
      updateRecipient(initialData.id, {
        name,
        email,
        phone,
        relationship,
      });
    } else {
      addRecipient({
        name,
        email,
        phone,
        relationship,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-xs">
      <div className="bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] shadow-floating max-w-md w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 relative animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#78716C] hover:text-[#1C1917] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 border-b border-[#E7E5E4] pb-4">
          <div className="w-10 h-10 rounded-md bg-[#0D9488] text-white flex items-center justify-center">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1C1917]">
              {initialData ? 'Editar Destinatário' : 'Novo Destinatário Familiar'}
            </h3>
            <p className="text-xs text-[#57534E]">
              Pessoa confiável que receberá as instruções em caso de disparo do protocolo.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              placeholder="ex: Mariana Wilkinson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] placeholder-[#A8A29E] focus-ring"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">
              E-mail Principal (Envio da Notificação) *
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="ex: mariana@exemplo.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-9 pr-3 bg-white border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] placeholder-[#A8A29E] focus-ring"
              />
              <Mail className="w-4 h-4 text-[#78716C] absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                WhatsApp / Celular
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

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                Parentesco / Vínculo
              </label>
              <input
                type="text"
                placeholder="ex: Esposa, Filho, Advogado"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] placeholder-[#A8A29E] focus-ring"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E5E4]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#57534E] hover:text-[#1C1917] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm rounded-md transition-colors shadow-sm"
            >
              {initialData ? 'Salvar Alterações' : 'Salvar Destinatário'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
