const notes = require("../../services/notes");
const { validationResult } = require("express-validator");

module.exports.create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ errors: errors.array() });
      return;
    }
    try {
      const data = await notes.create(req.body);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  module.exports.list = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ errors: errors.array() });
      return;
    }
    try {
      const data = await notes.list(req.params.id);
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
      const data = await notes.delete(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  module.exports.update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ errors: errors.array() });
      return;
    }
    try {
      const data = await notes.update(req.params.id, req.body);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };