
import React from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface RazorpayPaymentProps {
  amount: number;
  productName: string;
  productId: string;
  quantity?: number;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({
  amount,
  productName,
  productId,
  quantity = 1,
  disabled = false,
  className = '',
  children
}) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make a purchase",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          amount: Math.round(amount * 100), // Convert to paise
          currency: 'INR',
          productName,
          productId,
          quantity,
        },
      });

      if (error) throw error;

      const options = {
        key: 'rzp_test_Ysbma1ySF1JiMS',
        amount: data.amount,
        currency: data.currency,
        name: 'Eternal Impact Store',
        description: `Purchase of ${productName}`,
        order_id: data.id,
        handler: async function (response: any) {
          try {
            const { error: verifyError } = await supabase.functions.invoke('verify-payment', {
              body: {
                orderId: data.paymentId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
            });

            if (verifyError) throw verifyError;

            toast({
              title: "Payment Successful!",
              description: "Your order has been placed successfully.",
            });

            // Redirect to success page or refresh
            window.location.href = '/';
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support if money was deducted.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: user.user_metadata?.full_name || '',
          email: user.email,
        },
        theme: {
          color: '#7C3AED',
        },
      };

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          const rzp = new window.Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      } else {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={className} onClick={disabled ? undefined : handlePayment}>
      {children}
    </div>
  );
};

// Declare Razorpay on window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default RazorpayPayment;
