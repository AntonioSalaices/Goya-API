const express = require('express');
const routeHandler = require('./routeHandler');
const authController = require('../controllers/authController');
const language = require('../utils/i18n/auth.json');
const multer  = require('multer')
const { Contacts } = require('../models/contactsModel');
const LR = language.routes;
const router = express.Router();
let storage = multer.diskStorage({
    destination:`uploads`,
    filename: function(req, file, callback){
        const filedoc = file.originalname.replace(/\s/g, "-");
        callback(null, filedoc)
    }
});
let upload = multer({storage:storage});
// guardar un contacto
router.post('/save-contact',upload.fields([{name: "file",maxCount: 1}, {name: "logo", maxCount: 1}]), async (req, res) => {
    console.log("la data es:",req.body.number);
    console.log('El archivo es:', req.files)
    
    const documento1 = req.files.file[0].filename;
    const documento2 = req.files.logo[0].filename;
    const filefine = documento1.replace(/\s/g, "-");
    const filelogo = documento2.replace(/\s/g, "-");
    const selectedLanguage = req.headers.language || 'en';

    const newUser = new Contacts({
      name: req.body.name,
      number: req.body.number,
      menu: filefine,
      logo: filelogo,
      createdAt: new Date(),
    });  

    const data = {
      name: req.body.name,
      number: req.body.number,
      menu: req.body.menu,
      logo: req.body.logo
    };

    const createdContact = await newUser.save();

    res.send({ isValid: true, data: createdContact, message: 'Restaurante registrado correctamente' });
});

// comprobar disponibilidad de servidor
router.get('/check-server-availability', async (req, res) => {
  routeHandler({
    req,
    res,
    action: authController.checkServerAvailability,
    errorLabel: LR.checkServerAvailability
  });
});

// login de usuarios
router.post('/login', async (req, res) => {
  routeHandler({
    req,
    res,
    action: authController.userLogin,
    errorLabel: LR.userLogin
  });
});

// login de backoffice usuarios
router.post('/login/backoffice', async (req, res) => {
  routeHandler({
    req,
    res,
    action: authController.backofficeUserLogin,
    errorLabel: LR.backofficeUserLogin
  });
});

// obtener sesiones
router.get('/sessions', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: authController.getSessions,
    errorLabel: LR.getSessions
  });
});

router.get('/restaurantes', async (req, res) => {
  routeHandler({
    req,
    res,
    action: authController.getRestaurantes,
    errorLabel: LR.getRestaurantes
  });
});

// obtener sesion por ID
router.get('/sessions/by-id/:id', async (req, res) => {
  routeHandler({
    req,
    res,
    action: authController.getSessionByID,
    errorLabel: LR.getSessionByID
  });
});

// obtener sesion por dispositivo
router.get('/sessions/by-device/:device', async (req, res) => {
  routeHandler({
    req,
    res,
    action: authController.getSessionByDevice,
    errorLabel: LR.getSessionByDevice
  });
});

// logout sesiones
router.post('/logout', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: authController.deleteSession,
    errorLabel: LR.deleteSession
  });
});


module.exports = router;
