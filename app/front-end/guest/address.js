const Address = require("../../services/address");
const { validationResult } = require("express-validator");

module.exports.list = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    let query = {};
    const { paged, limit, agent, highlight } = req.query;

    query.agent = agent;

    if (highlight) {
      query.highlight = highlight;
    }

    const data = await Address.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
