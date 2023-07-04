import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

import { stripe } from '@/libs/stripe';
import { getURL } from '@/libs/helpers';
import { createOrFetchCustomer } from '@/libs/supabaseAdmin';

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ 
      cookies
     },{
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey:  process.env.SUPABASE_ANON_API_KEY,
    });
    
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) throw Error('Non è stato possbibile recuperare lo user');
    const customer = await createOrFetchCustomer({
      uuid: user.id || '',
      email: user.email || ''
    });

    //link di iscrizione
    if (!customer) throw Error('Non è stato possibile recuperare il cliente');
    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/account`
    });

    return NextResponse.json({ url });
  } catch (err: any) {
    console.log(err);
    new NextResponse('Internal Error', { status: 500 })
  }
};