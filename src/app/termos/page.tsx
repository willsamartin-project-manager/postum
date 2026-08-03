import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, AlertTriangle, CheckCircle2, ArrowLeft, Lock, Scale } from 'lucide-react';

export const metadata = {
  title: 'Termos de Uso — Postum',
  description: 'Termos e condições de uso da plataforma Postum de mapeamento de legado e notificação pós-morte.',
};

export default function TermosPage() {
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
            <Scale className="w-3.5 h-3.5 text-[#0D9488]" />
            Documento Legal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight mb-4">
            Termos de Uso
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Estes Termos de Uso regulam o acesso e a utilização dos serviços prestados pela plataforma <strong>Postum</strong> (postum.app). Ao cadastrar-se ou utilizar nossa plataforma, você concorda integralmente com as condições dispostas neste documento.
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
              Natureza do Serviço & Limitações Legais
            </h2>
            <p>
              O <strong>Postum</strong> é um serviço tecnológico privado de envio de notificações programadas e gerenciamento de instruções para auxílio familiar (frequentemente denominado <em>Dead Man's Switch</em> ou Notificador de Presença).
            </p>
            <div className="p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg text-[#92400E] flex items-start gap-3 my-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong>Aviso Importante:</strong> O Postum <strong>NÃO</strong> é um testamento público, codicilo legal, inventário nem escritura pública. O serviço não substitui o acompanhamento jurídico nem os trâmites cartorários legalmente exigidos pela legislação brasileira para a sucessão patrimonial.
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">2</span>
              Princípio "Zero Storage" de Dados Sensíveis
            </h2>
            <p>
              Para a máxima segurança e privacidade do Titular, o Postum opera estritamente sob a política de <strong>Zero Armazenamento de Dados Críticos</strong>.
            </p>
            <ul className="space-y-2 list-disc list-inside pl-2 text-[#57534E]">
              <li><strong>Não armazenamos senhas</strong> de bancos, corretoras, cofres ou redes sociais.</li>
              <li><strong>Não armazenamos cópias de documentos</strong> ou apólices digitalizadas.</li>
              <li><strong>Não solicitamos nem guardamos saldos</strong>, extratos ou valores patrimoniais.</li>
            </ul>
            <p className="text-xs text-[#78716C]">
              O serviço limita-se a mapear a existência das instituições (ex: "Possuo apólice na Seguradora X") e instruções direcionais simples para orientar os destinatários familiares cadastrados.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">3</span>
              O Protocolo de Check-in e Disparo de Alertas
            </h2>
            <p>
              A manutenção da conta ativa exige que o usuário realize confirmações periódicas de presença (Check-in) conforme a frequência configurada (ex: a cada 30, 60 ou 90 dias).
            </p>
            <div className="space-y-2 bg-[#FAFAF9] p-4 rounded-lg border border-[#E7E5E4]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <span><strong>Check-in Simples:</strong> O envio do Check-in é realizado via Magic Link (e-mail ou WhatsApp) sem necessidade de login complexo.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <span><strong>Período de Carência (Grace Period):</strong> Caso a data limite expire sem check-in, o sistema entrará automaticamente em estado de tolerância de 14 (quatorze) dias, enviando lembretes diários por múltiplos canais.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <span><strong>Disparo de Notificações:</strong> Somente após decorrido integralmente o período de carência sem qualquer resposta do Titular é que os avisos direcionados serão liberados para os Destinatários Familiares cadastrados.</span>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">4</span>
              Responsabilidade do Usuário
            </h2>
            <p>
              O Usuário declara ser o único e exclusivo responsável pela exatidão e atualização dos dados dos Destinatários Familiares (como e-mail e número de telefone celular/WhatsApp). O Postum não se responsabiliza por falhas de entrega de mensagens decorrentes de dados incorretos, desatualizados ou bloqueios operados pelas operadoras de telefonia e provedores de e-mail.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">5</span>
              Cancelamento e Exclusão de Conta
            </h2>
            <p>
              O Usuário pode cancelar o serviço ou solicitar a exclusão definitiva e irreversível de todos os seus dados a qualquer momento através do painel de configurações da plataforma ou mediante envio de e-mail ao nosso Encarregado de Proteção de Dados.
            </p>
          </section>

          {/* Contact Box */}
          <div className="p-6 bg-[#F5F5F4] rounded-lg border border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h3 className="font-semibold text-[#1C1917] text-base mb-1">Ficou com alguma dúvida sobre estes Termos?</h3>
              <p className="text-xs text-[#78716C]">Nossa equipe jurídica e de suporte está à disposição para esclarecimentos.</p>
            </div>
            <a
              href="mailto:suporte@postum.app"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-md transition-colors shrink-0"
            >
              Falar com o Suporte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
