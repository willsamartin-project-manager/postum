import { Payment, MercadoPagoConfig } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN!;

    const supabase = createClient(supabaseUrl, supabaseKey);
    const client = new MercadoPagoConfig({ accessToken: mpAccessToken });

    try {
        const url = new URL(req.url);
        const topic = url.searchParams.get('topic') || url.searchParams.get('type');
        const id = url.searchParams.get('id') || url.searchParams.get('data.id');

        if (!id) {
            const body = await req.json().catch(() => ({}));
            if (body.data?.id) {
                return handlePayment(body.data.id, client, supabase);
            }
            return NextResponse.json({ message: 'No ID found' }, { status: 200 });
        }

        if (topic === 'payment' || topic === 'merchant_order') {
            return await handlePayment(id, client, supabase);
        }

        return NextResponse.json({ message: 'Ignored' }, { status: 200 });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function handlePayment(paymentId: string, client: any, supabase: any) {
    console.log('Checking payment:', paymentId);

    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });

    if (!paymentData) {
        throw new Error('Payment not found in Mercado Pago');
    }

    const { status, external_reference: userId } = paymentData;

    const { data: transaction } = await supabase
        .from('transactions')
        .select('*')
        .eq('provider_id', paymentId.toString())
        .maybeSingle();

    if (status === 'approved') {
        if (!transaction) {
            console.error('Transaction not found in DB for approved payment:', paymentId);
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }

        if (transaction.status === 'approved') {
            console.log('Payment already processed for:', paymentId);
            return NextResponse.json({ message: 'Already processed' }, { status: 200 });
        }

        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);

        // Update profile to PRO plan
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                plan: 'annual_pro',
                subscription_expires_at: nextYear.toISOString(),
                updated_at: new Date().toISOString()
            })
            .eq('id', userId);

        if (profileError) {
            console.error('Failed to update user profile:', profileError);
            return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
        }

        // Mark transaction as approved
        await supabase
            .from('transactions')
            .update({ status: 'approved', updated_at: new Date().toISOString() })
            .eq('id', transaction.id);

        console.log(`Payment success for ${paymentId}. User ${userId} upgraded to annual_pro.`);
    } else {
        if (transaction) {
            await supabase
                .from('transactions')
                .update({ status: status, updated_at: new Date().toISOString() })
                .eq('id', transaction.id);
        }
    }

    return NextResponse.json({ message: 'OK', status: status });
}
