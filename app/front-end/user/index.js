const user = require("../../services/user");

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const data = user.login(email, password)
    res.status(200).send(data);
  } catch (err) {
    next(err)
  }
};
