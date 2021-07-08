const bcrypt = require('bcrypt');
const { Sessions } = require('../models/sessionsModel');
const { Users } = require('../models/usersModel');
const { Contacts } = require('../models/contactsModel');
const { saveLog } = require('../controllers/logsController');
const i18n = require('../utils/i18n/auth.json');
const LC = i18n.controllers;

module.exports = {
  async saveContact(req, res) {

    console.log("la data es:",request.body);
    const documento1 = req.file;
    console.log(documento1.path);
    const filefine = documento1.originalname.replace(/\s/g, "-");

    const selectedLanguage = req.headers.language || 'en';

    const newUser = new Contacts({
      name: req.body.name,
      number: req.body.email,
      menu: filefine,
      createdAt: new Date(),
    });  

    const data = {
      name: req.body.name,
      number: req.body.number,
      menu: req.body.menu, 
    };

    const createdContact = await newUser.save();

    res.send({ isValid: true, data: createdContact });
  },
  async getRestaurantes(req, res) {
    const restaurantes = await Contacts.find();

    if(restaurantes){
    res.send({ isValid: true, data: restaurantes });
    }else{
      res.send({ isValid: false, message: 'No hay restaurantes' });
    }
  },
  async checkServerAvailability(req, res) {
    res.send({ isValid: true });
  },

  async getSessions(req, res) {
    const sessions = await Sessions.find();
    const newSessions = [];

    for (let j = 0; j < sessions.length; j++) {
      const session = { ...sessions[j]._doc };

      if (sessions[j]._doc.user_type === 'user') {
        const user = await Users.findById({ _id: sessions[j].user });

        if (user) {
          session.user_name = user.fullName || `${user.name} ${user.first_last_name} ${user.second_last_name}`;
          newSessions.push(session);
        }
      } else {
        const backofficeUser = await BackofficeUsers.findById({ _id: sessions[j].user });

        if (backofficeUser) {
          session.user_name = backofficeUser.name;
          newSessions.push(session);
        }
      }
    }

    res.send({ isValid: true, data: newSessions });
  },

  async getSessionByID(req, res) {
    const session = await Sessions.findById({ _id: req.params.id });
    res.send({ isValid: true, data: session });
  },

  async getSessionByDevice(req, res) {
    const foundSessions = await Sessions.find({ device: req.params.device });

    if (foundSessions.length) {
      const currentSession = foundSessions[0];
      res.send({ isValid: true, data: currentSession });
    } else {
      res.send({ isValid: true, data: null });
    }
  },

  async userLogin(req, res) {
    const { language } = req.headers;
    const selectedLanguage = language || 'en';
    const foundUser = await Users.findOne({ email: req.body.email, removed: { $ne: true } });

    if (foundUser) {
      const correctPassword = await bcrypt.compare(req.body.password, foundUser.password);

      if (correctPassword) {
        const foundSession = await Sessions.findOne({ user: foundUser._id });

        if (foundSession) {
          // await Users.findByIdAndUpdate(foundUser._id, { device_token: req.body.deviceToken });
          // await Sessions.findByIdAndUpdate(foundSessions[0]._id, { device: req.body.installationId });
          res.send({ isValid: true, data: foundSession });
        } else {
          // await Users.findByIdAndUpdate(foundUser._id, { device_token: req.body.deviceToken });

          const newSession = new Sessions({
            user: foundUser._id,
            user_type: 'user',
            active: true,
            // device: req.body.installationId,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          const createdSession = await newSession.save();
          res.send({ isValid: true, data: createdSession });
        }
      } else {
        saveLog('invalid-user-login', JSON.stringify({
          phone: req.body.email,
          password: req.body.password
        }));

        res.send({
          isValid: false,
          message: LC.userLogin.error[selectedLanguage]
        });
      }
    } else {
      saveLog('invalid-user-login', JSON.stringify({
        phone: req.body.email,
        password: req.body.password
      }));

      res.send({
        isValid: false,
        message: LC.userLogin.error[selectedLanguage]
      });
    }
  },

  async validateSession(req, res) {
    const { authorization } = req.headers;
    const foundSession = await Sessions.findById(authorization);

    if (foundSession) {
      const newValues = { active: true, sync: true, updatedAt: new Date() };
      await Sessions.findByIdAndUpdate(authorization, newValues);
      return true;
    }

    res.send({ isValid: false, message: LC.validateSession.foundSession[req.headers.language || 'en'] });
    return false;
  },

  async backofficeUserLogin(req, res) {
    const foundUsersByEmail = await BackofficeUsers.find({ email: req.body.email, removed: { $ne: true } });

    if (foundUsersByEmail.length) {
      const foundUser = foundUsersByEmail[0];
      const correctPassword = await bcrypt.compare(req.body.password, foundUser.password);

      if (correctPassword) {
        const foundSessions = await Sessions.find({ user: foundUser._id });

        if (foundSessions.length) {
          res.send({ isValid: true, data: foundSessions[0] });
        } else {
          const newSession = new Sessions({
            user: foundUser._id,
            user_type: 'backofficeuser',
            active: true,
            available: true,
            busy: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          const createdSession = await newSession.save();
          res.send({ isValid: true, data: createdSession });
        }
      } else {
        res.send({
          isValid: false,
          message: LC.backofficeUserLogin.error[req.body.language]
        });
      }
    } else {
      res.send({
        isValid: false,
        message: LC.backofficeUserLogin.error[req.body.language]
      });
    }
  },

  async deleteSession(req, res) {
    const deleteUser = await Sessions.findOneAndRemove({ _id: req.body.session });

    if (deleteUser) {
      res.send({
        isValid: true,
        data: {},
        message: LC.deleteSession.success[req.body.language],
      });
    } else {
      res.send({
        isValid: false,
        message: LC.deleteSession.error[req.body.language],
      });
    }
  },

  runSessionsWorker() {
    const workerInterval = 1000 * 60 * 2; // two minutes

    const expireUsers = async () => {
      const currentDate = new Date();
      const expirationTime = 1000 * 60 * 30; // thirty minutes
      const dateToExpire = new Date(currentDate.getTime() - expirationTime);
      const sessionsToExpire = await Sessions.find({ user_type: 'user', active: true, updatedAt: { $lt: dateToExpire } });

      sessionsToExpire.forEach(async (session) => {
        await Sessions.findByIdAndUpdate(session._id, { active: false });
      });
    };

    setInterval(() => {
      expireUsers();
    }, workerInterval);
  },
};
