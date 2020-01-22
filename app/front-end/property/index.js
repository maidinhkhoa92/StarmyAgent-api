const property = require("../../services/property");
const { validationResult } = require("express-validator");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.decoded;
    req.body.agent = id;
    const data = await property.create(req.body);
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
    let query = {};
    const { id, type } = req.decoded;
    const { paged, limit } = req.query;
    if (type === "agent") {
      query = {
        agent: id
      }
    }
    
    const data = await property.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};