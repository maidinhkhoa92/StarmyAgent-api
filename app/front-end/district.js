const District = require("../services/district");

module.exports.list = async (req, res, next) => {
  let { limit, paged, query } = req.query;
  
  try {
    const data = await District.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
