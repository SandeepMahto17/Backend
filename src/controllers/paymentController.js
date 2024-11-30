const paypal = require('@paypal/payouts-sdk');
const { Connection, PublicKey } = require('@solana/web3.js');
const { v4: uuidv4 } = require('uuid');
const client = require('../config/paypal');

// Initialize Solana connection
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

exports.getSolanaPrice = async (req, res) => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    const data = await response.json();
    res.json({ price: data.solana.usd });
  } catch (error) {
    console.error('Solana price fetch error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to fetch Solana price',
      error: error.message 
    });
  }
};

exports.verifySolanaTransaction = async (req, res) => {
  try {
    const { signature } = req.body;
    
    if (!signature) {
      return res.status(400).json({
        status: 'error',
        message: 'Transaction signature is required'
      });
    }

    const transaction = await connection.getTransaction(signature);
    
    if (!transaction) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Transaction not found' 
      });
    }

    res.json({
      status: 'success',
      transaction: transaction
    });
  } catch (error) {
    console.error('Transaction verification error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to verify transaction',
      error: error.message 
    });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { vendor_email, dollar_amount } = req.body;

    if (!vendor_email || !dollar_amount) {
      return res.status(400).json({
        status: 'error',
        message: 'Vendor email and dollar amount are required'
      });
    }

    const unique_batch_id = uuidv4();

    let request = new paypal.payouts.PayoutsPostRequest();
    request.requestBody({
      sender_batch_header: {
        sender_batch_id: unique_batch_id,
        email_subject: "You have received a payment!"
      },
      items: [{
        recipient_type: "EMAIL",
        amount: {
          value: dollar_amount,
          currency: "USD"
        },
        receiver: vendor_email,
        note: "Payment processed via Solana",
        sender_item_id: "Item_" + unique_batch_id
      }]
    });

    const response = await client.execute(request);
    
    return res.json({
      status: 'success',
      payout_batch_id: response.result.batch_header.payout_batch_id
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    return res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
};