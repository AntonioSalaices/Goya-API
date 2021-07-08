const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const _ = require('lodash');
const { Users } = require('../models/usersModel');
const { Sessions } = require('../models/sessionsModel');
const { Tokens } = require('../models/tokensModel');
const { saveLog } = require('../controllers/logsController');
const formatter = require('../utils/formatter');
const { APPLICATION, ROLES } = require('../utils/constants');
const language = require('../utils/i18n/user.json');
const { DATA_CATEGORIES, USER_TYPES } = require('../utils/constants');
const tokens = require('../utils/tokens');
const emails = require('../utils/emails');



const LC = language.controllers;


module.exports = {


  async cancelUser(req, res) {
    const selectedLanguage = req.headers.language || 'en';

    if (!req.body.id) {
      res.send({ isValid: false, message: LC.cancelUser.noUser[selectedLanguage] });
    } else {
      await Users.findByIdAndUpdate(req.body.id, { removed: true, reason_cancel: req.body.reason_cancel });
      await Sessions.remove({ user: req.body.id });

      const members = await Users.find({ adminID: req.body.id });

      for (let index = 0; index < members.length; index++) {
        const member = members[index];

        await Users.findByIdAndUpdate(member._id, { removed: true });
        await Sessions.remove({ user: member._id });
      }
      res.send({ isValid: true });
    }
  },

  async getMembers(req, res) {
    const users = await Users.find({ adminID: req.params.adminID, removed: { $ne: true } });
    const UserIds = users.map((u) => u._id);
    const sessions = await Sessions.find({ user: { $in: UserIds } });
    let S = [];

    for (let i = 0; i <= users.length - 1; i++) {
      S = sessions.filter((s) => s.user === String(users[i]._id));
      users[i].lastActivity = S.length ? S[0].updatedAt : '';
      S = [];
    }

    res.send({ isValid: true, data: users });
  },


  async saveMember(req, res) {
    const selectedLanguage = req.headers.language || 'en';

    const pattern = new RegExp(req.body.email, 'gi');
    const foundUsersByEmail = await Users.find({ email: pattern, removed: { $ne: true } });

    if (!req.body.adminName) {
      res.send({ isValid: false, message: LC.saveMember.noAdminName[selectedLanguage] });
    } else if (!req.body.adminID) {
      res.send({ isValid: false, message: LC.saveMember.noAdminID[selectedLanguage] });
    } else if (foundUsersByEmail.length) {
      res.send({ isValid: false, message: `${LC.saveMember.foundUsersByEmail[selectedLanguage]} ${req.body.email}` });
    } else {
      const newUser = new Users({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        role: req.body.role,
        module: req.body.module,
        proteins: req.body.proteins,
        adminID: req.body.adminID,
        type: 'premium',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const createdUser = await newUser.save();

      const data = {
        email: createdUser.email,
        name: req.body.adminName,
        language: selectedLanguage,
        id: createdUser._id,
      };

      emails.sendAssignPassword(data, async (error) => {
        if (error) {
          saveLog('send-assign-password', JSON.stringify(error));
        }
      });

      res.send({ isValid: true, data: createdUser });
    }
  },

  async getUsers(req, res) {
    const users = await Users.find({ removed: { $ne: true } });
    res.send({ isValid: true, data: users });
  },

  async getUsersByName(req, res) {
    const pattern = formatter.addAccents(req.params.searchText);
    const regexSearch = { $regex: pattern, $options: 'gi' };

    const users = await Users.aggregate([
      {
        $addFields: {
          full_name: {
            $concat: ['$name', ' ', '$first_last_name', ' ', '$second_last_name']
          }
        }
      },
      {
        $match: {
          full_name: regexSearch,
          removed: { $ne: true }
        }
      }
    ]);

    res.send({ isValid: true, data: users });
  },

  async getUserByID(req, res) {
    const user = await Users.findById({ _id: req.params.id });
    const response = { ...user._doc };
    delete response.password;

    res.send({ isValid: true, data: response });
  },

  async getUserBySession(req, res) {
    const sessionData = await Sessions.findById(req.params.session);

    if (!sessionData) {
      res.send({ isValid: true });
    } else {
      const userData = await Users.findById(sessionData.user);

      if (!userData) {
        res.send({ isValid: true });
      } else if (userData.removed) {
        res.send({ isValid: true });
      } else if (userData.type === USER_TYPES.PREMIUM && userData.role === ROLES.SUPER_ADMIN) {
        const chargebeeData = await getChargebeeProfile(userData.chargebeeID);
        const response = { ...userData._doc };
        delete response.password;
        response.chargebee_data = chargebeeData;

        res.send({ isValid: true, data: response });
      } else {
        const response = { ...userData._doc };
        delete response.password;

        res.send({ isValid: true, data: response });
      }
    }
  },

  // registro de nuevos usuarios
  async saveUser(req, res) {
    const pattern = new RegExp(req.body.email, 'gi');
    const foundUsersByEmail = await Users.find({ email: pattern, removed: { $ne: true } });

    if (foundUsersByEmail.length) {
      res.send({ isValid: false, message: `${LC.saveUser.foundUsersByEmail[selectedLanguage]} ${req.body.email}` });
    } else {

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      console.log('REQBOYDY', req.body)
      const newUser = new Users({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        account_number: req.body.account_number,
        password: hashPassword,
        type: USER_TYPES.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const createdUser = await newUser.save();
      res.send({ isValid: true, data: createdUser });
    }
  },

  async updateUser(req, res) {
    const selectedLanguage = req.headers.language || 'en';

    if (!req.body.id) {
      res.send({ isValid: false, message: LC.updateUser.noId[selectedLanguage] });
    } else if (!req.body.newValues) {
      res.send({ isValid: false, message: LC.updateUser.noNewValues[selectedLanguage] });
    } else if (req.body.newValues.phone) {
      const { phone } = req.body.newValues;
      const existPhone = await Users.findOne({ phone, removed: { $ne: true } });

      if (existPhone) {
        const message = LC.updateUser.existPhone[selectedLanguage].replace('#phone', phone);
        res.send({ isValid: false, message });
      } else {
        await Users.findByIdAndUpdate(req.body.id, req.body.newValues);
        const editedUser = await Users.findById({ _id: req.body.id });
        res.send({ isValid: true, data: editedUser });
      }
    } else {
      await Users.findByIdAndUpdate(req.body.id, req.body.newValues);
      const editedUser = await Users.findById({ _id: req.body.id });
      res.send({ isValid: true, data: editedUser });
    }
  },
  async removeUser(req, res) {
    const selectedLanguage = req.headers.language || 'en';

    if (!req.body.user) {
      res.send({ isValid: false, message: LC.removeUser.noUser[selectedLanguage] });
    } else {
      await Users.findByIdAndUpdate(req.body.user, { removed: true });
      await Sessions.remove({ user: req.body.user });
      res.send({ isValid: true });
    }
  },

  async sendVerifyEmail(req, res) {
    const selectedLanguage = req.headers.language || 'en';
    const pattern = new RegExp(req.body.email, 'gi');
    const foundUsersByEmail = await Users.findOne({ email: pattern, email_verified: true, removed: { $ne: true } });

    if (foundUsersByEmail) {
      res.send({ isValid: false, message: `${LC.sendVerifyEmail.foundUsersByEmail[selectedLanguage]} ${req.body.email}` });
    } else if (!req.body.email) {
      res.send({ isValid: false, message: LC.sendVerifyEmail.noEmail[selectedLanguage] });
    } else {
      const data = {
        email: req.body.email,
        name: `${req.body.first_name} ${req.body.last_name}`.trim(),
        language: selectedLanguage,
        token: tokens.generateCode().toUpperCase(),
      };

      if (req.body.profile) {
        emails.sendVerificationCode(data, async (error) => {
          if (error) {
            saveLog('send-verification-code', JSON.stringify(error));
          } else {
            const newToken = new Tokens({
              token: data.token,
              email: data.email,
              used: false,
              createdAt: new Date(),
            });

            await newToken.save();
          }
        });
      } else if (req.body.register) {
        console.log('ENTR A QUI')
        emails.sendVerificationCodeRegister(data, async (error) => {
          if (error) {
            saveLog('send-verification-code', JSON.stringify(error));
          } else {
            const newToken = new Tokens({
              token: data.token,
              email: data.email,
              used: false,
              createdAt: new Date(),
            });

            await newToken.save();
          }
        });
      }

      res.send({ isValid: true, message: LC.sendVerifyEmail.success[selectedLanguage] });
    }
  },

  async validateToken(req, res) {
    const selectedLanguage = req.headers.language || 'en';
    const { token, phone, email } = req.body;
    console.log('TOKEN', token)
    if (!token) {
      res.send({ isValid: false, message: LC.validateEmail.noToken['es'] });
    } else {
      const tokenData = await Tokens.findOne({ token });

      if (tokenData && !tokenData.used) {
        console.log('si entroo', tokenData)
        if (phone) {
          if (tokenData.phone === phone) {
            await Tokens.findByIdAndUpdate(tokenData._id, { used: true });
            res.send({ isValid: true });
          } else {
            res.send({ isValid: false, message: LC.validateToken['es'] });
          }
        } else if (email) {
          console.log('email')
          if (tokenData.email) {
            if (tokenData.email === email) {
              await Tokens.findByIdAndUpdate(tokenData._id, { used: true });
              res.send({ isValid: true });
            } else {
              res.send({ isValid: false, message: LC.validateToken.es });
            }
          } else {
            const userData = await Users.findOne({ email, removed: { $ne: true } });

            if (userData && userData.phone) {
              if (tokenData.phone === userData.phone) {
                await Tokens.findByIdAndUpdate(tokenData._id, { used: true });
                res.send({ isValid: true });
              } else {
                res.send({ isValid: false, message: LC.validateToken['es'] });
              }
            } else {
              res.send({ isValid: false, message: LC.validateToken['es'] });
            }
          }
        } else {
          res.send({ isValid: false, message: LC.validateToken['es'] });
        }
      } else {
        res.send({ isValid: false, message: LC.validateEmail.tokenData['es'] });
      }
    }
  },
  // actualizar contraseña cuando el usuario si se sabe su contraseña
  async updatePasswordUser(req, res) {
    const selectedLanguage = req.headers.language || 'en';

    if (!req.body.id) {
      res.send({ isValid: false, message: LC.updatePasswordUser.noId[selectedLanguage] });
    } else if (!req.body.password) {
      res.send({ isValid: false, message: LC.updatePasswordUser.noPassword[selectedLanguage] });
    } else if (!req.body.newPassword) {
      res.send({ isValid: false, message: LC.updatePasswordUser.noNewPassword[selectedLanguage] });
    } else {
      const { id, password, newPassword } = req.body;
      const user = await Users.findById({ _id: id });
      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        res.send({ isValid: false, message: LC.updatePasswordUser.correctPassword[selectedLanguage] });
      } else {
        const hashNewPassword = await bcrypt.hash(newPassword, 10);

        await Users.findByIdAndUpdate(req.body.id, { password: hashNewPassword });
        res.send({ isValid: true, data: true });
      }
    }
  },

  async checkExistsEmail(req, res) {
    const pattern = new RegExp(req.params.email, 'gi');
    const users = await Users.find({ email: pattern, removed: { $ne: true } });
    let exist = false;

    if (users.length) {
      exist = true;
    }

    res.send({ isValid: true, data: { exist } });
  },

  async checkExistsPhone(req, res) {
    const users = await Users.find({ phone: req.params.phone, removed: { $ne: true } });
    let exist = false;

    if (users.length) {
      exist = true;
    }

    res.send({ isValid: true, data: { exist } });
  },
  async requestPasswordRecovery(req, res) {
    const selectedLanguage = req.headers.language || 'en';

    if (!req.body.email) {
      res.send({ isValid: false, message: LC.requestPasswordRecovery.noEmail[selectedLanguage] });
    } else {
      const pattern = new RegExp(req.body.email, 'gi');
      const foundUsersByEmail = await Users.find({ email: pattern, removed: { $ne: true } });

      if (foundUsersByEmail.length) {
        const foundUser = foundUsersByEmail[0];

        const data = {
          email: req.body.email,
          token: tokens.generateCode().toUpperCase(),
          name: `${foundUser.first_name} ${foundUser.last_name}`.trim(),
          language: selectedLanguage,
        };

        emails.sendRecoveryPassword(data, async (error) => {
          if (error) {
            saveLog('send-recovery-email', JSON.stringify(error));
            res.send({ isValid: false, message: LC.requestPasswordRecovery.sendEmail[selectedLanguage] });
          } else {
            const newToken = new Tokens({
              token: data.token,
              email: req.body.email,
              used: false,
              createdAt: new Date(),
            });

            await newToken.save();

            const response = {
              isValid: true,
              message: LC.requestPasswordRecovery.success[selectedLanguage]
            };

            if (foundUser.phone) {
              const userPhone = foundUser.phone.toString();

              response.data = {
                phone: userPhone.substr(userPhone.length - 3)
              };
            }

            res.send(response);
          }
        });
      } else {
        res.send({ isValid: false, message: LC.requestPasswordRecovery.foundUsersByEmail[selectedLanguage] });
      }
    }
  },

  // actualizar contraseña del usuario por token de verificacion
  async restorePassword(req, res) {
    const selectedLanguage = req.headers.language || 'en';

    if (!req.body.token) {
      res.send({ isValid: false, message: LC.restorePassword.noToken[selectedLanguage] });
    } else if (!req.body.password) {
      res.send({ isValid: false, message: LC.restorePassword.noPassword[selectedLanguage] });
    } else {
      const foundTokenBytoken = await Tokens.find({ token: req.body.token });

      if (foundTokenBytoken.length) {
        const dataToken = foundTokenBytoken[0];
        const createdAt = new Date(dataToken.createdAt).getTime();
        const currentDate = new Date().getTime();
        const differenceDays = Math.trunc(((currentDate - createdAt) / (1000 * 60 * 60 * 24)));

        if (differenceDays === 0 && dataToken.used) {
          let currentUser;

          if (dataToken.phone) {
            currentUser = await Users.findOne({ phone: dataToken.phone, removed: { $ne: true } });
          } else {
            const pattern = new RegExp(dataToken.email, 'gi');
            currentUser = await Users.findOne({ email: pattern, removed: { $ne: true } });
          }

          const hashPassword = await bcrypt.hash(req.body.password, 10);
          await Users.findByIdAndUpdate(currentUser._id, { password: hashPassword });

          res.send({ isValid: true, data: { message: LC.restorePassword.success[selectedLanguage] } });
        } else {
          res.send({ isValid: false, message: LC.restorePassword.differenceDays[selectedLanguage] });
        }
      } else {
        res.send({ isValid: false, message: LC.restorePassword.foundTokenBytoken[selectedLanguage] });
      }
    }
  }
};
