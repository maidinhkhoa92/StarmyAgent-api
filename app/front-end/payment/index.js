const payment = require("../../services/payment");
const { validationResult } = require("express-validator");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.decoded;
    req.body.user = id;
    const data = await payment.create(req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
