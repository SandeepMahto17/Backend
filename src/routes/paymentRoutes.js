const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Payment API is working!' });
});

// Process payment route
router.post('/process-payment', paymentController.processPayment);

// Get Solana price route
router.get('/solana-price', paymentController.getSolanaPrice);

// Verify Solana transaction
router.post('/verify-transaction', paymentController.verifySolanaTransaction);

module.exports = router;