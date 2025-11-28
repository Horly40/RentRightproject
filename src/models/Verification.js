const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // KYC files
  idCard: { type: String, required: true },
  utilityBill: { type: String, required: true },
  passportPhoto: { type: String, required: true },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  adminNote: { type: String },

  createdAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date }
});

module.exports = mongoose.model('Verification', verificationSchema);
