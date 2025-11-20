const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },

  // GEO DATA
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true   // [longitude, latitude]
    }
  },

  price: { type: Number, required: true },
  bedrooms: { type: Number },
  bathrooms: { type: Number },

  propertyType: {
    type: String,
    enum: ['self_contain', 'flat', 'bungalow', 'duplex', 'studio', 'single_room'],
    required: true
  },

  images: [{ type: String }], // image URLs

  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  verified: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

// Enable geospatial indexing
listingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Listing', listingSchema);
