import { Payment, MercadoPagoConfig } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim();

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: 'Server Misconfiguration: Missing Supabase Keys' }, { status: 500 });
    }

    if (!mpAccessToken) {
        return NextResponse.json({ error: 'Server Misconfiguration: Missing MP Token' }, { status: 500 });
    }

    if (process.env.NODE_ENV === 'development') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const client = new MercadoPagoConfig({ accessToken: mpAccessToken });

    try {
        const { userId, email, firstName, cpf } = await req.json();
        const amount = 49.00; // Postum Legado Pro Fixed Price

        const isTest = mpAccessToken.includes('TEST');
        
        const payment = new Payment(client);
        const idempotencyKey = `pay_${userId}_${Date.now()}`;

        const payerEmail = isTest
            ? `player_${userId.substring(0, 4)}_${Date.now()}@temp.game`
            : (email || 'user@postum.app');

        const paymentData = {
            body: {
                transaction_amount: amount,
                description: `Postum Legado Pro - Assinatura Anual`,
                payment_method_id: 'pix',
                payer: {
                    email: payerEmail,
                    first_name: firstName || 'User',
                    identification: {
                        type: 'CPF',
                        number: cpf || '19119119100' // Provide real CPF in production
                    }
                },
                external_reference: userId, 
                // Assumes deployment URL, for local it uses ngrok or similar
                notification_url: `${req.headers.get('origin') || 'https://postum.app'}/api/payment/webhook`
            },
            requestOptions: { idempotencyKey }
        };

        const result = await payment.create(paymentData);

        if (!result) {
            throw new Error('Failed to create payment with Mercado Pago');
        }

        const { error: dbError } = await supabase
            .from('transactions')
            .insert({
                user_id: userId,
                amount: amount,
                status: 'pending',
                provider_id: result.id?.toString(),
                qr_code: result.point_of_interaction?.transaction_data?.qr_code,
                qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64
            });

        if (dbError) {
            console.error('DB Insert Error:', dbError);
        }

        return NextResponse.json({
            id: result.id,
            qr_code: result.point_of_interaction?.transaction_data?.qr_code,
            qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64,
            ticket_url: result.point_of_interaction?.transaction_data?.ticket_url
        });

    } catch (error: any) {
        console.error('Payment Creation Error FULL:', error);
        return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }
}
