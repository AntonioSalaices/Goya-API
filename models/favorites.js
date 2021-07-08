const mongoose = require('mongoose');

const favoritesSchema = mongoose.Schema({
  user: String,
  order: String,
  status: String,
  price: String,
  place: String,
  user_attend: String,
  createdAt: Date,
});

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = { Favorites, favoritesSchema };
