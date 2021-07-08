const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  user: String,
  user_type: String,
  active: Boolean,
  device: String,
  createdAt: Date,
  updatedAt: Date,
});

const Sessions = mongoose.model('Sessions', sessionSchema);

module.exports = { Sessions, sessionSchema };
