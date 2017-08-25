const User          = require('../models').User;
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    where: {id: id}
  }).then(function(user) {
    done(null, user);
  });
});

passport.use('local-login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done) {
  User.findOne({
    where: {username: username}
  }).then(function(user) {
    if (!user) {
      return done(null, false, {
        message: 'Username or password incorrect'
      });
    }

    bcrypt.compare(password, user.password, function(err, res) {
      if (!res) return done(null, false, {
        message: 'Username or password incorrect'
      });

      let returnUser = {
        username: user.username,
        id: user.id,
        name: user.name,
        surname: user.surname
      };

      return done(null, returnUser, {
        message: 'Logged in successfully'
      });
    });
  });
}));
