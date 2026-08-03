'use client';

import React, { useState } from 'react';
import { usePostum } from '@/context/postum-context';
import { RecipientModal } from '@/components/modals/RecipientModal';
import { Recipient } from '@/lib/types';
import { Users, Plus, Mail, Phone, HeartHandshake, Edit3, Trash2, Building2, ShieldCheck } from 'lucide-react';

export default function FamiliaresPage() {
  const { recipients, notices, deleteRecipient } = usePostum();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipient, setEditingRecipient] = useState<Recipient | null>(null);

  const handleOpenNew = () => {
    setEditingRecipient(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rec: Recipient) => {
    setEditingRecipient(rec);
    setIsModalOpen(true);
  };

  // Get assigned notices count per recipient
  const getAssignedNotices = (recId: string) => {
    return notices.filter((n) => n.recipient_ids.includes(recId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8 space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Destinatários Familiares</h1>
          <p className="text-sm text-[#57534E] mt-1">
            Cadastre as pessoas de sua total confiança que receberão os avisos em caso de disparo do protocolo.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm rounded-md transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Novo Destinatário
        </button>
      </div>

      {/* Recipients List */}
      {recipients.length === 0 ? (
        <div className="text-center py-16 bg-[#FAFAF9] rounded-xl border border-dashed border-[#D6D3D1] space-y-3">
          <Users className="w-12 h-12 text-[#A8A29E] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#1C1917]">Nenhum destinatário cadastrado</h3>
          <p className="text-xs text-[#78716C] max-w-sm mx-auto">
            Cadastre pelo menos um familiar para associar às instruções das suas instituições.
          </p>
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0D9488] text-white text-xs font-semibold rounded-md shadow-sm"
          >
            <Plus className="w-4 h-4" /> Cadastrar Primeiro Familiar
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipients.map((rec) => {
            const assignedNotices = getAssignedNotices(rec.id);
            return (
              <div
                key={rec.id}
                className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg p-6 flex flex-col justify-between shadow-subtle hover:border-[#D6D3D1] transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-bold text-lg flex items-center justify-center border border-[#0D9488]/20">
                        {rec.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#1C1917]">{rec.name}</h3>
                        <span className="text-xs text-[#78716C]">{rec.relationship || 'Familiar Destinatário'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(rec)}
                        className="p-1.5 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4] rounded transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRecipient(rec.id)}
                        className="p-1.5 text-[#78716C] hover:text-[#DC2626] hover:bg-red-50 rounded transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#57534E] mb-4 bg-white p-3.5 rounded border border-[#E7E5E4]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#0D9488]" />
                      <span className="font-mono text-[11px] text-[#1C1917]">{rec.email}</span>
                    </div>
                    {rec.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#78716C]" />
                        <span>{rec.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#E7E5E4] pt-3">
                  <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-wider mb-2">
                    Avisos Vinculados ({assignedNotices.length})
                  </p>
                  {assignedNotices.length === 0 ? (
                    <p className="text-xs text-[#A8A29E] italic">Nenhum aviso atribuído ainda.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {assignedNotices.map((an) => (
                        <span
                          key={an.id}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EFEDEB] text-[#1C1917] text-[11px] rounded border border-[#D6D3D1]"
                        >
                          <Building2 className="w-3 h-3 text-[#0D9488]" />
                          {an.institution_name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <RecipientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingRecipient}
      />
    </div>
  );
}
