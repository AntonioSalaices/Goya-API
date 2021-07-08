const express = require('express');
const favoritesController = require('../controllers/favoritesController');
const routeHandler = require('./routeHandler');
const language = require('../utils/i18n/reports.json');

const LR = language.routes;
const router = express.Router();

router.get('/', async (req, res) => {
  routeHandler({
    req,
    res,
    action: favoritesController.getFavorites,
    authRequired: true,
    errorLabel: LR.importData[req.headers.language || 'en']
  });
});
router.get('/attended', async (req, res) => {
  routeHandler({
    req,
    res,
    action: favoritesController.getFavoritesAttended,
    authRequired: true,
    errorLabel: LR.importData[req.headers.language || 'en']
  });
});

router.get('/all', async (req, res) => {
  routeHandler({
    req,
    res,
    action: favoritesController.getAllFavorites,
    authRequired: true,
    errorLabel: LR.importData[req.headers.language || 'en']
  });
});

router.post('/', async (req, res) => {
  routeHandler({
    req,
    res,
    action: favoritesController.saveFavorites,
    errorLabel: LR.importData[req.headers.language || 'en']
  });
});

router.put('/:id', async (req, res) => {
  routeHandler({
    req,
    res,
    action: favoritesController.updateFavorite,
    authRequired: true,
    errorLabel: LR.importData[req.headers.language || 'en']
  });
});

router.delete('/:id', async (req, res) => {
  routeHandler({
    req, 
    res,
    action: favoritesController.removeFavorite,
    authRequired: true,
    errorLabel: LR.importData[req.headers.language || 'en']
  });
});

router.post('/move', async (req, res) => {
  routeHandler({
    req,
    res,
    action: favoritesController.moveFavorite,
    authRequired: true,
    errorLabel: LR.importData[req.headers.language || 'en']
  });
});
 

module.exports = router;
