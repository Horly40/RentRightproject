const FraudReport = require('../models/FraudReport');
const User = require('../models/User');

// Submit fraud report
exports.submitFraudReport = async (req, res) => {
  try {
    const reporterId = req.user._id;

    const { agent, listing, reportType, description } = req.body;

    const evidenceFiles = req.files?.evidence?.map(file => file.path) || [];

    const report = new FraudReport({
      reporter: reporterId,
      agent,
      listing,
      reportType,
      description,
      evidenceFiles
    });

    await report.save();

    res.status(201).json({
      message: 'Fraud report submitted successfully',
      report
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin reviews and blacklists agent
exports.blacklistAgent = async (req, res) => {
  try {
    if (req.user.role !== 'admin')
      return res.status(403).json({ message: 'Admin only' });

    const reportId = req.params.id;

    const report = await FraudReport.findById(reportId);
    if (!report)
      return res.status(404).json({ message: 'Report not found' });

    report.status = 'blacklisted';
    report.adminNote = req.body.adminNote || '';
    report.reviewedAt = new Date();
    await report.save();

    // Set agent's verified to false and mark as blacklisted
    await User.findByIdAndUpdate(report.agent, {
      verified: false,
      role: 'blacklisted_agent'
    });

    res.json({
      message: 'Agent blacklisted successfully',
      report
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
