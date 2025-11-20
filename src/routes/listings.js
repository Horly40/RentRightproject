const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createListing,
  getAllListings,
  getListingById,
  searchListings
} = require('../controllers/listingController');

// Create listing (landlords only)
router.post('/create', auth, createListing);

// Get all listings
router.get('/', getAllListings);

// Get one listing
router.get('/:id', getListingById);

// Advanced search
router.get('/search/filter', searchListings);

module.exports = router;
