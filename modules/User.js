const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  level: { type: String, required: true },
  score: { type: Number, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  scores: [scoreSchema],
  gameState: mongoose.Schema.Types.Mixed,   // raw JSON snapshot
  badges:  [String],
  levelsPlayed: { type: Number, default: 0 },
  roomsPlayed:  { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);