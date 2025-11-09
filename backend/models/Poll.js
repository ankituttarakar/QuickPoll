const mongoose = require('mongoose');

// This schema defines a single answer option
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

// This is the main schema for the entire poll
const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [optionSchema],
  
  // A unique, short ID like 'A7b_xL0p' for easy sharing
  shortId: {
    type: String,
    required: true,
    unique: true,
  },

  // --- NEW FEATURES ---
  
  // true = checkboxes, false = radio buttons
  multipleAnswers: {
    type: Boolean,
    default: false,
  },
  
  // A date when the poll will automatically close
  expiresAt: {
    type: Date,
    default: null, // null means it never expires
  },

  // An array of hashed IP addresses to prevent repeat votes
  votedIPs: {
    type: [String],
    default: [],
  },
  // --- END NEW FEATURES ---

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Poll', pollSchema);