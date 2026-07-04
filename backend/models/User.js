const mongoose = require('mongoose');

// Define the shape of our User data
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  unlockedTests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test'
  }]
}, { timestamps: true });

// Compile the schema into a model
const User = mongoose.model('User', userSchema);

module.exports = User;
