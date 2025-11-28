const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  submitVerification,
  approveVerification,
  rejectVerification
} = require('../controllers/verificationController');

// Landlord submits verification
router.post(
  '/submit',
  auth,
  upload.fields([
    { name: 'idCard', maxCount: 1 },
    { name: 'utilityBill', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 }
  ]),
  submitVerification
);

// Admin approval
router.put('/:id/approve', auth, approveVerification);

// Admin rejection
router.put('/:id/reject', auth, rejectVerification);

module.exports = router;
