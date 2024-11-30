const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';


export const paymentService = {
  async processPayment(vendorEmail, amount) {
    try {
      const response = await fetch(`${API_BASE_URL}/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      const response = await fetch(`${API_BASE_URL}/solana-price`);
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
        },
        body: JSON.stringify({ signature }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Transaction verification failed');
    }
  }
};