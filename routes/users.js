'use strict';

const express   = require('express');
const User      = require('../models').User;
const router    = express.Router();
const passport  = require('passport');

router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if ((err) || (!user)) {
      return res.send({
        message: info.message,
        user: user
      });
    }
    req.logIn(user, function(err) {
      return res.send({
        message: info.message,
        user: user
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logout papá');
});

router.get('/', function(req, res, next) {
  var params = req.query.all();

  User.findAndCountAll(params).then(function(results) {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    res.set('X-Total-Count', results.count);
    return res.send(results.rows);
  });
});

router.post('/', function(req, res, next) {
  var params = req.body;

  User.create(params).then(function(created) {
    return res.send(created);
  }).catch(function(err) {
    return res.status(400).json(err);
  });
});

router.get('/:id', function(req, res, next) {
  var params = req.query.all();
  params.where = {id: parseInt(req.params.id)};

  User.findOne(params).then(function(result) {
    return res.send(result);
  });
});

router.put('/:id', function(req, res, next) {
  var params = req.body;
  User.findOne({
    where: {id: parseInt(req.params.id)}
  }).then(function(user) {
    if(!user) return res.status(400).json({error: 'Error'});

    user.update(params).then(function(results) {
      return res.send(results)
    })
  });
});

module.exports = router;
