const user = require("../../services/user");
const { validationResult } = require("express-validator");

module.exports.list = async(req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ errors: errors.array() });
      return;
    } 
    try {
      const {type} = req.query
      const body = { type, agency: req.params.id}
      const data = await user.list(body)
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

  module.exports.delete = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ errors: errors.array() });
      return;
    }
    try {
      const data = await user.delete(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  module.exports.find = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ errors: errors.array() });
      return;
    }
    try {
      const { id } = req.params
      const data = await user.find({_id: id}, true);
      console.log(data)
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };