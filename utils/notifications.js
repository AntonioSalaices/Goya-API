const request = require('request');
const { saveLog } = require('../controllers/logsController');
const { FIREBASE_PUSH_NOTIFICATIONS_ENDPOINT, FIREBASE_SERVER_KEY } = require('../utils/constants');


module.exports = {
  sendFirebaseNotification: (rawNotification, callback = () => {}) => {
    if (rawNotification.to) {
      const notification = {
        json: {
          to: rawNotification.to,
          priority: 'high',
          notification: {
            title: rawNotification.title,
            body: rawNotification.body,
            sound: rawNotification.sound || 'huawei_cartoon',
            android_channel_id: rawNotification.android_channel_id || 'taxone'
          }
        },
        headers: {
          Authorization: FIREBASE_SERVER_KEY
        }
      };

      request.post(FIREBASE_PUSH_NOTIFICATIONS_ENDPOINT, notification, async (error, response) => {
        if (error) {
          saveLog(FIREBASE_PUSH_NOTIFICATIONS_ENDPOINT, JSON.stringify(error));
          callback(error);
        } else if (response.statusCode === 200) {
          if (response.body.failure) {
            saveLog(FIREBASE_PUSH_NOTIFICATIONS_ENDPOINT, JSON.stringify(response.body));
          }

          callback();
        } else {
          saveLog(FIREBASE_PUSH_NOTIFICATIONS_ENDPOINT, JSON.stringify(error));
          callback(error);
        }
      });
    }
  }
};
