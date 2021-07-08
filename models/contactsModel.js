const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: String,
  number: String,
  menu: String,
  logo: String,
  createdAt: Date
});

const Contacts = mongoose.model('Contacts', contactSchema);

module.exports = { Contacts, contactSchema };
