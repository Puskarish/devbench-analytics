const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  isFree: { type: Boolean, default: false },
  questionsCount: { type: Number, required: true },
  questions: [{
    id: Number,
    text: String,
    options: [String],
    correctAnswer: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);
