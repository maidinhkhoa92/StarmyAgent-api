const comment = require("../../../services/comment");
const address = require("../../../services/address");
const { validationResult } = require("express-validator");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const updateAddressBody = {
      highlight: true
    };
    await address.update(req.body.address, updateAddressBody);

    const data = await comment.create(req.body);
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
    const { paged, limit, agent } = req.query;

    if (agent) {
      query.agent = agent;
    }

    const data = await comment.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
