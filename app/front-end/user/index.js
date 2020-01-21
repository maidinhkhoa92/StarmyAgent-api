const user = require("../../services/user");
const { validationResult } = require("express-validator");

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;
  try {
    const data = await user.login(email, password);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

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

module.exports.update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.params;
    const data = await user.update(id, req.body);
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
    if (type === "agency") {
      query = {
        agency: id
      }
    }
    console.log(id, type, paged, limit)
    const data = await user.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
