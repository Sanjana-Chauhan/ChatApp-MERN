const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // nickname or user ID
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  room: { type: String, default: 'general' } // For future group chats
});

module.exports = mongoose.model('Message', messageSchema);