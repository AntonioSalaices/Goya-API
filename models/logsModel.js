const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
  route: String,
  error: String,
  data: Object,
  createdAt: Date
});

const Logs = mongoose.model('Logs', logSchema);

module.exports = { Logs, logSchema };
