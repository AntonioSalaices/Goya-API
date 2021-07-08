const mongoose = require('mongoose');

const tokensSchema = mongoose.Schema({
  token: String,
  email: String,
  phone: Number,
  used: Boolean,
  createdAt: Date,
});

const Tokens = mongoose.model('Tokens', tokensSchema);

module.exports = { Tokens, tokensSchema };
