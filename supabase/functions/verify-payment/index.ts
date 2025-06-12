
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createHmac } from "https://deno.land/std@0.168.0/crypto/crypto.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = await req.json()

    const RAZORPAY_KEY_SECRET = 'C9XrI6sbEfL7zSUnPj1YufrQ'

    // Verify payment signature
    const body = razorpayOrderId + "|" + razorpayPaymentId
    const expectedSignature = await createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex")

    const isSignatureValid = expectedSignature === razorpaySignature

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    if (isSignatureValid) {
      // Update payment status
      const { data: payment, error } = await supabase
        .from('payments')
        .update({
          gateway_payment_id: razorpayPaymentId,
          status: 'completed',
          gateway_response: {
            razorpay_payment_id: razorpayPaymentId,
            razorpay_order_id: razorpayOrderId,
            razorpay_signature: razorpaySignature
          }
        })
        .eq('id', orderId)
        .select()
        .single()

      if (error) {
        console.error('Error updating payment:', error)
        throw new Error('Failed to update payment status')
      }

      // Update order status if payment is linked to an order
      if (payment.order_id) {
        await supabase
          .from('orders')
          .update({
            payment_status: 'paid',
            status: 'processing'
          })
          .eq('id', payment.order_id)
      }

      return new Response(
        JSON.stringify({
          verified: true,
          paymentId: payment.id,
          message: 'Payment verified successfully'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    } else {
      // Update payment status as failed
      await supabase
        .from('payments')
        .update({
          status: 'failed',
          gateway_response: {
            razorpay_payment_id: razorpayPaymentId,
            razorpay_order_id: razorpayOrderId,
            razorpay_signature: razorpaySignature,
            verification_failed: true
          }
        })
        .eq('id', orderId)

      return new Response(
        JSON.stringify({
          verified: false,
          message: 'Payment verification failed'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      )
    }
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
