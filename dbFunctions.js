// dbFunctions.js
// Plain-JSON persistence (no database server required)

const fs   = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'users.json');

// ---------- low-level helpers ----------
async function loadDb () {
  try {
    const str = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(str);
  } catch (err) {
    if (err.code === 'ENOENT') {          // first run ➜ create file/folder
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, '[]');
      return [];
    }
    throw err;
  }
}

async function saveDb (users) {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

// ---------- public API (same surface as before) ----------
async function writeUser (data) {
  const users = await loadDb();

  const idx = users.findIndex(u => u.userId === data.userId);
  const now = new Date().toISOString();

  if (idx !== -1) {
    users[idx] = { ...users[idx], ...data, updatedAt: now };
  } else {
    users.push({ ...data, createdAt: now, updatedAt: now });
  }
  await saveDb(users);
  return data;
}

async function readUser (userId) {
  const users = await loadDb();
  return users.find(u => u.userId === userId) || null;
}

module.exports = { writeUser, readUser };
