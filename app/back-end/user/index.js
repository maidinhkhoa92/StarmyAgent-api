const user = require("../../services/user");
const { validationResult } = require("express-validator");

module.exports.fetch = async(req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ errors: errors.array() });
      return;
    } 
    try {
      const data = await user.list(req.query)
      res.status(200).send(data)
    } 
    catch (err) {
      next(err)
    }
  }

  module.exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ errors: errors.array() });
      return;
    }
  
    try {
      const data = await user.register(req.body);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };