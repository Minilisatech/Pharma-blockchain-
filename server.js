const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/pharma-blockchain', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ── Schemas & Models ─────────────────────────────────────────────────────────

const LogSchema = new mongoose.Schema({
  batchId:   { type: String, required: true },
  actor:     { type: String, required: true },
  action:    { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const TrackSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true },
  location:     { type: String, required: true },
  date:         { type: Date, required: true },
  timestamp:    { type: Date, default: Date.now }
});

const Log   = mongoose.model('Log',   LogSchema);
const Track = mongoose.model('Track', TrackSchema);

// ── Routes ────────────────────────────────────────────────────────────────────

// Record a blockchain log entry
app.post('/api/log', async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.json({ status: 'Recorded Successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Retrieve all log entries
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update the supply chain tracker
app.post('/api/track', async (req, res) => {
  try {
    const entry = new Track(req.body);
    await entry.save();
    res.json({ status: 'Tracker Updated Successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Verify a drug by hash / serial number
app.get('/api/verify/:hash', async (req, res) => {
  try {
    const record = await Track.findOne({ serialNumber: req.params.hash });
    res.json({ valid: !!record, record: record || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Start Server ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
