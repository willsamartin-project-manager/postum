// Supabase Edge Function: process-checkins
// Executada diariamente via pg_cron para processar renovações, carência, cartas de aviso e liberação de legado.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const now = new Date()

    // 1. Verificação de Anuidade: expiração de assinaturas
    const { data: expiredSubscriptions } = await supabase
      .from('profiles')
      .select('*')
      .eq('plan', 'annual_pro')
      .lt('subscription_expires_at', now.toISOString())

    if (expiredSubscriptions && expiredSubscriptions.length > 0) {
      for (const profile of expiredSubscriptions) {
        // Rebaixa temporariamente para starter_free sem cancelar o protocolo
        await supabase
          .from('profiles')
          .update({ plan: 'starter_free' })
          .eq('id', profile.id)
      }
    }

    // 2. Identificar Atrasos (Transição para grace_period)
    const { data: overdueActiveProfiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('status', 'active')
      .lt('next_checkin_at', now.toISOString())

    if (overdueActiveProfiles && overdueActiveProfiles.length > 0) {
      for (const profile of overdueActiveProfiles) {
        await supabase
          .from('profiles')
          .update({ status: 'grace_period' })
          .eq('id', profile.id)

        // Lógica de disparo de email/whatsapp de alerta inicial de carência
      }
    }

    // 3. Identificar Carta de Aviso Urgente (Falta 3 dias ou menos para liberação)
    const { data: graceProfiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('status', 'grace_period')

    if (graceProfiles) {
      for (const profile of graceProfiles) {
        const nextCheckin = new Date(profile.next_checkin_at)
        const releaseDate = new Date(nextCheckin.getTime() + profile.grace_period_days * 24 * 60 * 60 * 1000)
        const hoursRemaining = (releaseDate.getTime() - now.getTime()) / (1000 * 60 * 60)

        // Se faltar <= 72 horas para liberação final, dispara Carta de Aviso com link de emergência
        if (hoursRemaining <= 72 && hoursRemaining > 0) {
          // Disparar e-mail de prioridade máxima + WhatsApp urgente
        }

        // 4. Liberação do Legado (status = released)
        if (now >= releaseDate) {
          await supabase
            .from('profiles')
            .update({ status: 'released' })
            .eq('id', profile.id)

          // Buscar todos os avisos do usuário e enviar e-mails com o roteiro aos destinatários vinculados
        }
      }
    }

    return new Response(
      JSON.stringify({ message: 'Processamento de check-ins concluído com sucesso.' }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
