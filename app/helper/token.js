const jwt = require('jsonwebtoken');
const APP_CONFIG = require('../config/APP_CONFIG');
const ERRORS = require('../config/ERRORS');

module.exports = function (req, res, next) {
  var token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token !== undefined) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, APP_CONFIG.token, function (err, decoded) {
      if (err) {
        res.status(403).send({ message: ERRORS[9998] });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({ message: ERRORS[9997] });
  }
}
