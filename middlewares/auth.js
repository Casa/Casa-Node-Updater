const passport = require('passport');
const passportHTTP = require('passport-http');
const bcrypt = require('bcrypt');
const diskLogic = require('logic/disk.js');
const NodeError = require('models/errors.js').NodeError;
const UUID = require('utils/UUID');

var BasicStrategy = passportHTTP.BasicStrategy;

const SYSTEM_USER = UUID.fetchBootUUID() || 'admin';
const BASIC_AUTH = 'basic';

passport.serializeUser(function(user, done) {
  return done(null, SYSTEM_USER);
});

passport.use(BASIC_AUTH, new BasicStrategy(function(username, password, next) {
  return next(null, {password: password, username: SYSTEM_USER}); // eslint-disable-line object-shorthand
}));

function basic(req, res, next) {
  passport.authenticate(BASIC_AUTH, {session: false}, function(error, user) {

    function handleCompare(equal) {
      if (!equal) {
        return next(new NodeError('Incorrect password', 401)); // eslint-disable-line no-magic-numbers
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(new NodeError('Unable to authenticate', 401)); // eslint-disable-line no-magic-numbers
        }
        delete user.password;

        return next(null, user);
      });
    }

    diskLogic.readUserFile()
      .then(userData => {
        const storedPassword = userData.password;

        if (error || user === false) {
          return next(new NodeError('Invalid state', 401)); // eslint-disable-line no-magic-numbers
        }

        bcrypt.compare(user.password, storedPassword)
          .then(handleCompare)
          .catch(next);
      })
      .catch(() => next(new NodeError('No user registered', 401))); // eslint-disable-line no-magic-numbers
  })(req, res, next);
}

module.exports = {
  basic,
};

