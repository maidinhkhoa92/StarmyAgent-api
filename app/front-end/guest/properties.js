const Property = require("../../services/property");
const { validationResult } = require("express-validator");

module.exports.list = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    let query = {};
    const { paged, limit, agent } = req.query;

    query.agent = agent
    query.disabled = false
    
    const data = await Property.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
