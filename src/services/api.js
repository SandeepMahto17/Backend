const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://front-chi-puce.vercel.app',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const paymentService = {
  async processPayment(vendorEmail, amount) {
    try {
      const response = await fetch(`${API_BASE_URL}/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({
          vendor_email: vendorEmail,
          dollar_amount: amount
        }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Payment processing failed');
    }
  },

  async getSolanaPrice() {
    try {
      const response = await fetch(`${API_BASE_URL}/solana-price`, {
        method: 'GET',
        headers: {
          ...corsHeaders,
        },
      });
      const data = await response.json();
      return data.price;
    } catch (error) {
      throw new Error('Failed to fetch Solana price');
    }
  },

  async verifySolanaTransaction(signature) {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({ signature }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Transaction verification failed');
    }
  },
};

// Handle preflight requests
export async function handleOptionsRequest(req, res) {
  res.set(corsHeaders);
  res.status(200).end();
}