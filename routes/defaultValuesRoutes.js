const express = require('express');
const defaultController = require('../controllers/defaultValuesController');
const routeHandler = require('./routeHandler');
const language = require('../utils/i18n/defaultValues.json');

const LR = language.routes;
const router = express.Router();

router.get('/', async (req, res) => {
  routeHandler({
    req,
    res,
    action: defaultController.getDefaultValues,
    authRequired: true,
    errorLabel: LR.getDefaultValues[req.headers.language || 'en']
  });
});

router.post('/', async (req, res) => {
  routeHandler({
    req,
    res,
    action: defaultController.saveDefaultValues,
    authRequired: true,
    errorLabel: LR.saveDefaultValues[req.headers.language || 'en']
  });
});

router.put('/:id', async (req, res) => {
  routeHandler({
    req,
    res,
    action: defaultController.updateDefaultValues,
    authRequired: true,
    errorLabel: LR.updateDefaultValues[req.headers.language || 'en']
  });
});

router.delete('/:id', async (req, res) => {
  routeHandler({
    req,
    res,
    action: defaultController.removeDefaultValues,
    authRequired: true,
    errorLabel: LR.removeDefaultValues[req.headers.language || 'en']
  });
});


module.exports = router;
