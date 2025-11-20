console.log("MESSAGE.JS FILE EXECUTED");
const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  sendMessage,
  getConversation
} = require('../controllers/messageController');

// Send message
router.post('/send', auth, sendMessage);

// Get conversation
router.get('/:listingId/:userId', auth, getConversation);

module.exports = router;
