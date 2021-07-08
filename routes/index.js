const usersRoutes = require('./usersRoutes');
const authRoutes = require('./authRoutes');
const favoritesRoutes = require('./favoriteRoutes');
const defaultValuesRoutes = require('./defaultValuesRoutes');

module.exports = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/favorites', favoritesRoutes);
  app.use('/api/default-values', defaultValuesRoutes);
};
