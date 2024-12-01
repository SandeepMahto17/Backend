// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const paymentRoutes = require('./routes/paymentRoutes');

// const app = express();

// // Middleware
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: 'true',
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Welcome route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to Solana Payment API' });
// });

// // Routes - Make sure to use /api prefix
// app.use('/api', paymentRoutes);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     status: 'error',
//     message: `Cannot ${req.method} ${req.url}`
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     status: 'error',
//     message: 'Something went wrong!',
//     error: err.message
//   });
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });