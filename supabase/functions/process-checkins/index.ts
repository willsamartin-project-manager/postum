// Supabase Edge Function: process-checkins
// Executada diariamente via pg_cron para processar renovações, carência, cartas de aviso e liberação de legado.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'npm:resend'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
const FROM_EMAIL = 'Postum <onboarding@resend.dev>' // Altere para seu domínio verificado em produção

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
        await supabase
          .from('profiles')
          .update({ plan: 'starter_free' })
          .eq('id', profile.id)
      }
    }

    // Função utilitária para pegar o email do usuário na tabela de Auth
    const getUserEmail = async (userId: string) => {
      const { data: { user }, error } = await supabase.auth.admin.getUserById(userId)
      if (error || !user) return null
      return user.email
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

        // Enviar e-mail de alerta inicial de carência
        const email = await getUserEmail(profile.id)
        if (email) {
          await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Aviso Importante: Seu prazo de Check-in expirou no Postum',
            html: `<p>Olá ${profile.full_name},</p>
                   <p>Você não realizou o check-in no prazo estipulado. Seu protocolo entrou em período de carência.</p>
                   <p>Por favor, acesse a plataforma e realize o check-in o quanto antes para evitar a liberação do seu legado.</p>`
          })
        }
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

        // Se faltar <= 72 horas para liberação final, dispara Carta de Aviso
        if (hoursRemaining <= 72 && hoursRemaining > 0) {
          const email = await getUserEmail(profile.id)
          if (email) {
            await resend.emails.send({
              from: FROM_EMAIL,
              to: email,
              subject: '🚨 URGENTE: Liberação do Legado em menos de 72 horas!',
              html: `<p>Olá ${profile.full_name},</p>
                     <p><strong>ALERTA DE PRIORIDADE MÁXIMA</strong></p>
                     <p>Seu período de carência está chegando ao fim em menos de 72 horas. Caso você não realize o check-in imediatamente, seu legado e instruções serão liberados para seus destinatários.</p>`
            })
          }
        }

        // 4. Liberação do Legado (status = released)
        if (now >= releaseDate) {
          await supabase
            .from('profiles')
            .update({ status: 'released' })
            .eq('id', profile.id)

          // Buscar destinatários do usuário
          const { data: recipients } = await supabase
            .from('recipients')
            .select('*')
            .eq('user_id', profile.id)

          if (recipients && recipients.length > 0) {
            for (const recipient of recipients) {
              // Buscar notices vinculadas a esse destinatário
              const { data: noticeRecipients } = await supabase
                .from('notice_recipients')
                .select('notice_id')
                .eq('recipient_id', recipient.id)

              if (noticeRecipients && noticeRecipients.length > 0) {
                const noticeIds = noticeRecipients.map(nr => nr.notice_id)
                const { data: notices } = await supabase
                  .from('notices')
                  .select('*')
                  .in('id', noticeIds)

                if (notices && notices.length > 0) {
                  const noticesHtml = notices.map(n => `<li><strong>${n.institution_name} (${n.category}):</strong> ${n.instructions}</li>`).join('')
                  
                  await resend.emails.send({
                    from: FROM_EMAIL,
                    to: recipient.email,
                    subject: `Protocolo Postum: Instruções de ${profile.full_name}`,
                    html: `<p>Olá ${recipient.name},</p>
                           <p>Você foi designado como destinatário de instruções importantes por <strong>${profile.full_name}</strong>.</p>
                           <p>O protocolo de segurança foi ativado e as instruções abaixo foram liberadas para você:</p>
                           <ul>${noticesHtml}</ul>`
                  })
                }
              }
            }
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ message: 'Processamento de check-ins e disparos concluído com sucesso.' }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
