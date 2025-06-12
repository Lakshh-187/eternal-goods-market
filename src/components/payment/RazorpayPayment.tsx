
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface RazorpayPaymentProps {
  amount: number;
  orderId?: string;
  onSuccess: (paymentData: any) => void;
  onError: (error: any) => void;
  disabled?: boolean;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({
  amount,
  orderId,
  onSuccess,
  onError,
  disabled = false
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async () => {
    try {
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Razorpay expects amount in paise
          currency: 'INR',
          orderId: orderId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!user) {
      setError('Please login to make a payment');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      // Create order on backend
      const orderData = await createRazorpayOrder();

      // Configure Razorpay options
      const options = {
        key: 'rzp_test_Ysbma1ySF1JiMS', // Razorpay key ID
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Your Store Name',
        description: 'Payment for your order',
        order_id: orderData.razorpayOrderId,
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verificationResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: orderData.orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verificationResponse.ok) {
              throw new Error('Payment verification failed');
            }

            const verificationData = await verificationResponse.json();
            
            // Record payment in database
            await supabase.from('payments').insert({
              order_id: orderId,
              gateway_payment_id: response.razorpay_payment_id,
              gateway_order_id: response.razorpay_order_id,
              amount: amount,
              status: 'completed',
              payment_method: 'razorpay',
              gateway_response: response
            });

            onSuccess({
              ...response,
              orderId: orderData.orderId,
              verified: verificationData.verified
            });
          } catch (error) {
            console.error('Payment verification error:', error);
            onError(error);
          }
        },
        prefill: {
          name: user.user_metadata?.first_name || user.email,
          email: user.email,
        },
        theme: {
          color: '#7c3aed',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.');
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-semibold">₹{amount.toFixed(2)}</span>
          </div>
          {orderId && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Order ID:</span>
              <span>{orderId}</span>
            </div>
          )}
        </div>

        <Button
          onClick={handlePayment}
          disabled={disabled || loading || !user}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ₹{amount.toFixed(2)}
            </>
          )}
        </Button>

        {!user && (
          <p className="text-sm text-gray-600 text-center">
            Please login to make a payment
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RazorpayPayment;
