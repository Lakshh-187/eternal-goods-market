
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, currency = 'INR', orderId } = await req.json()

    const RAZORPAY_KEY_ID = 'rzp_test_Ysbma1ySF1JiMS'
    const RAZORPAY_KEY_SECRET = 'C9XrI6sbEfL7zSUnPj1YufrQ'

    // Create Razorpay order
    const orderData = {
      amount: amount, // amount in paise
      currency: currency,
      receipt: orderId || `receipt_${Date.now()}`,
    }

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error('Failed to create Razorpay order')
    }

    const razorpayOrder = await response.json()

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Create payment record
    const { data: payment, error } = await supabase
      .from('payments')
      .insert({
        gateway_order_id: razorpayOrder.id,
        amount: amount / 100, // convert back to rupees
        currency: currency,
        status: 'pending',
        payment_gateway: 'razorpay'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating payment record:', error)
    }

    return new Response(
      JSON.stringify({
        razorpayOrderId: razorpayOrder.id,
        orderId: payment?.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
