const express = require('express');
const router  = express.Router();
const { signToken, requireAuth } = require('../middleware/auth');

// POST /api/admin/login — check password, return JWT
router.post('/login', (req, res) => {
  const { password } = req.body;
 const correct = process.env.ADMIN_PASSWORD;

  if (password !== correct)
    return res.status(401).json({ error: 'Wrong password' });

  const token = signToken();
  res.json({ token });
});

// GET /api/admin/verify — check if token is still valid
router.get('/verify', requireAuth, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;
