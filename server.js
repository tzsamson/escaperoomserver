require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { writeUser, readUser } = require('./dbFunctions');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/user', async (req, res) => {
  try {
    const saved = await writeUser(req.body);
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const user = await readUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// append a score entry and update counters
app.post('/user/:id/score', async (req,res) => {
  try {
    const { level, score } = req.body;
    const user = await readUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.scores.push({ level, score });
    user.levelsPlayed = new Set(user.scores.map(s => s.level)).size;
    await user.save();
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// patch for gameState & badges
app.patch('/user/:id', async (req,res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { userId: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`API listening on port ${process.env.PORT || 3000}`);
});