const Message = require('../models/Message');
const Listing = require('../models/Listing');
const User = require('../models/User');

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { listingId, receiverId, text } = req.body;

    const message = new Message({
      listing: listingId,
      sender: req.user._id,
      receiver: receiverId,
      text
    });

    await message.save();

    res.status(201).json({
      message: "Message sent",
      data: message
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get conversation
exports.getConversation = async (req, res) => {
  try {
    const { listingId, userId } = req.params;

    const messages = await Message.find({
      listing: listingId,
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort({ sentAt: 1 });

    res.json(messages);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
