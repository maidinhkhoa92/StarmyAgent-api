const Property = require("../../services/property");
const { validationResult } = require("express-validator");

module.exports.list = async (req, res, next) => {
  try {
    let query = {};

    const data = await Property.list(query, -1);
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
    const { id } = req.params
    
    const data = await Property.update(id, req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};