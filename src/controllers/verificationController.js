const Verification = require('../models/Verification');
const User = require('../models/User');

// Submit verification documents
exports.submitVerification = async (req, res) => {
  try {
    const landlordId = req.user._id;

    // Only landlords can submit
    if (req.user.role !== 'landlord')
      return res.status(403).json({ message: 'Only landlords can submit verification documents' });

    const { idCard, utilityBill, passportPhoto } = req.files;

    if (!idCard || !utilityBill || !passportPhoto)
      return res.status(400).json({ message: 'All files are required' });

    const verification = new Verification({
      landlord: landlordId,
      idCard: idCard[0].path,
      utilityBill: utilityBill[0].path,
      passportPhoto: passportPhoto[0].path
    });

    await verification.save();
    res.status(201).json({ message: 'Verification submitted successfully', verification });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ADMIN — Approve
exports.approveVerification = async (req, res) => {
  try {
    // Only admin access
    if (req.user.role !== 'admin')
      return res.status(403).json({ message: 'Admin only' });

    const verification = await Verification.findById(req.params.id);
    if (!verification)
      return res.status(404).json({ message: 'Verification not found' });

    verification.status = 'approved';
    verification.adminNote = req.body.adminNote || '';
    verification.reviewedAt = new Date();
    await verification.save();

    // Update landlord in User model
    await User.findByIdAndUpdate(verification.landlord, { verified: true });

    res.json({ message: 'Verification approved', verification });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ADMIN — Reject
exports.rejectVerification = async (req, res) => {
  try {
    if (req.user.role !== 'admin')
      return res.status(403).json({ message: 'Admin only' });

    const verification = await Verification.findById(req.params.id);
    if (!verification)
      return res.status(404).json({ message: 'Verification not found' });

    verification.status = 'rejected';
    verification.adminNote = req.body.adminNote || '';
    verification.reviewedAt = new Date();
    await verification.save();

    res.json({ message: 'Verification rejected', verification });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
