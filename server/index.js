require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const contactRoutes = require('./routes/contact');
const dataRoutes    = require('./routes/data');
const adminRoutes   = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/data',    dataRoutes);
app.use('/api/admin',   adminRoutes);

app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', message: 'Portfolio API running', time: new Date() })
);

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.log('⚠️  MongoDB not connected:', err.message));
}

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
