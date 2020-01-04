const user = require("../../services/user");
const { validationResult } = require('express-validator');

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const data = await user.login(email, password)
    res.status(200).send(data);
  } catch (err) {
    next(err)
  }
};

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
  }

  try {
    const data = await user.register(req.body)
    res.status(200).send(data);
  } catch (err) {
    next(err)
  }
};