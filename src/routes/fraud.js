const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  submitFraudReport,
  blacklistAgent
} = require('../controllers/fraudController');

// Tenant submits fraud report
router.post(
  '/report',
  auth,
  upload.fields([{ name: 'evidence', maxCount: 5 }]),
  submitFraudReport
);

// Admin blacklists agent
router.put('/:id/blacklist', auth, blacklistAgent);

module.exports = router;
