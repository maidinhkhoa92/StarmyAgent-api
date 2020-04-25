const District = require("../services/district");

module.exports.list = async (req, res, next) => {
  let { limit, paged, city } = req.query;
  
  try {
    const data = await District.list({city}, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
