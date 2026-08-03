import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Heart, Check, Clock, Bell, ArrowRight, ShieldCheck, Mail, Zap, FileText, CheckCircle2, ChevronRight, HelpCircle, AlertCircle, HeartHandshake } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16 overflow-x-hidden w-full max-w-full">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#FAFAF9] via-[#F5F5F4] to-[#FAFAF9] border-b border-[#E7E5E4] w-full">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEDEB] border border-[#D6D3D1] text-[11px] sm:text-xs font-semibold text-[#57534E] shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
              <span>Zero Armazenamento de Senhas ou Documentos</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E5E4] text-[11px] sm:text-xs text-[#57534E] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
              <span className="font-semibold text-[#1C1917]">Conformidade LGPD & Sigilo Total</span>
            </div>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1917] tracking-tight leading-[1.2] mb-6">
            Organize seu legado em vida.<br className="hidden sm:inline" />{' '}
            <span className="text-[#0D9488] font-normal italic">Cuide de quem você ama</span> no momento certo.
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-[#57534E] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
            O <strong>Postum</strong> é uma plataforma privada e humanizada que permite indicar a existência de apólices, contas, investimentos ou instruções aos seus familiares após seu falecimento — sem nunca guardar senhas ou documentos.
          </p>

          <div className="flex flex-col items-center justify-center w-full max-w-md sm:max-w-none mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-sm sm:text-base rounded-md transition-all shadow-md hover:shadow-lg focus-ring"
              >
                <span>Iniciar Minha Proteção Gratuita</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
              <a
                href="#como-funciona"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 min-h-[48px] bg-white hover:bg-[#F5F5F4] text-[#1C1917] border border-[#D6D3D1] hover:border-[#1C1917] font-semibold text-sm sm:text-base rounded-md transition-all shadow-2xs"
              >
                Como Funciona o Protocolo
              </a>
            </div>
            
            {/* Micro friction-reduction text */}
            <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] sm:text-xs text-[#78716C]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
              <span>Sem cartão de crédito · Mapeamento em menos de 2 minutos</span>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-[#E7E5E4] pt-6 sm:pt-8 max-w-3xl mx-auto px-2">
            <div>
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">0%</p>
              <p className="text-[11px] sm:text-xs text-[#78716C]">Documentos ou senhas guardadas</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#0D9488]">1 Clique</p>
              <p className="text-[11px] sm:text-xs text-[#78716C]">Check-in via Magic Link</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">14 Dias</p>
              <p className="text-[11px] sm:text-xs text-[#78716C]">Carência contra alarmes falsos</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#0D9488]">100%</p>
              <p className="text-[11px] sm:text-xs text-[#78716C]">Foco na tranquilidade familiar</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Manifesto Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Pain Agitation */}
          <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 p-6 opacity-[0.03]">
              <AlertCircle className="w-48 h-48" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA] rounded-sm text-xs font-semibold mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" /> O Problema Invisível
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-4 relative z-10">
              Bilhões são perdidos na burocracia todos os anos.
            </h2>
            <p className="text-[#57534E] text-sm sm:text-base leading-relaxed mb-6 relative z-10">
              Quando alguém falta, o processo de inventário já é doloroso o suficiente. O que muitos não sabem é que contas, seguros de vida e investimentos frequentemente <strong>ficam retidos nas instituições</strong> simplesmente porque a família desconhece a existência deles.
            </p>
            <p className="text-[#1C1917] text-sm sm:text-base font-medium relative z-10">
              Não permita que o patrimônio de uma vida inteira se perca, deixando sua família desamparada no momento em que ela mais precisar.
            </p>
          </div>

          {/* Manifesto */}
          <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 sm:p-10 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute -bottom-4 -right-4 p-6 opacity-[0.03]">
              <HeartHandshake className="w-48 h-48" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F5F4] text-[#57534E] border border-[#D6D3D1] rounded-sm text-xs font-semibold mb-4 w-fit relative z-10">
              <HeartHandshake className="w-4 h-4 shrink-0" /> Nosso Manifesto
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-4 relative z-10">
              Por que criamos o Postum?
            </h2>
            <p className="text-[#57534E] text-sm sm:text-base leading-relaxed mb-6 relative z-10">
              Nascemos da necessidade real de simplificar o luto. Vimos de perto famílias passarem pela dor da perda e, ainda por cima, terem que lidar com o caos de rastrear apólices e organizar documentos às cegas.
            </p>
            <p className="text-[#0D9488] font-serif italic text-lg font-medium border-l-2 border-[#0D9488] pl-4 py-1 relative z-10">
              "O foco no momento mais difícil deve ser o apoio mútuo, não a investigação burocrática."
            </p>
          </div>
        </div>
      </section>

      {/* Differential Feature Section */}
      <section id="zero-storage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl p-5 sm:p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] rounded-sm text-xs font-semibold mb-4">
                <ShieldCheck className="w-4 h-4 shrink-0" /> Diferencial Crítico de Segurança
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-4">
                Zero Armazenamento Sensível
              </h2>
              <p className="text-[#57534E] text-xs sm:text-sm md:text-base leading-relaxed mb-6">
                Ao contrário de cofres digitais que exigem o upload de fotos de documentos, cartões ou chaves de acesso, o Postum <strong>apenas mapeia a instituição</strong> e orienta o roteiro.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-[#1C1917]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Você cadastra:</strong> <em>"Possuo apólice de seguro de vida na Bradesco Seguros."</em></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Você NÃO envia:</strong> Cópias de apólices, valores mantidos em conta ou senhas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Seus familiares recebem:</strong> O roteiro completo das instituições onde você possui vínculo para requerer os direitos legalmente.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#FAFAF9] p-4 sm:p-6 rounded-lg border border-[#E7E5E4] shadow-subtle font-mono text-xs space-y-4 overflow-x-auto">
              <div className="flex items-center justify-between text-[#78716C] border-b border-[#E7E5E4] pb-2 text-[10px] sm:text-xs">
                <span>MAPEAMENTO POSTUM</span>
                <span className="text-[#0D9488] font-bold">LGPD COMPLIANT</span>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-white rounded border border-[#E7E5E4]">
                  <p className="text-[#78716C] text-[10px]">INSTITUIÇÃO MAPEADA</p>
                  <p className="font-semibold text-[#1C1917] text-xs">BTG Pactual — Previdência</p>
                  <p className="text-[#57534E] mt-1 text-[11px]">Instrução: Contatar previdência VGBL em nome do titular.</p>
                </div>
                <div className="p-3 bg-white rounded border border-[#E7E5E4]">
                  <p className="text-[#78716C] text-[10px]">DESTINATÁRIO ASSOCIADO</p>
                  <p className="font-semibold text-[#1C1917] text-xs">Mariana Wilkinson (Esposa)</p>
                </div>
                <div className="p-2 bg-[#ECFDF5] text-[#047857] rounded border border-[#A7F3D0] text-[11px] flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Nenhum saldo ou senha armazenado no servidor.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Lifecycle Section */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1917] mb-4">
            Ciclo de Vida do Protocolo & Gatilhos
          </h2>
          <p className="text-[#57534E] text-xs sm:text-base">
            Desenvolvido com carência em fases para garantir total segurança contra falsos alarmes ou imprevistos de viagem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {/* Step 1 */}
          <div className="bg-[#FAFAF9] p-5 sm:p-6 rounded-lg border border-[#E7E5E4] relative">
            <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-sm mb-3">
              1
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1917] mb-2">Fase Ativa</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Você escolhe a frequência do check-in (30, 60, 90 ou 180 dias). Receba um <strong>Magic Link</strong> por E-mail ou WhatsApp para confirmar que está bem em 1 clique.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FAFAF9] p-5 sm:p-6 rounded-lg border border-[#E7E5E4] relative">
            <div className="w-8 h-8 rounded-full bg-[#D97706] text-white flex items-center justify-center font-bold text-sm mb-3">
              2
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1917] mb-2">Fase de Alerta</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Se a data do check-in passar sem resposta, o sistema entra automaticamente na <strong>Carência (7 a 14 dias)</strong> com cobranças diárias sem disparar nada aos familiares.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FAFAF9] p-5 sm:p-6 rounded-lg border border-[#E7E5E4] relative">
            <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold text-sm mb-3">
              3
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1917] mb-2">Carta de Aviso</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Faltando 72h para o fim do prazo, você recebe um aviso de prioridade máxima com botão direto de cancelamento emergencial <em>("Estou bem! Manter conta ativa")</em>.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#FAFAF9] p-5 sm:p-6 rounded-lg border border-[#E7E5E4] relative">
            <div className="w-8 h-8 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-sm mb-3">
              4
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1917] mb-2">Disparo do Legado</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Decorridos todos os prazos sem qualquer resposta do titular, as instruções mapeadas são entregues com segurança aos destinatários cadastrados.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Section */}
      <section id="planos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1917] mb-4">
            Planos Transparentes & Sustentáveis
          </h2>
          <p className="text-[#57534E] text-xs sm:text-base">
            Modelo de anuidade acessível para garantir a sustentabilidade do protocolo de segurança por longos anos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Plan Starter Free */}
          <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1917]">Plano Starter</h3>
                <span className="px-3 py-1 bg-[#F5F5F4] text-[#57534E] text-xs font-semibold rounded-sm border border-[#E7E5E4]">
                  Gratuito
                </span>
              </div>
              <p className="text-xs text-[#78716C] mb-6">
                Ideal para testar e manter o mapeamento essencial de até 2 instituições.
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">R$ 0</span>
                <span className="text-xs text-[#78716C]">/ para sempre</span>
              </div>

              <ul className="space-y-3 text-xs text-[#57534E] mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Até <strong>2 avisos de instituições</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Até <strong>2 destinatários familiares</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Check-in exclusivo por E-mail (30 dias fixo)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Zero armazenamento de senhas</span>
                </li>
              </ul>
            </div>

            <Link
              href="/login"
              className="w-full py-3.5 bg-[#F5F5F4] hover:bg-[#EFEDEB] text-[#1C1917] border border-[#D6D3D1] font-semibold text-sm rounded-md text-center transition-colors min-h-[44px] flex items-center justify-center"
            >
              Criar Conta Gratuita
            </Link>
          </div>

          {/* Plan Pro Anual */}
          <div className="bg-[#0F172A] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-floating relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#0D9488] text-white text-[10px] uppercase font-bold font-mono px-3 py-1 rounded-bl">
              Recomendado
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pt-2 sm:pt-0">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">Postum Legado Pro</h3>
                <span className="px-3 py-1 bg-[#0D9488]/20 text-[#A7F3D0] text-xs font-semibold rounded-sm border border-[#0D9488]/40 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Economize 38%
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-5">
                Proteção completa sem limites, acompanhamento por WhatsApp e flexibilidade total para o seu legado.
              </p>
              
              <div className="mb-1">
                <span className="text-sm text-slate-400 line-through decoration-slate-500">De R$ 79,00</span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white">R$ 49</span>
                <span className="text-xs text-slate-400">,00 / ano</span>
              </div>
              <p className="text-xs text-emerald-400 font-medium mb-8 bg-emerald-400/10 inline-block px-2.5 py-1.5 rounded border border-emerald-400/20">
                Apenas R$ 4,08 por mês — Menos que um café.
              </p>

              <ul className="space-y-3 text-xs text-slate-200 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span><strong>Avisos e instituições ilimitadas</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span><strong>Destinatários familiares ilimitados</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Check-in multicanal (E-mail + WhatsApp)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Frequência personalizável (30, 60, 90 ou 180 dias)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Envio da Carta de Aviso com prioridade máxima</span>
                </li>
              </ul>
            </div>

            <Link
              href="/login"
              className="w-full py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm rounded-md text-center transition-colors shadow-accent-glow min-h-[44px] flex items-center justify-center"
            >
              Garantir a Proteção da Minha Família
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E7E5E4] pt-12 sm:pt-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-2">
            Perguntas Frequentes
          </h2>
          <p className="text-[#57534E] text-xs sm:text-sm">
            Tudo o que você precisa saber sobre a segurança e o funcionamento do Postum.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 sm:p-5 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4]">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#1C1917] mb-2">
              E se eu viajar ou ficar sem internet no dia do check-in?
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              O Postum possui a Fase de Carência de 7 a 14 dias e o envio prévio da Carta de Aviso com 72h de antecedência antes de qualquer liberação. Você terá múltiplos avisos por E-mail e WhatsApp para responder em 1 clique com apenas um toque no celular.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4]">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#1C1917] mb-2">
              O Postum guarda o saldo das minhas contas ou senhas de acesso?
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Não. Por diretriz estrita de segurança e conformidade LGPD, o Postum armazena apenas o mapeamento (*"Possuo apólice no Banco X"*) e suas orientações aos destinatários. O resgate dos valores é feito diretamente pelos familiares perante as instituições com os documentos legais exigidos.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4]">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#1C1917] mb-2">
              O que acontece se eu não renovar o plano anual de R$ 49?
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Pela nossa política humanizada, sua conta nunca é desativada abruptamente. Em caso de não renovação, a conta migra automaticamente para o plano <em>Starter Free</em>, garantindo que você continue protegido.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Garanta a tranquilidade da sua família hoje mesmo.
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-6 sm:mb-8">
            Leva menos de 5 minutos para mapear suas principais instituições e cadastrar seus destinatários confiáveis.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm sm:text-base rounded-md transition-colors shadow-accent-glow min-h-[48px]"
          >
            <span>Proteger Meu Legado Agora</span>
            <ChevronRight className="w-5 h-5 shrink-0" />
          </Link>
        </div>
      </section>
    </div>
  );
}
