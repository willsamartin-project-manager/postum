# Especificação do Projeto: Postum (Postum.app)

> **Plataforma de Notificação Pós-Morte & Mapeamento de Legado (Dead Man's Switch)**
> *Documento gerado para orientação de desenvolvimento com AI / Google Antigravity.*

---

## 1. Visão Geral do Produto

### 1.1. Proposta de Valor
O **Postum** é uma plataforma minimalista, segura e humanizada que permite ao usuário indicar em vida a existência de vínculos, contas, investimentos, apólices de seguro ou instruções para seus familiares após o seu falecimento.

**Diferencial Crítico:**
* **Zero Armazenamento Sensível:** O Postum **NÃO** armazena valores, senhas, documentos digitalizados ou apólices. O usuário apenas mapeia a instituição (*ex: "Possuo apólice na Bradesco Seguros"*, *"Conta no banco Y"*).
* **Mecanismo Heartbeat:** Ciclo de vida baseado em check-ins periódicos com fase de carência e envio da **Carta de Aviso** antes do disparo final.

---

## 2. Ciclo de Vida do Protocolo & Gatilhos

```
[ Estado Ativo ] ──(Expirou Check-in)──► [ Período de Alerta ] ──(Sem resposta)──► [ Carta de Aviso ] ──(Data Limite)──► [ Liberação aos Familiares ]
   (Check-in OK)                            (Emails / WhatsApp)                        (Alerta Urgente)                       (Envio do Roteiro)
```

1. **Fase Ativa (Check-in Normal):**
   * Usuário seleciona recorrência (30, 60, 90 ou 180 dias).
   * Lembretes enviados por E-mail / WhatsApp com **Magic Link** para confirmação em 1 clique (sem necessidade de re-autenticação).
2. **Fase de Alerta (Carência de 7 a 14 dias):**
   * Disparada quando `next_checkin_at` é ultrapassado sem resposta.
   * Envio diário de e-mails/mensagens de cobrança.
3. **Carta de Aviso (Pré-disparo Final):**
   * Notificação de prioridade máxima enviada por E-mail + WhatsApp com contagem regressiva explícita (ex: 72 horas para encerramento do protocolo).
   * Contém botão direto de cancelamento emergencial (*"Estou bem! Manter conta ativa"*).
4. **Disparo do Legado (`status = released`):**
   * Transcorridos todos os prazos sem resposta do titular, as instruções cadastradas são enviadas diretamente aos e-mails/WhatsApp dos destinatários cadastrados.

---

## 3. Arquitetura Técnica & Stack

* **Frontend / Hosting:** Next.js (App Router), Tailwind CSS, Lucide Icons — Hospedado na **Vercel**.
* **Backend & Banco de Dados:** **Supabase** (PostgreSQL, Supabase Auth, Row Level Security - RLS).
* **Automação & Schedulers:** `pg_cron` (extensão Supabase) executando **Supabase Edge Functions** diariamente.
* **Provedores de Mensageria:**
  * **E-mail:** Resend / Amazon SES (Transacional + Magic Links).
  * **WhatsApp / SMS:** API Meta Cloud / Twilio / Z-API.

---

## 4. Esquema do Banco de Dados (Supabase PostgreSQL)

```sql
-- Enums
CREATE TYPE user_status AS ENUM ('active', 'grace_period', 'released', 'paused_payment');
CREATE TYPE checkin_frequency AS ENUM ('30_days', '60_days', '90_days', '180_days');
CREATE TYPE subscription_plan AS ENUM ('starter_free', 'annual_pro');

-- Tabela de Perfis
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  plan subscription_plan DEFAULT 'starter_free',
  subscription_expires_at TIMESTAMPTZ,
  status user_status DEFAULT 'active',
  frequency checkin_frequency DEFAULT '60_days',
  last_checkin_at TIMESTAMPTZ DEFAULT NOW(),
  next_checkin_at TIMESTAMPTZ NOT NULL,
  grace_period_days INT DEFAULT 14,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Destinatários (Familiares)
CREATE TABLE recipients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  relationship TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Avisos / Mapeamento de Instituições
CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  institution_name TEXT NOT NULL,
  category TEXT NOT NULL, -- Seguro, Banco, Imóvel, Inventário, Outros
  instructions TEXT, -- Texto livre curto
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela Associativa: Aviso -> Destinatários
CREATE TABLE notice_recipients (
  notice_id UUID REFERENCES notices(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES recipients(id) ON DELETE CASCADE,
  PRIMARY KEY (notice_id, recipient_id)
);

-- Log de Check-ins
CREATE TABLE checkin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  channel TEXT NOT NULL, -- 'email', 'whatsapp', 'web'
  checked_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Regras de RLS (Row Level Security)
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Usuário lê e edita apenas seus próprios registros enquanto status = 'active'
CREATE POLICY "Users access own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users access own recipients" ON recipients
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own notices" ON notices
  FOR ALL USING (auth.uid() = user_id);
```

---

## 5. Estrutura da Edge Function & Cron Job

### Execução Diária via `pg_cron`
```sql
SELECT cron.schedule(
  'process-postum-checkins',
  '0 3 * * *', -- Roda todos os dias às 03:00 UTC
  $$
    SELECT net.http_post(
      url := 'https://<PROJECT_REF>.supabase.co/functions/v1/process-checkins',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer <SERVICE_ROLE_KEY>"}'::jsonb
    );
  $$
);
```

### Lógica da Edge Function (`process-checkins`):
1. **Verificação de Anuidade:** Caso `subscription_expires_at < NOW()`, o sistema rebaixa temporariamente para o plano `starter_free` ou envia alerta de renovação da assinatura sem pausar abruptamente o protocolo de segurança.
2. **Identificar atrasos:** Buscar perfis onde `status = 'active'` e `next_checkin_at < NOW()`. Alterar status para `grace_period` e disparar e-mail/WhatsApp de alerta.
3. **Enviar Carta de Aviso:** Buscar perfis em `grace_period` a 3 dias do prazo final. Disparar e-mail de prioridade + WhatsApp urgente.
4. **Liberar Legado:** Buscar perfis em `grace_period` onde `next_checkin_at + grace_period_days < NOW()`.
   * Alterar `status` para `released`.
   * Montar e-mails para cada destinatário com o rol de `notices` vinculados a ele.

---

## 6. Telas do Frontend (Next.js)

1. **Landing Page:**
   * Apresentação acolhedora e sóbria do Postum.
   * Destaque para "Zero documentos guardados, 100% focado no mapeamento".
   * Tabela comparativa de planos (Gratuito vs. Anual).
2. **Dashboard do Usuário (`/dashboard`):**
   * Status do Check-in (Dias restantes, data do próximo).
   * Badge do Plano Atual (Starter Free ou Pro Anual com data de renovação).
   * Botão em destaque: "Confirmar que estou bem".
3. **Gerenciador de Avisos (`/dashboard/avisos`):**
   * Lista de instituições cadastradas.
   * Modal de inclusão: Nome da Instituição, Categoria, Instruções e Seleção dos Destinatários.
4. **Gerenciador de Destinatários (`/dashboard/familiares`):**
   * Cadastro de Nome, E-mail, Telefone e Parentesco.
5. **Configurações de Assinatura & Protocolo (`/dashboard/configuracoes`):**
   * Gerenciamento do plano anual, histórico de pagamentos e escolha da frequência de check-in (30, 60, 90, 180 dias).

---

## 7. Planos & Precificação (Modelo Anualidade)

* **Plano Starter (Gratuito):**
  * Até 2 avisos de instituições.
  * 2 destinatários familiares.
  * Check-in exclusivo por E-mail (frequência fixa 30 dias).
* **Plano Pro Anual (Postum Legado Pro - R$ 49,00 / ano):**
  * Avisos e destinatários ilimitados.
  * Check-in multicanal (E-mail + WhatsApp).
  * Frequência configurável (30, 60, 90 ou 180 dias).
  * Envio da Carta de Aviso com prioridade máxima.
  * Renovação automática anual com aviso prévio de cobrança.

---

## 8. Aspectos Legais & LGPD (Termos de Uso)

* **Limitação de Responsabilidade:** O Postum é um serviço de transmissão de mensagens de última vontade e **não substitui** testamentos públicos, inventários ou escrituras legais.
* **Política de Inadimplência:** Em caso de não renovação do plano anual, a conta não é desativada imediatamente; ela rebaixa para o plano *Starter Free* para garantir que o usuário não fique desprotegido.
* **Minimização de Dados (LGPD):** Não são coletados senhas, tokens ou imagens de documentos.
