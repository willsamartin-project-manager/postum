'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Recipient, Notice, CheckinLog, CheckinFrequency, SubscriptionPlan, UserStatus } from '@/lib/types';
import { supabase } from '@/lib/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface PostumContextType {
  user: User | null;
  session: Session | null;
  profile: Profile;
  recipients: Recipient[];
  notices: Notice[];
  logs: CheckinLog[];
  isSupabaseConnected: boolean;
  dbError: string | null;
  signUpWithEmail: (email: string, pass: string, fullName: string, phone?: string) => Promise<{ error?: string }>;
  loginWithEmail: (email: string, pass: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  performCheckin: (channel?: 'web' | 'email' | 'whatsapp') => Promise<void>;
  updateFrequency: (freq: CheckinFrequency) => Promise<void>;
  updatePlan: (plan: SubscriptionPlan) => Promise<void>;
  updateProfileData: (data: { full_name?: string; phone?: string | null }) => Promise<{ error?: string }>;
  addRecipient: (recipient: Omit<Recipient, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  updateRecipient: (id: string, recipient: Partial<Recipient>) => Promise<void>;
  deleteRecipient: (id: string) => Promise<void>;
  addNotice: (notice: Omit<Notice, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateNotice: (id: string, notice: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
  simulateStateChange: (newStatus: UserStatus, daysOffset?: number) => void;
  resetDemoData: () => void;
}

const DEFAULT_PROFILE: Profile = {
  id: 'usr_demo_123',
  full_name: 'Guilherme Wilkinson',
  phone: '+55 11 99876-5432',
  plan: 'annual_pro',
  subscription_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  status: 'active',
  frequency: '60_days',
  last_checkin_at: new Date().toISOString(),
  next_checkin_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
  grace_period_days: 14,
  created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date().toISOString(),
};

const DEFAULT_RECIPIENTS: Recipient[] = [
  {
    id: 'rec_1',
    user_id: 'usr_demo_123',
    name: 'Mariana Wilkinson',
    email: 'mariana.wilkinson@exemplo.com.br',
    phone: '+55 11 98765-4321',
    relationship: 'Esposa / Cônjuge',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec_2',
    user_id: 'usr_demo_123',
    name: 'Carlos Eduardo Wilkinson',
    email: 'carlos.wilkinson@exemplo.com.br',
    phone: '+55 11 97654-3210',
    relationship: 'Irmão',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const DEFAULT_NOTICES: Notice[] = [
  {
    id: 'not_1',
    user_id: 'usr_demo_123',
    institution_name: 'Bradesco Seguros',
    category: 'Seguro',
    instructions: 'Possuo apólice de seguro de vida resgatável contratada em 2021. Entrar em contato com o corretor responsável pelo CPF do titular.',
    recipient_ids: ['rec_1'],
    created_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'not_2',
    user_id: 'usr_demo_123',
    institution_name: 'BTG Pactual',
    category: 'Banco',
    instructions: 'Conta de investimentos com custódia de fundos e previdência privada VGBL com beneficiários indicados em contrato.',
    recipient_ids: ['rec_1', 'rec_2'],
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const DEFAULT_LOGS: CheckinLog[] = [
  {
    id: 'log_1',
    user_id: 'usr_demo_123',
    channel: 'web',
    checked_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const PostumContext = createContext<PostumContextType | undefined>(undefined);

const STORAGE_KEY = 'postum_app_state_v2';

export const PostumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [recipients, setRecipients] = useState<Recipient[]>(DEFAULT_RECIPIENTS);
  const [notices, setNotices] = useState<Notice[]>(DEFAULT_NOTICES);
  const [logs, setLogs] = useState<CheckinLog[]>(DEFAULT_LOGS);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Supabase Auth Session listener & load local state
  useEffect(() => {
    loadLocalState();
    setIsLoaded(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserDataFromSupabase(session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserDataFromSupabase(session.user);
      } else {
        loadLocalState();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Save state to localStorage on state updates
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ profile, recipients, notices, logs })
      );
    } catch (e) {
      console.error('Failed to save local state', e);
    }
  }, [profile, recipients, notices, logs, isLoaded]);

  const loadLocalState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.recipients) setRecipients(parsed.recipients);
        if (parsed.notices) setNotices(parsed.notices);
        if (parsed.logs) setLogs(parsed.logs);
      }
    } catch (e) {
      console.error('Failed to load local state', e);
    }
  };

  const loadUserDataFromSupabase = async (authUser: User) => {
    try {
      setDbError(null);
      setIsSupabaseConnected(true);

      // 1. Fetch or create Profile
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profileErr && profileErr.code === 'PGRST116') {
        const newProf: Profile = {
          id: authUser.id,
          full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Usuário Postum',
          phone: authUser.user_metadata?.phone || null,
          plan: 'starter_free',
          subscription_expires_at: null,
          status: 'active',
          frequency: '60_days',
          last_checkin_at: new Date().toISOString(),
          next_checkin_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          grace_period_days: 14,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        try {
          const { error: insErr } = await supabase.from('profiles').insert(newProf);
          if (!insErr) {
            setProfile(newProf);
          } else {
            setDbError('Tabela `profiles` ainda não foi criada no SQL Editor do Supabase.');
            setProfile({ ...newProf, id: authUser.id });
          }
        } catch {
          setProfile({ ...newProf, id: authUser.id });
        }
      } else if (profileData) {
        setProfile(profileData);
      } else if (profileErr) {
        setDbError('Execute a migração SQL no Supabase Dashboard para sincronização.');
        setProfile((prev) => ({ ...prev, id: authUser.id, full_name: authUser.user_metadata?.full_name || prev.full_name }));
      }

      // 2. Fetch Recipients
      const { data: recData } = await supabase
        .from('recipients')
        .select('*')
        .eq('user_id', authUser.id);

      if (recData) {
        setRecipients(recData);
      }

      // 3. Fetch Notices
      const { data: noticeData } = await supabase
        .from('notices')
        .select('*')
        .eq('user_id', authUser.id);

      if (noticeData) {
        const noticesWithRecs = await Promise.all(
          noticeData.map(async (n) => {
            const { data: assoc } = await supabase
              .from('notice_recipients')
              .select('recipient_id')
              .eq('notice_id', n.id);
            return {
              ...n,
              recipient_ids: assoc ? assoc.map((a) => a.recipient_id) : [],
            };
          })
        );
        setNotices(noticesWithRecs);
      }

      // 4. Fetch Logs with fallback to local state / initial log
      const { data: logData } = await supabase
        .from('checkin_logs')
        .select('*')
        .eq('user_id', authUser.id)
        .order('checked_at', { ascending: false });

      if (logData && logData.length > 0) {
        setLogs((prevLocal) => {
          const supabaseIds = new Set(logData.map((l) => l.id));
          const unsyncedLocal = prevLocal.filter((l) => !supabaseIds.has(l.id));
          const merged = [...logData, ...unsyncedLocal];
          merged.sort((a, b) => new Date(b.checked_at).getTime() - new Date(a.checked_at).getTime());
          return merged;
        });
      } else {
        setLogs((prevLocal) => {
          if (prevLocal && prevLocal.length > 0) {
            return prevLocal;
          }
          return [
            {
              id: `log_init_${Date.now()}`,
              user_id: authUser.id,
              channel: 'web',
              checked_at: new Date().toISOString(),
            },
          ];
        });
      }
    } catch (err: any) {
      console.error('Error fetching Supabase data:', err);
      setDbError(err.message);
    }
  };

  const daysFromFrequency = (freq: CheckinFrequency): number => {
    switch (freq) {
      case '30_days': return 30;
      case '60_days': return 60;
      case '90_days': return 90;
      case '180_days': return 180;
      default: return 60;
    }
  };

  // Auth Methods
  const signUpWithEmail = async (email: string, pass: string, fullName: string, phone?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { full_name: fullName, phone: phone || '' },
      },
    });

    if (error) return { error: error.message };

    if (data.user) {
      setUser(data.user);
      setSession(data.session);

      const newProf: Profile = {
        id: data.user.id,
        full_name: fullName,
        phone: phone || null,
        plan: 'starter_free',
        subscription_expires_at: null,
        status: 'active',
        frequency: '60_days',
        last_checkin_at: new Date().toISOString(),
        next_checkin_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        grace_period_days: 14,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const initialLog: CheckinLog = {
        id: `log_${Date.now()}`,
        user_id: data.user.id,
        channel: 'web',
        checked_at: newProf.last_checkin_at,
      };

      setProfile(newProf);
      setRecipients([]);
      setNotices([]);
      setLogs([initialLog]);

      try {
        await supabase.from('profiles').insert(newProf);
        await supabase.from('checkin_logs').insert({
          user_id: data.user.id,
          channel: 'web',
          checked_at: newProf.last_checkin_at,
        });
      } catch (e) {
        console.warn('Could not insert profile/log to Supabase DB', e);
      }
    }

    return {};
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) return { error: error.message };

    if (data.user) {
      setUser(data.user);
      setSession(data.session);
      await loadUserDataFromSupabase(data.user);
    }

    return {};
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    loadLocalState();
  };

  const performCheckin = async (channel: 'web' | 'email' | 'whatsapp' = 'web') => {
    const now = new Date();
    const days = daysFromFrequency(profile.frequency);
    const nextDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const updatedProfile: Profile = {
      ...profile,
      status: 'active',
      last_checkin_at: now.toISOString(),
      next_checkin_at: nextDate.toISOString(),
      updated_at: now.toISOString(),
    };

    const newLog: CheckinLog = {
      id: `log_${Date.now()}`,
      user_id: profile.id,
      channel,
      checked_at: now.toISOString(),
    };

    setProfile(updatedProfile);
    setLogs((prev) => {
      const nextLogs = [newLog, ...prev];
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ profile: updatedProfile, recipients, notices, logs: nextLogs })
        );
      } catch (e) {
        console.error('Failed to sync checkin to localStorage', e);
      }
      return nextLogs;
    });

    if (user) {
      try {
        await supabase.from('profiles').update({
          status: 'active',
          last_checkin_at: now.toISOString(),
          next_checkin_at: nextDate.toISOString(),
          updated_at: now.toISOString(),
        }).eq('id', user.id);

        const { error: logErr } = await supabase.from('checkin_logs').insert({
          user_id: user.id,
          channel,
          checked_at: now.toISOString(),
        });
        if (logErr) {
          console.warn('Checkin log Supabase insert notice:', logErr);
        }
      } catch (e) {
        console.warn('DB update checkin error', e);
      }
    }
  };

  const updateFrequency = async (freq: CheckinFrequency) => {
    const days = daysFromFrequency(freq);
    const now = new Date();
    const nextDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    setProfile((prev) => ({
      ...prev,
      frequency: freq,
      next_checkin_at: nextDate.toISOString(),
      updated_at: now.toISOString(),
    }));

    if (user) {
      try {
        await supabase.from('profiles').update({
          frequency: freq,
          next_checkin_at: nextDate.toISOString(),
          updated_at: now.toISOString(),
        }).eq('id', user.id);
      } catch (e) {
        console.warn('DB update frequency error', e);
      }
    }
  };

  const updatePlan = async (plan: SubscriptionPlan) => {
    setProfile((prev) => ({
      ...prev,
      plan,
      updated_at: new Date().toISOString(),
    }));

    if (user) {
      try {
        await supabase.from('profiles').update({
          plan,
          updated_at: new Date().toISOString(),
        }).eq('id', user.id);
      } catch (e) {
        console.warn('DB update plan error', e);
      }
    }
  };

  const updateProfileData = async (data: { full_name?: string; phone?: string | null }) => {
    const updated = {
      ...profile,
      ...data,
      updated_at: new Date().toISOString(),
    };

    setProfile(updated);

    if (user) {
      try {
        const { error } = await supabase.from('profiles').update({
          ...(data.full_name !== undefined ? { full_name: data.full_name } : {}),
          ...(data.phone !== undefined ? { phone: data.phone } : {}),
          updated_at: new Date().toISOString(),
        }).eq('id', user.id);

        if (error) {
          console.error('Failed to update profile in Supabase:', error);
          return { error: error.message };
        }
      } catch (e: any) {
        console.warn('DB update profile error', e);
        return { error: e.message || 'Erro ao atualizar perfil no banco de dados' };
      }
    }

    return {};
  };

  const addRecipient = async (data: Omit<Recipient, 'id' | 'user_id' | 'created_at'>) => {
    const newRec: Recipient = {
      ...data,
      id: `rec_${Date.now()}`,
      user_id: profile.id,
      created_at: new Date().toISOString(),
    };
    setRecipients((prev) => [...prev, newRec]);

    if (user) {
      try {
        const { data: inserted } = await supabase.from('recipients').insert({
          user_id: user.id,
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          relationship: data.relationship || null,
        }).select().single();

        if (inserted) {
          setRecipients((prev) => prev.map((r) => (r.id === newRec.id ? inserted : r)));
        }
      } catch (e) {
        console.warn('DB add recipient error', e);
      }
    }
  };

  const updateRecipient = async (id: string, data: Partial<Recipient>) => {
    setRecipients((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...data } : r))
    );

    if (user && !id.startsWith('rec_')) {
      try {
        await supabase.from('recipients').update(data).eq('id', id);
      } catch (e) {
        console.warn('DB update recipient error', e);
      }
    }
  };

  const deleteRecipient = async (id: string) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
    setNotices((prev) =>
      prev.map((n) => ({
        ...n,
        recipient_ids: n.recipient_ids.filter((rid) => rid !== id),
      }))
    );

    if (user && !id.startsWith('rec_')) {
      try {
        await supabase.from('recipients').delete().eq('id', id);
      } catch (e) {
        console.warn('DB delete recipient error', e);
      }
    }
  };

  const addNotice = async (data: Omit<Notice, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString();
    const newNotice: Notice = {
      ...data,
      id: `not_${Date.now()}`,
      user_id: profile.id,
      created_at: now,
      updated_at: now,
    };
    setNotices((prev) => [...prev, newNotice]);

    if (user) {
      try {
        const { data: inserted } = await supabase.from('notices').insert({
          user_id: user.id,
          institution_name: data.institution_name,
          category: data.category,
          instructions: data.instructions || null,
        }).select().single();

        if (inserted) {
          if (data.recipient_ids && data.recipient_ids.length > 0) {
            const assocRows = data.recipient_ids
              .filter((rid) => !rid.startsWith('rec_'))
              .map((rid) => ({
                notice_id: inserted.id,
                recipient_id: rid,
              }));

            if (assocRows.length > 0) {
              await supabase.from('notice_recipients').insert(assocRows);
            }
          }

          setNotices((prev) => prev.map((n) => (n.id === newNotice.id ? { ...inserted, recipient_ids: data.recipient_ids } : n)));
        }
      } catch (e) {
        console.warn('DB add notice error', e);
      }
    }
  };

  const updateNotice = async (id: string, data: Partial<Notice>) => {
    const now = new Date().toISOString();
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...data, updated_at: now } : n))
    );

    if (user && !id.startsWith('not_')) {
      try {
        await supabase.from('notices').update({
          institution_name: data.institution_name,
          category: data.category,
          instructions: data.instructions,
          updated_at: now,
        }).eq('id', id);

        if (data.recipient_ids) {
          await supabase.from('notice_recipients').delete().eq('notice_id', id);
          const assocRows = data.recipient_ids
            .filter((rid) => !rid.startsWith('rec_'))
            .map((rid) => ({
              notice_id: id,
              recipient_id: rid,
            }));
          if (assocRows.length > 0) {
            await supabase.from('notice_recipients').insert(assocRows);
          }
        }
      } catch (e) {
        console.warn('DB update notice error', e);
      }
    }
  };

  const deleteNotice = async (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));

    if (user && !id.startsWith('not_')) {
      try {
        await supabase.from('notices').delete().eq('id', id);
      } catch (e) {
        console.warn('DB delete notice error', e);
      }
    }
  };

  const simulateStateChange = (newStatus: UserStatus, daysOffset: number = 0) => {
    const now = new Date();

    if (newStatus === 'grace_period') {
      const pastDate = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
      setProfile((prev) => ({
        ...prev,
        status: 'grace_period',
        next_checkin_at: pastDate.toISOString(),
        updated_at: now.toISOString(),
      }));
    } else if (newStatus === 'released') {
      const longPastDate = new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000);
      setProfile((prev) => ({
        ...prev,
        status: 'released',
        next_checkin_at: longPastDate.toISOString(),
        updated_at: now.toISOString(),
      }));
    } else if (newStatus === 'active') {
      performCheckin('web');
    } else {
      setProfile((prev) => ({
        ...prev,
        status: newStatus,
        updated_at: now.toISOString(),
      }));
    }
  };

  const resetDemoData = () => {
    setProfile(DEFAULT_PROFILE);
    setRecipients(DEFAULT_RECIPIENTS);
    setNotices(DEFAULT_NOTICES);
    setLogs(DEFAULT_LOGS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PostumContext.Provider
      value={{
        user,
        session,
        profile,
        recipients,
        notices,
        logs,
        isSupabaseConnected,
        dbError,
        signUpWithEmail,
        loginWithEmail,
        logout,
        performCheckin,
        updateFrequency,
        updatePlan,
        updateProfileData,
        addRecipient,
        updateRecipient,
        deleteRecipient,
        addNotice,
        updateNotice,
        deleteNotice,
        simulateStateChange,
        resetDemoData,
      }}
    >
      {children}
    </PostumContext.Provider>
  );
};

export const usePostum = () => {
  const ctx = useContext(PostumContext);
  if (!ctx) {
    throw new Error('usePostum must be used within a PostumProvider');
  }
  return ctx;
};
