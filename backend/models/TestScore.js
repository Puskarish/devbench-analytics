const mongoose = require('mongoose');

const testScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: String, required: true },
  score: { type: Number, required: true },
  totalPossible: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('TestScore', testScoreSchema);
