'use client';

import React, { useState } from 'react';
import { usePostum } from '@/context/postum-context';
import { NoticeModal } from '@/components/modals/NoticeModal';
import { Notice, NoticeCategory } from '@/lib/types';
import { Building2, Plus, Search, Edit3, Trash2, Shield, Users, Info, FileText } from 'lucide-react';

export default function AvisosPage() {
  const { notices, recipients, deleteNotice } = usePostum();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  const handleOpenNew = () => {
    setEditingNotice(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setIsModalOpen(true);
  };

  const filteredNotices = notices.filter((n) => {
    const matchesSearch = n.institution_name.toLowerCase().includes(search.toLowerCase()) ||
      (n.instructions && n.instructions.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getRecipientNames = (rIds: string[]) => {
    return recipients
      .filter((r) => rIds.includes(r.id))
      .map((r) => r.name);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8 space-y-6 sm:space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">Gerenciador de Avisos & Instituições</h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Mapeie suas contas, apólices e imóveis para orientar seus familiares em caso de imprevistos.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs sm:text-sm rounded-md transition-colors shadow-sm shrink-0 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Mapear Nova Instituição
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAFAF9] p-3 sm:p-4 rounded-lg border border-[#E7E5E4]">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Buscar por instituição ou instrução..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-9 pr-3 bg-white border border-[#D6D3D1] rounded-md text-xs text-[#1C1917] placeholder-[#A8A29E] focus-ring"
          />
          <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-3.5" />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['all', 'Banco', 'Seguro', 'Imóvel', 'Inventário', 'Outros'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded text-xs font-semibold whitespace-nowrap min-h-[36px] transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#F5F5F4]'
              }`}
            >
              {cat === 'all' ? 'Todas Categorias' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-[#FAFAF9] rounded-xl border border-dashed border-[#D6D3D1] space-y-3 p-4">
          <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#A8A29E] mx-auto" />
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">Nenhum aviso encontrado</h3>
          <p className="text-xs text-[#78716C] max-w-sm mx-auto">
            {search || selectedCategory !== 'all'
              ? 'Tente ajustar seus filtros de busca.'
              : 'Clique no botão acima para mapear sua primeira instituição financeira ou apólice.'}
          </p>
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] bg-[#0D9488] text-white text-xs font-semibold rounded-md shadow-sm"
          >
            <Plus className="w-4 h-4" /> Mapear Agora
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredNotices.map((notice) => {
            const recNames = getRecipientNames(notice.recipient_ids);
            return (
              <div
                key={notice.id}
                className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg p-4 sm:p-6 flex flex-col justify-between shadow-subtle hover:border-[#D6D3D1] transition-all space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0 flex-1">
                      <span className="inline-block px-2.5 py-0.5 bg-[#EFEDEB] text-[#57534E] font-mono text-[10px] font-semibold uppercase rounded mb-1">
                        {notice.category}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] truncate">
                        {notice.institution_name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEdit(notice)}
                        className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4] rounded transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNotice(notice.id)}
                        className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-[#78716C] hover:text-[#DC2626] hover:bg-red-50 rounded transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed bg-white p-3 rounded border border-[#E7E5E4] break-words">
                    {notice.instructions || 'Sem instruções detalhadas especificadas.'}
                  </p>
                </div>

                <div className="border-t border-[#E7E5E4] pt-3 flex flex-wrap items-center justify-between text-xs text-[#78716C] gap-2">
                  <div className="flex items-start sm:items-center gap-1.5 min-w-0">
                    <Users className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-0.5 sm:mt-0" />
                    <span className="truncate">
                      Encaminhar para:{' '}
                      <strong className="text-[#1C1917]">
                        {recNames.length > 0 ? recNames.join(', ') : 'Nenhum destinatário'}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <NoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingNotice}
      />
    </div>
  );
}
