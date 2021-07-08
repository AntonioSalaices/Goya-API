const _ = require('lodash');
const { Favorites } = require('../models/favorites');
const { Users } = require('../models/usersModel');
const language = require('../utils/i18n/favorites.json');

const LC = language.controllers;

module.exports = {
  async saveFavorites(req, res) {
    const body = req.body;
    console.log('body', body)
    const newFavorite = new Favorites({
      user: body.user,
      order: body.order,
      status: 'E',
      price: body.price,
      place: body.place,
      user_attend: '',
      createdAt: new Date(),
    });

    const createFavorite = await newFavorite.save();
    res.send({ isValid: true, message:"Pedido registrado exitosamente." });
  },
  async getFavorites(req, res) {

    let getFavorites = [];
    const params = {};

    if (req.query.user) {
      params.user = req.query.user;
    }

    getFavorites = await Favorites.find(params);
    res.send({ isValid: true, data: getFavorites });
  },
  async getFavoritesAttended(req, res) {

    let getFavorites = [];
    const params = {};

    if (req.query.user) {
      params.user_attend = req.query.user;
    }

    getFavorites = await Favorites.find(params);
    res.send({ isValid: true, data: getFavorites });
  },
  async getAllFavorites(req, res) {

    let getFavorites = [];
    const params = {};
    params.status = 'E';

    getFavorites = await Favorites.find(params);
    res.send({ isValid: true, data: getFavorites });
  },
  async removeFavorite(req, res) {
    if (req.params.id) {
      const findFavorite = await Favorites.find({ _id: req.params.id });
      if (_.isEmpty(findFavorite)) {
        res.send({ isValid: false, findFavorite });
        return;
      }
      const currentFavorite = findFavorite[0];
      await Favorites.findByIdAndUpdate(req.params.id, { removed: true });

      const newOrder = await Favorites.find({
        user: currentFavorite.user,
        type: currentFavorite.type,
        removed: false
      });
      if (newOrder.length) {
        const update = newOrder
          .sort((a, b) => a.order - b.order);

        update.forEach(async (it, i) => {
          const params = it;
          params.order = i + 1;
          await Favorites.findByIdAndUpdate(it.id, params);
        });
      }

      res.send({ isValid: true });
    } else {
      res.send({ isValid: false, message: LC.noId[req.headers.language] });
    }
  },
  async updateFavorite(req, res) {
    console.log('REQBODY-->', req.body)

    if (!req.params.id) {
      res.send({ isValid: false, message: LC.noId[req.headers.language] });
    } else if (req.body.status) {
      const params = {};

      params.user_attend = req.body.user;
      params.status = 'A';

      const update = await Favorites.findByIdAndUpdate(req.params.id, params);

      const query = {};
      query.user_attend = req.body.user;

      const AttendedFavorites = await Favorites.find(query);
      res.send({ isValid: true, updatedAt: true, data: AttendedFavorites, message: 'Se ha confirmado la entrega de tu pedido' });
    } else {
      const params = {};

      params.user_attend = req.body.user;
      params.status = 'T';

      const update = await Favorites.findByIdAndUpdate(req.params.id, params);

      const query = {};
      query.status = 'E';

      const getFavorites = await Favorites.find(query);
      res.send({ isValid: true, data: getFavorites, message: 'Se ha confirmado tu asignación a este pedido' });
    }
  },
  async moveFavorite(req, res) {
    const { favoriteId, direction } = req.body;
    // console.log('RECIBO PARA FAVORITOS', req.body);

    if (!favoriteId) {
      res.send({ isValid: false, message: 'Missing param "favoriteId"' });
    } else if (!direction) {
      res.send({ isValid: false, message: 'Missing param "direction"' });
    } else {
      const currentFavorite = await Favorites.findById(favoriteId);
      let anotherFavorite;
      let getFavorites = [];

      /* const currentAfter = await Favorites.findById(currentFavorite._id);
      const anotherAfter = await Favorites.findById(anotherFavorite._id);
      console.log('currentAfter', currentAfter);
      console.log('anotherAfter', anotherAfter);*/
      if (direction === 'down') {
        anotherFavorite = await Favorites.findOne({
          order: currentFavorite.order + 1,
          user: currentFavorite.user,
          type: currentFavorite.type,
          removed: false
        });

        await Favorites.findByIdAndUpdate(currentFavorite._id, { order: anotherFavorite.order });
        await Favorites.findByIdAndUpdate(anotherFavorite._id, { order: currentFavorite.order });

        getFavorites = await Favorites.find({
          user: currentFavorite.user,
          removed: false
        });

        // console.log('getFavorites', getFavorites);
        res.send({ isValid: true, data: getFavorites });
      } else if (direction === 'up') {
        // console.log('UP');
        anotherFavorite = await Favorites.findOne({
          order: currentFavorite.order - 1,
          user: currentFavorite.user,
          type: currentFavorite.type,
          removed: false
        });

        await Favorites.findByIdAndUpdate(currentFavorite._id, { order: anotherFavorite.order });
        await Favorites.findByIdAndUpdate(anotherFavorite._id, { order: currentFavorite.order });
        //console.log('anotherFavorite up', anotherFavorite);

        getFavorites = await Favorites.find({
          user: currentFavorite.user,
          removed: false
        });

        // console.log('getFavorites', getFavorites);
        res.send({ isValid: true, data: getFavorites });
      } else {
        res.send({ isValid: true });
      }
    }
  }
};
