const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Contact  = require('../models/Contact');
const { sendContactNotification, sendAutoReply } = require('../services/email');
const { requireAuth } = require('../middleware/auth');

// POST /api/contact — public: receive a message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message)
      return res.status(400).json({ success: false, error: 'All fields are required.' });

    // Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      const contact = new Contact({ name, email, subject, message });
      await contact.save();
    }

    // Send notification email to Adhfar (non-blocking)
    sendContactNotification({ name, email, subject, message })
      .catch(err => console.error('Email error:', err.message));

    // Send auto-reply to the visitor (non-blocking)
    sendAutoReply({ name, email })
      .catch(err => console.error('Auto-reply error:', err.message));

    console.log(`📧 New contact: ${name} <${email}> — "${subject}"`);
    res.json({ success: true, message: 'Message received! I will get back to you soon.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error. Please try again.' });
  }
});

// GET /api/contact — protected: list all messages for admin
router.get('/', requireAuth, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1)
      return res.json({ messages: [], note: 'MongoDB not connected — messages not persisted' });
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ messages, total: messages.length });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/contact/:id — protected: delete a message
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/contact/:id/read — protected: mark as read
router.patch('/:id/read', requireAuth, async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
