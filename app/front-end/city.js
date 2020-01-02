const city = require("../services/city");

module.exports.list = async (req, res, next) => {
  let { limit, paged } = req.query;
  paged = parseInt(paged);
  limit = parseInt(limit);
  try {
    const data = await city.list(paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
