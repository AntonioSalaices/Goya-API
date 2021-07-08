const mongoose = require('mongoose');

const defaultValuesSchema = mongoose.Schema({
  user: String,
  name: String,
  meat: String,
  type: String,
  data: Object,
  createdAt: Date,
  removed: Boolean
});

const DefaultValues = mongoose.model('DefaultValues', defaultValuesSchema);

module.exports = { DefaultValues, defaultValuesSchema };
