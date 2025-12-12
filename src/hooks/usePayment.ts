import { useState } from 'react';

export type PaymentMethod = 'mobile_money' | 'card' | 'wallet' | 'cod' | 'whatsapp';

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (method: PaymentMethod, amount: number, details: any): Promise<PaymentResult> => {
    setIsProcessing(true);
    setError(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsProcessing(false);
        
        if (method === 'whatsapp') {
             resolve({ success: true, transactionId: 'wa-' + Date.now() });
             return;
        }

        // Mock failure for testing? No, user wants success flow simulation.
        // Randomly fail? No, reliable demo.
        
        // Mock validation
        if (method === 'card' && !details.cardNumber) {
             const err = "Invalid card details";
             setError(err);
             resolve({ success: false, error: err });
             return;
        }
        
        if (method === 'mobile_money' && !details.phone) {
             const err = "Phone number required";
             setError(err);
             resolve({ success: false, error: err });
             return;
        }

        resolve({ success: true, transactionId: 'tx-' + Math.random().toString(36).substr(2, 9) });
      }, 2000);
    });
  };

  return { processPayment, isProcessing, error };
};
