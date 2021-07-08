const { Logs } = require('../models/logsModel');


module.exports = {
  saveLog(route, error, data) {
    const newLog = new Logs({
      route,
      error,
      data,
      createdAt: new Date(),
    });

    newLog.save();
  },
};
