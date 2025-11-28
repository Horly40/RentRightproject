const Listing = require('../models/Listing');

// CREATE NEW LISTING
exports.createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      price,
      bedrooms,
      bathrooms,
      propertyType,
      longitude,
      latitude,
      images
    } = req.body;

    // Only landlords allowed
    if (req.user.role !== 'landlord')
  return res.status(403).json({ message: 'Only landlords can create listings' });

    if (!req.user.verified)
  return res.status(401).json({ message: 'Landlord is not verified yet' });


    if (!longitude || !latitude)
      return res.status(400).json({ message: 'Geolocation required (longitude & latitude)' });

    const listing = new Listing({
      title,
      description,
      address,
      price,
      bedrooms,
      bathrooms,
      propertyType,
      images,
      landlord: req.user._id,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    });

    await listing.save();
    res.status(201).json({ message: 'Listing created successfully', listing });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ALL LISTINGS
exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('landlord', 'name email phone');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET SINGLE LISTING
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('landlord', 'name email phone');
    if (!listing)
      return res.status(404).json({ message: 'Listing not found' });

    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// SEARCH LISTINGS WITH FILTERS
exports.searchListings = async (req, res) => {
  try {
    const { minPrice, maxPrice, bedrooms, propertyType, longitude, latitude, radius } = req.query;

    const query = {};

    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
    if (bedrooms) query.bedrooms = bedrooms;
    if (propertyType) query.propertyType = propertyType;

    // GEO FILTER
    if (longitude && latitude && radius) {
      query.location = {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius / 6378.1] // Earth radius in km
        }
      };
    }

    const listings = await Listing.find(query);
    res.json(listings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
