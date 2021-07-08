const authController = require('../controllers/authController');
const logsController = require('../controllers/logsController');


module.exports = async ({ req, res, action, authRequired, errorLabel = {} }) => {
  const { language } = req.headers;

  if (authRequired) {
    const errorCallback = (error) => {
      logsController.saveLog(action.name, error.message);

      res.send({
        isValid: false,
        message: errorLabel[language || 'en'],
        error: error.message
      });
    };

    const sessionValid = await authController.validateSession(req, res).catch(errorCallback);

    if (sessionValid) {
      action(req, res).catch(errorCallback);
    }
  } else {
    action(req, res).catch((error) => {
      logsController.saveLog(action.name, error.message);
      res.send({
        isValid: false,
        message: errorLabel[language || 'en'],
        error: error.message
      });
    });
  }
};
