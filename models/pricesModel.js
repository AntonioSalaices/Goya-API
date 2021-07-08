const mongoose = require('mongoose');

const pricesSchema = mongoose.Schema({
  reportID: String,
  data_category: String,
  type_cattle: String,
  type_sale_delivery_period: Object,
  schedule: String,
  frequency: String,
  // --
  primal: String,
  sub_primal: String,
  grade: String,
  fob_plant: String,
  number_trades: Number,
  total_pounds: Number,
  price_range_low: Number,
  price_range_high: Number,
  weighted_average: Number,
  // --
  date: Date
});

const Prices = mongoose.model('Prices', pricesSchema);

module.exports = { Prices, pricesSchema };
