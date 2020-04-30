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

module.exports.search = async (req, res, next) => {
  let { key } = req.query;

  const query = { name: { $regex: key, $options: "g" } }
  
  try {
    const data = await District.list(query, 1, 10);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
