'use client';

import React, { useState, useEffect } from 'react';
import { X, Building2, Shield, Users, Info } from 'lucide-react';
import { Notice, NoticeCategory, Recipient } from '@/lib/types';
import { usePostum } from '@/context/postum-context';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Notice | null;
}

const CATEGORIES: NoticeCategory[] = ['Seguro', 'Banco', 'Imóvel', 'Inventário', 'Outros'];

export const NoticeModal: React.FC<NoticeModalProps> = ({ isOpen, onClose, initialData }) => {
  const { recipients, addNotice, updateNotice, profile } = usePostum();

  const [institutionName, setInstitutionName] = useState('');
  const [category, setCategory] = useState<NoticeCategory>('Banco');
  const [instructions, setInstructions] = useState('');
  const [selectedRecipientIds, setSelectedRecipientIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setInstitutionName(initialData.institution_name);
      setCategory(initialData.category);
      setInstructions(initialData.instructions || '');
      setSelectedRecipientIds(initialData.recipient_ids || []);
    } else {
      setInstitutionName('');
      setCategory('Banco');
      setInstructions('');
      setSelectedRecipientIds(recipients.length > 0 ? [recipients[0].id] : []);
    }
    setError('');
  }, [initialData, isOpen, recipients]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionName.trim()) {
      setError('Por favor, informe o nome da instituição.');
      return;
    }
    if (selectedRecipientIds.length === 0) {
      setError('Selecione pelo menos um familiar para receber este aviso.');
      return;
    }

    if (initialData) {
      updateNotice(initialData.id, {
        institution_name: institutionName,
        category,
        instructions,
        recipient_ids: selectedRecipientIds,
      });
    } else {
      addNotice({
        institution_name: institutionName,
        category,
        instructions,
        recipient_ids: selectedRecipientIds,
      });
    }

    onClose();
  };

  const toggleRecipient = (id: string) => {
    setSelectedRecipientIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-xs">
      <div className="bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] shadow-floating max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 relative animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#78716C] hover:text-[#1C1917] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 border-b border-[#E7E5E4] pb-4">
          <div className="w-10 h-10 rounded-md bg-[#0F172A] text-white flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1C1917]">
              {initialData ? 'Editar Mapeamento' : 'Mapear Nova Instituição'}
            </h3>
            <p className="text-xs text-[#57534E]">
              Indique apenas a existência da conta ou vínculo para instruir seus familiares.
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
              Nome da Instituição *
            </label>
            <input
              type="text"
              placeholder="ex: Bradesco Seguros, Itaú Unibanco, Cartório do 2º Ofício"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] placeholder-[#A8A29E] focus-ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                className="w-full h-11 px-3 bg-white border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] focus-ring"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center pt-5 text-xs text-[#78716C]">
              <Info className="w-4 h-4 mr-1 text-[#0D9488] shrink-0" />
              <span>Sem guarda de dados bancários sensíveis.</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1">
              Instruções Pós-Morte para os Destinatários
            </label>
            <textarea
              rows={3}
              placeholder="ex: Possuo apólice de seguro de vida resgatável. Contatar o corretor pelo meu CPF em caso de sinistro."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 bg-white border border-[#D6D3D1] rounded-md text-sm text-[#1C1917] placeholder-[#A8A29E] focus-ring"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-2">
              Destinatários Autorizados a Receber Este Aviso *
            </label>
            {recipients.length === 0 ? (
              <p className="text-xs text-[#D97706] bg-[#FEF3C7] p-2.5 rounded-md border border-[#FDE68A]">
                Nenhum familiar cadastrado. Cadastre primeiro um destinatário para vincular este aviso.
              </p>
            ) : (
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {recipients.map((rec) => (
                  <label
                    key={rec.id}
                    className={`flex items-center justify-between p-2.5 rounded-md border text-xs cursor-pointer transition-colors ${
                      selectedRecipientIds.includes(rec.id)
                        ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]'
                        : 'bg-white border-[#E7E5E4] text-[#57534E]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedRecipientIds.includes(rec.id)}
                        onChange={() => toggleRecipient(rec.id)}
                        className="rounded border-[#D6D3D1] text-[#0D9488] focus:ring-0"
                      />
                      <span className="font-semibold text-[#1C1917]">{rec.name}</span>
                      <span className="text-[11px] text-[#78716C]">({rec.relationship || 'Familiar'})</span>
                    </div>
                    <span className="text-[11px] text-[#78716C] font-mono">{rec.email}</span>
                  </label>
                ))}
              </div>
            )}
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
              className="px-5 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-sm rounded-md transition-colors shadow-sm"
            >
              {initialData ? 'Salvar Alterações' : 'Cadastrar Aviso'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
