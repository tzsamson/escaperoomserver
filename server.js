require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const { writeUser, readUser } = require('./dbFunctions');

const app = express();

app.use(cors());
app.use(express.json());

// --------------------- CRUD ---------------------
app.post('/user', async (req, res) => {
  try {
    const saved = await writeUser(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const user = await readUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/user/:id/score', async (req, res) => {
  try {
    const { level, score } = req.body;

    const user = await readUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.scores    = user.scores || [];
    user.scores.push({ level, score });

    user.levelsPlayed = [...new Set(user.scores.map(s => s.level))].length;
    const saved = await writeUser(user);

    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/user/:id', async (req, res) => {
  try {
    const user = await readUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    Object.assign(user, req.body);
    const saved = await writeUser(user);

    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`API listening on ${process.env.PORT || 3000}`)
);
