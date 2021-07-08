const express = require('express');
const usersController = require('../controllers/usersController');
const routeHandler = require('./routeHandler');
const language = require('../utils/i18n/user.json');

const LR = language.routes;
const router = express.Router();

// modificar modulos de un usuario
router.post('/modify-modules', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.modifyModulesUser,
    errorLabel: LR.modifyModulesUser
  });
});

// degradar un usuario
router.post('/downgrade', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.downgradeUser,
    errorLabel: LR.downgradeUser
  });
});

// cancelar un usuario y sus miembros
router.post('/cancel', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.cancelUser,
    errorLabel: LR.cancelUser
  });
});

// actualizar un usuario
router.post('/upgrade', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.upgradeUser,
    errorLabel: LR.upgradeUser
  });
});

// Obtener lista de usuarios miembros
router.get('/members/:adminID', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.getMembers,
    errorLabel: LR.getMembers
  });
});

// assignar la contraseña de un usuario miembro
router.post('/assign-password', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.assignPassword,
    errorLabel: LR.assignPassword
  });
});

// guardar un nuevo miembro
router.post('/save-member', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.saveMember,
    errorLabel: LR.saveMember
  });
});

// verificacion de correo
router.post('/send-verify-email', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.sendVerifyEmail,
    errorLabel: LR.sendVerifyEmail
  });
});

// verificacion de teléfono
router.post('/send-verify-sms', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.sendVerifySMS,
    errorLabel: LR.sendVerifyEmail
  });
});

router.post('/send-recovery-sms', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.sendRecoverySMS,
    errorLabel: LR.sendVerifyEmail
  });
});

// consultar planes de membresias
router.get('/memberships-plans', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.getMembershipPlans,
    errorLabel: LR.getMembershipPlans
  });
});

// obtener todos los usuarios
router.get('/', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.getUsers,
    authRequired: true,
    errorLabel: LR.getUsers
  });
});

router.get('/by-name/:searchText', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.getUsersByName,
    authRequired: true,
    errorLabel: LR.getUsersByName
  });
});

router.get('/by-session/:session', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.getUserBySession,
    errorLabel: LR.getUsersByName
  });
});

// obtener usuario por id
router.get('/by-id/:id', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.getUserByID,
    authRequired: true,
    errorLabel: LR.getUserByID
  });
});

// guardar un nuevo usuario
router.post('/save', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.saveUser,
    errorLabel: LR.saveUser
  });
});

// actualizar un usuario
router.post('/update', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.updateUser,
    errorLabel: LR.updateUser
  });
});

// Tranferir derechos de super administrador
router.post('/transfer-rights', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.transferRightToUser,
    errorLabel: LR.updateUser
  });
});

// borrar un usuario
router.post('/remove', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.removeUser,
    errorLabel: LR.removeUser
  });
});

// actualizar contraseña de un usuario
router.post('/update-password', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.updatePasswordUser,
    errorLabel: LR.updatePasswordUser
  });
});

// checar usuario si existe email
router.get('/check-email/:email', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.checkExistsEmail,
    errorLabel: LR.checkExistsEmail
  });
});

// checar usuario si existe phone
router.get('/check-phone/:phone', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.checkExistsPhone,
    errorLabel: LR.checkExistsPhone
  });
});

// solicitar recuperacion de contraseña
router.post('/password-recovery', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.requestPasswordRecovery,
    errorLabel: LR.requestPasswordRecovery
  });
});

// restaurar contraseña de un usuario
router.post('/restore-password', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.restorePassword,
    errorLabel: LR.restorePassword
  });
});

// solicitar verificacion de correo
router.post('/request-email-validation', async (req, res) => {
  routeHandler({
    req,
    res,
    authRequired: true,
    action: usersController.requestEmailValidation,
    errorLabel: LR.requestEmailValidation
  });
});

// verificacion de correo
router.post('/validate-token', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.validateToken,
    errorLabel: LR.validateEmail
  });
});

// Enviar boletín diario
router.post('/bulletin', async (req, res) => {
  routeHandler({
    req,
    res,
    action: usersController.sendDailyBulletin,
    errorLabel: LR.validateEmail
  });
});

module.exports = router;
