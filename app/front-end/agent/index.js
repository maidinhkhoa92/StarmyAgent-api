const user = require("../../services/user");
const { validationResult } = require("express-validator");

module.exports.list = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    let query = {};
    const { paged, limit, city } = req.query;

    if (city) {
      query.city = city;
    }
    query.type = 'agent';
    
    const data = await user.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
