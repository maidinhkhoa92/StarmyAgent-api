const location = require("../services/location");

module.exports.list = async (req, res, next) => {
  let { limit, paged } = req.query;
  paged = parseInt(paged);
  limit = parseInt(limit);
  try {
    const data = await location.list(paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  let { name } = req.body;
  try {
    const data = await location.create({name});
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};