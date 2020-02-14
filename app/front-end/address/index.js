const Address = require("../../services/address");
const { validationResult } = require("express-validator");

module.exports.update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id : agent_id } = req.decoded;
    const { id : address_id } = req.params;
    
    const item = await Address.detail(address_id);
    
    if((item.agent).toString() !== agent_id) {
      throw ({code: 10001})
    }

    const data = await Address.update(address_id, req.body);
    
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.decoded;
    req.body.agent = id;
    const data = await Address.create(req.body);
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
    
    const data = await Address.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};