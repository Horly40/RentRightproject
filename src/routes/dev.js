const router = require('express').Router();
const Payment = require('../models/Payment');

// TEMPORARY: list all payments
router.get('/payments', async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

// TEMPORARY: mark payment as "paid"
router.put('/payments/:reference/mark-paid', async (req, res) => {
  const { reference } = req.params;

  const payment = await Payment.findOne({ reference });

  if (!payment) return res.status(404).json({ message: "Payment not found" });

  payment.status = "paid";
  payment.updatedAt = new Date();
  await payment.save();

  res.json({
    message: "Payment manually marked as paid (DEV MODE)",
    payment
  });
});

module.exports = router;
