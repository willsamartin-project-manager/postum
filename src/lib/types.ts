export type UserStatus = 'active' | 'grace_period' | 'released' | 'paused_payment';

export type CheckinFrequency = '5_min' | '30_days' | '60_days' | '90_days' | '180_days';

export type SubscriptionPlan = 'starter_free' | 'annual_pro';

export type NoticeCategory = 'Seguro' | 'Banco' | 'Imóvel' | 'Inventário' | 'Outros';

export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  plan: SubscriptionPlan;
  subscription_expires_at: string | null;
  status: UserStatus;
  frequency: CheckinFrequency;
  last_checkin_at: string;
  next_checkin_at: string;
  grace_period_days: number;
  created_at: string;
  updated_at: string;
}

export interface Recipient {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  relationship: string | null;
  created_at: string;
}

export interface Notice {
  id: string;
  user_id: string;
  institution_name: string;
  category: NoticeCategory;
  instructions: string | null;
  recipient_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface CheckinLog {
  id: string;
  user_id: string;
  channel: 'email' | 'whatsapp' | 'web';
  checked_at: string;
}
