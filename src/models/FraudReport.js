const mongoose = require('mongoose');

const fraudReportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  },

  // Fraud details
  reportType: {
    type: String,
    enum: [
      'fake_listing',
      'multiple_collection',
      'price_fraud',
      'identity_theft',
      'general_scam'
    ],
    required: true
  },

  description: { type: String, required: true },

  evidenceFiles: [{ type: String }],

  status: {
    type: String,
    enum: ['pending', 'reviewed', 'blacklisted'],
    default: 'pending'
  },

  adminNote: { type: String },

  createdAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date }
});

module.exports = mongoose.model('FraudReport', fraudReportSchema);
