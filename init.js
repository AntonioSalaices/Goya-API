
const routesLoader = require('./routes');
const authController = require('./controllers/authController');
const userController = require('./controllers/usersController');


module.exports = (app) => {


  routesLoader(app);
  authController.runSessionsWorker();
};
