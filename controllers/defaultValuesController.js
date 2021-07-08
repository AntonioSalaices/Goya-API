const _ = require('lodash');
const { DefaultValues } = require('../models/defaultValues');
const language = require('../utils/i18n/defaultValues.json');

const LC = language.controllers;

module.exports = {
  async saveDefaultValues(req, res) {
    const body = req.body;
    const languageHeader = req.headers.language || 'en';
    let message = '';
    const newDefaultValues = new DefaultValues({
      user: body.user,
      name: body.name,
      type: body.type,
      meat: body.meat,
      data: body.data,
      createdAt: new Date(),
    });

    const createDefaultValue = await newDefaultValues.save();
    if (body.type === 'chart') { message = LC.saveDefaultChartValues[languageHeader]; }
    if (body.type === 'table') { message = LC.saveDefaultTablesValues[languageHeader]; }

    res.send({
      isValid: true,
      data: createDefaultValue,
      message
    });
  },
  async getDefaultValues(req, res) {
    let getDefault = [];
    const params = {};

    if (req.query.user) {
      params.user = req.query.user;
    } else {
      res.send({ isValid: true, data: [] });
      return;
    }

    if (req.query.id) {
      params._id = req.query.id;
    }

    if (req.query.user) {
      params.user = req.query.user;
    }

    if (req.query.type) {
      params.type = req.query.type;
    }

    if (req.query.meat) {
      params.meat = req.query.meat;
    }

    getDefault = await DefaultValues
      .find(params)
      .sort({ createdAt: -1 })
      .limit(1);

    res.send({ isValid: true, data: getDefault });
  },
  async removeDefaultValues(req, res) {
    if (req.params.id) {
      const findDefaultValues = await DefaultValues.find({ _id: req.params.id });
      if (_.isEmpty(findDefaultValues)) {
        res.send({ isValid: false, findDefaultValues });
        return;
      }
      const currentDefault = findDefaultValues[0];
      await DefaultValues.findByIdAndUpdate(req.params.id, { removed: true });

      const newOrder = await DefaultValues.find({
        user: currentDefault.user,
        type: currentDefault.type,
        removed: false
      });
      if (newOrder.length) {
        const update = newOrder
          .sort((a, b) => a.order - b.order);

        update.forEach(async (it, i) => {
          const params = it;
          params.order = i + 1;
          await DefaultValues.findByIdAndUpdate(it.id, params);
        });
      }

      res.send({ isValid: true });
    } else {
      res.send({ isValid: false, message: LC.noId[req.headers.language] });
    }
  },
  async updateDefaultValues(req, res) {
    if (!req.params.id) {
      res.send({ isValid: false, message: LC.noId[req.headers.language] });
    } else {
      const update = await DefaultValues.findByIdAndUpdate(req.params.id, req.body);
      res.send({ isValid: true, data: update });
    }
  }
};
