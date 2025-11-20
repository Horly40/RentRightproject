const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

// =========================
// IMPORT ROUTES
// =========================
const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/Listings');
const verificationRoutes = require('./routes/verification');

const app = express();

// =========================
// MIDDLEWARES
// =========================
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/verification', verificationRoutes);

// =========================
// ROUTES
// =========================
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('RentRight Backend Running ✔️');
});

// =========================
// DATABASE CONNECTION
// =========================
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected ✔️');
    
    // Start server after DB connects
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB Connection Error ❌', err);
    process.exit(1);
  });
