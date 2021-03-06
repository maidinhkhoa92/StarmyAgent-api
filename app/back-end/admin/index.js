const admin = require("../../services/admin");
const { validationResult } = require("express-validator");


module.exports.create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ errors: errors.array() });
      return;
    }
    try {
      const data = await admin.create(req.body);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }
  try {
    const {email, password} = req.body;
    const data = await admin.login(email, password);
    res.status(200).send(data)
  } 
  catch (err) {
    next(err)
  }
}