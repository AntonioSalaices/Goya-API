const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  // personal data
  first_name: String,
  last_name: String,
  email: String,
  account_number: String,
  // account data
  type: String,
  uniqueLoad: Boolean,
  password: String,
  createdAt: Date,
  updatedAt: Date,
});

const Users = mongoose.model('Users', userSchema);

module.exports = { Users, userSchema };
