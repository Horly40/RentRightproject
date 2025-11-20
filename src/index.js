const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

// ROUTE IMPORTS
const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listing');
const verificationRoutes = require('./routes/verification');
const fraudRoutes = require('./routes/fraud');
const paymentRoutes = require('./routes/payment');
const devRoutes = require('./routes/dev');
const messageRoutes = require('./routes/message');

const app = express();

// MIDDLEWARES
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ⭐ REGISTER ROUTES IN PROPER ORDER
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/messages', messageRoutes);   // <-- ⭐ MOVE UP HERE
app.use('/api/verification', verificationRoutes);
app.use('/api/fraud', fraudRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/dev', devRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('RentRight Backend Running ✔️');
});

// DB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected ✔️');
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB Connection Error ❌', err);
  process.exit(1);
});
