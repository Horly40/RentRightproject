const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Listing = require('../models/Listing');
require('dotenv').config();

// Tenant initializes escrow payment
exports.initializePayment = async (req, res) => {
  try {
    const tenant = req.user;
    const { listingId, amount } = req.body;

    const listing = await Listing.findById(listingId).populate('landlord');

    if (!listing)
      return res.status(404).json({ message: 'Listing not found' });

    const landlord = listing.landlord;

    if (!landlord)
      return res.status(404).json({ message: 'Landlord not found' });

    const reference = uuidv4();

    // Save payment record before calling Paystack
    const payment = new Payment({
      reference,
      tenant: tenant._id,
      landlord: landlord._id,
      listing: listingId,
      amount
    });

    await payment.save();

    // Call Paystack
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: tenant.email,
        amount: amount * 100, // Paystack takes amount in kobo
        reference
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    res.json({
      message: 'Payment initialized',
      authorization_url: response.data.data.authorization_url,
      reference
    });

  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Release funds from escrow to landlord
exports.releaseEscrow = async (req, res) => {
  try {
    const { reference } = req.body;

    const payment = await Payment.findOne({ reference });
    if (!payment)
      return res.status(404).json({ message: 'Payment not found' });

    if (payment.status !== 'paid')
      return res.status(400).json({ message: 'Payment is not completed yet' });

    payment.status = 'released';
    payment.updatedAt = new Date();
    await payment.save();

    res.json({ message: 'Escrow released to landlord', payment });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN refunds tenant
exports.refundTenant = async (req, res) => {
  try {
    if (req.user.role !== 'admin')
      return res.status(403).json({ message: 'Admin only' });

    const { reference } = req.body;

    const payment = await Payment.findOne({ reference });
    if (!payment)
      return res.status(404).json({ message: 'Payment not found' });

    payment.status = 'refunded';
    payment.updatedAt = new Date();
    await payment.save();

    res.json({ message: 'Payment refunded to tenant', payment });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
