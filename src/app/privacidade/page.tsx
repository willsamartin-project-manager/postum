import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, Eye, ArrowLeft, Database, KeyRound, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidade — Postum',
  description: 'Conheça como o Postum protege seus dados pessoais e garante privacidade absoluta com o princípio Zero Storage.',
};

export default function PrivacidadePage() {
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
            <Lock className="w-3.5 h-3.5 text-[#0D9488]" />
            Privacidade & Proteção de Dados
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight mb-4">
            Política de Privacidade
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Sua privacidade é a pedra angular da arquitetura do <strong>Postum</strong>. Desenvolvemos o serviço para operar com o mínimo absoluto de dados estritamente necessários, garantindo sigilo, soberania e paz de espírito.
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
              Informações Coletadas
            </h2>
            <p>
              Para a prestação do serviço de notificação programada, coletamos apenas as seguintes categorias de dados:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              <div className="p-4 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4]">
                <h3 className="font-semibold text-[#1C1917] text-xs mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#0D9488]" />
                  Dados do Titular da Conta
                </h3>
                <p className="text-xs text-[#57534E]">Nome completo, endereço de e-mail e número de telefone (WhatsApp) para o envio de lembretes de Check-in.</p>
              </div>
              <div className="p-4 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4]">
                <h3 className="font-semibold text-[#1C1917] text-xs mb-1 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-[#0D9488]" />
                  Instruções & Contatos Familiares
                </h3>
                <p className="text-xs text-[#57534E]">Nomes e contatos dos destinatários indicados pelo usuário e orientações simplificadas de localização de patrimônio.</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">2</span>
              O que Jamais Coletamos (Zero Storage)
            </h2>
            <p>
              Por diretriz fundamental do Postum, o sistema foi projetado para ser incapaz de solicitar ou guardar informações financeiras ou credenciais de acesso:
            </p>
            <div className="p-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg text-[#065F46] space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                Compromisso Técnico Zero Storage
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>Nunca solicitamos senhas de aplicativos de bancos ou e-mails.</li>
                <li>Nunca solicitamos números de cartões de crédito ou chaves privadas Pix/Cripto.</li>
                <li>Nunca armazenamos arquivos de apólices, contratos digitalizados ou certidões.</li>
                <li>Nunca registramos valores monetários exatos ou extratos financeiros.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">3</span>
              Finalidade Estrita do Tratamento de Dados
            </h2>
            <p>
              Tratamos os dados pessoais exclusivamente para as seguintes finalidades operacionais:
            </p>
            <ul className="space-y-2 list-disc list-inside pl-2 text-[#57534E]">
              <li>Disparar alertas periódicos de confirmação de presença (Check-in) para o Titular.</li>
              <li>Calcular o período de carência (14 dias) em caso de ausência de confirmação.</li>
              <li>Liberar o acesso às instruções cadastradas estritamente para os Destinatários Familiares autorizados após a conclusão do protocolo.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">4</span>
              Segurança e Criptografia
            </h2>
            <p>
              Todas as comunicações entre o seu navegador e a plataforma Postum são protegidas por protocolos de criptografia de alto nível em trânsito (HTTPS / TLS 1.3). No banco de dados, os dados estão isolados através de políticas de <em>Row Level Security (RLS)</em>, garantindo que nenhum usuário ou terceiros consigam acessar os dados de outra conta.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6 border-t border-[#E7E5E4]">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-sans">5</span>
              Não Compartilhamento com Terceiros
            </h2>
            <p>
              O Postum <strong>não vende, aluga nem compartilha</strong> dados pessoais de seus usuários com empresas de publicidade, corretores de seguros, bancos ou qualquer terceiro não autorizado.
            </p>
          </section>

          {/* Contact Box */}
          <div className="p-6 bg-[#F5F5F4] rounded-lg border border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h3 className="font-semibold text-[#1C1917] text-base mb-1">Dúvidas sobre seus dados?</h3>
              <p className="text-xs text-[#78716C]">Entre em contato diretamente com o nosso Encarregado de Dados (DPO).</p>
            </div>
            <a
              href="mailto:privacidade@postum.app"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-md transition-colors shrink-0"
            >
              privacidade@postum.app
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
