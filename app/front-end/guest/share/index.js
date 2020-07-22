const Share = require("../../../services/share");
const { validationResult } = require("express-validator");


module.exports.sendEmail = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const data = await Share.shareEmail(req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};