import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2, ArrowLeft, FileCheck, Scale, Mail, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Conformidade LGPD — Postum',
  description: 'Conheça o compromisso do Postum com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).',
};

export default function LgpdPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white border border-[#E7E5E4] rounded-xl p-6 sm:p-10 shadow-sm mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEDEB] text-xs font-semibold text-[#57534E] mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            Lei Geral de Proteção de Dados (Lei 13.709/2018)
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight mb-4">
            Portal de Transparência LGPD
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            O <strong>Postum</strong> adota a cultura de <em>Privacy by Design</em> (privacidade desde a concepção). Veja como garantimos os direitos previstos na legislação brasileira de proteção de dados.
          </p>
          <div className="mt-6 pt-4 border-t border-[#E7E5E4] flex items-center justify-between text-xs text-[#78716C]">
            <span>Última atualização: Agosto de 2026</span>
            <span>Versão 1.2</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white border border-[#E7E5E4] rounded-xl p-6 sm:p-10 shadow-sm space-y-8 text-[#44403C] text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">1</span>
              Seus Direitos como Titular (Art. 18 da LGPD)
            </h2>
            <p>
              Em conformidade com o artigo 18 da LGPD, o Titular dos dados possui os seguintes direitos garantidos na plataforma Postum:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="p-3 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1C1917] text-xs">Confirmação e Acesso</h3>
                  <p className="text-[11px] text-[#78716C]">Saber se tratamos seus dados e visualizar todas as suas informações em tempo real no painel.</p>
                </div>
              </div>
              <div className="p-3 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1C1917] text-xs">Correção de Dados</h3>
                  <p className="text-[11px] text-[#78716C]">Corrigir imediatamente dados incompletos, inexatos ou desatualizados com 1 clique.</p>
                </div>
              </div>
              <div className="p-3 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1C1917] text-xs">Eliminação dos Dados</h3>
                  <p className="text-[11px] text-[#78716C]">Solicitar ou executar a exclusão permanente de todo o seu histórico e cadastros no sistema.</p>
                </div>
              </div>
              <div className="p-3 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1C1917] text-xs">Revogação do Consentimento</h3>
                  <p className="text-[11px] text-[#78716C]">Desativar as notificações programadas ou encerrar sua conta a qualquer instante sem burocracia.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">2</span>
              Bases Legais para Tratamento (Art. 7º)
            </h2>
            <p>
              O tratamento de dados pessoais no Postum fundamenta-se estritamente nas seguintes hipóteses legais da LGPD:
            </p>
            <ul className="space-y-2 list-disc list-inside pl-2 text-[#57534E]">
              <li><strong>Execução de Contrato (Art. 7º, V):</strong> Necessário para a prestação dos serviços contratados de notificação de presença e transmissão de legado.</li>
              <li><strong>Consentimento do Titular (Art. 7º, I):</strong> Fornecido expressamente ao criar sua conta e configurar seus destinatários e instruções.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">3</span>
              Medidas de Segurança Técnicas e Administrativas
            </h2>
            <p>
              Adotamos medidas de segurança exigidas pelo Art. 46 da LGPD para proteger seus dados contra acessos não autorizados e situações acidentais ou ilícitas:
            </p>
            <div className="p-4 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#1C1917] font-semibold">
                <Lock className="w-4 h-4 text-[#0D9488]" />
                Arquitetura Defensiva
              </div>
              <p className="text-[#57534E]">
                Utilizamos infraestrutura em nuvem segura com encriptação em repouso e em trânsito, controle de acesso estrito via políticas RLS (Row Level Security) e ausência intencional de guarda de ativos financeiros ou senhas.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">4</span>
              Canal de Atendimento ao Titular e Encarregado (DPO)
            </h2>
            <p>
              Caso deseje exercer qualquer um dos seus direitos previstos na LGPD ou esclarecer dúvidas referentes ao tratamento de seus dados, você pode entrar em contato diretamente com o nosso Encarregado pelo Tratamento de Dados Pessoais.
            </p>
          </section>

          {/* Contact Box */}
          <div className="p-6 bg-[#F5F5F4] rounded-lg border border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#0D9488] shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[#1C1917] text-base mb-1">Encarregado pelo Tratamento de Dados (DPO)</h3>
                <p className="text-xs text-[#78716C]">E-mail para solicitações LGPD: <strong>dpo@postum.app</strong></p>
              </div>
            </div>
            <a
              href="mailto:dpo@postum.app"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-md transition-colors shrink-0"
            >
              Enviar Solicitação LGPD
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
