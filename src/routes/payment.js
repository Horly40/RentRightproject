const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  initializePayment,
  releaseEscrow,
  refundTenant
} = require('../controllers/paymentController');

// Initialize escrow payment (tenant)
router.post('/initialize', auth, initializePayment);

// Tenant confirms move-in → release escrow
router.put('/release', auth, releaseEscrow);

// Admin refund
router.put('/refund', auth, refundTenant);

module.exports = router;
