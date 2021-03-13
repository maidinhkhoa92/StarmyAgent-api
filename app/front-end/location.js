const location = require("../services/location");

module.exports.list = async (req, res, next) => {
  let { limit, paged, city } = req.query;
  paged = parseInt(paged);
  limit = parseInt(limit);

  const query = {
    city
  }
  try {
    const data = await location.list(paged, limit, query);
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

module.exports.search = async (req, res, next) => {
  let { key } = req.query;

  const query = { name: { $regex: key, $options: "gi" } }
  
  try {
    const data = await location.list(1, 10, query);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};