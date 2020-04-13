const contact = require("../../../services/contact");
const { validationResult } = require("express-validator");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const data = await contact.create(req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.sendEmail = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const data = await contact.sendEmail(req.body);
    console.log(data)
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
