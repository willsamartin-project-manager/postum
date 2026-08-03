-- Migration Init Postum Database (Supabase PostgreSQL)
-- Created based on postum-spec.md Section 4

-- Enums
CREATE TYPE user_status AS ENUM ('active', 'grace_period', 'released', 'paused_payment');
CREATE TYPE checkin_frequency AS ENUM ('30_days', '60_days', '90_days', '180_days');
CREATE TYPE subscription_plan AS ENUM ('starter_free', 'annual_pro');

-- Tabela de Perfis
CREATE TABLE IF NOT EXISTS profiles (
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
CREATE TABLE IF NOT EXISTS recipients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  relationship TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Avisos / Mapeamento de Instituições
CREATE TABLE IF NOT EXISTS notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  institution_name TEXT NOT NULL,
  category TEXT NOT NULL, -- Seguro, Banco, Imóvel, Inventário, Outros
  instructions TEXT, -- Texto livre curto
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela Associativa: Aviso -> Destinatários
CREATE TABLE IF NOT EXISTS notice_recipients (
  notice_id UUID REFERENCES notices(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES recipients(id) ON DELETE CASCADE,
  PRIMARY KEY (notice_id, recipient_id)
);

-- Log de Check-ins
CREATE TABLE IF NOT EXISTS checkin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  channel TEXT NOT NULL, -- 'email', 'whatsapp', 'web'
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transações (Mercado Pago PIX)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  provider_id TEXT, -- ID do pagamento no Mercado Pago
  qr_code TEXT,
  qr_code_base64 TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Regras de Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users access own recipients" ON recipients
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own notices" ON notices
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own checkin logs" ON checkin_logs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own transactions" ON transactions
  FOR ALL USING (auth.uid() = user_id);

-- Agendador pg_cron para a Edge Function process-checkins
-- SELECT cron.schedule(
--   'process-postum-checkins',
--   '0 3 * * *',
--   $$
--     SELECT net.http_post(
--       url := 'https://<PROJECT_REF>.supabase.co/functions/v1/process-checkins',
--       headers := '{"Content-Type": "application/json", "Authorization": "Bearer <SERVICE_ROLE_KEY>"}'::jsonb
--     );
--   $$
-- );
