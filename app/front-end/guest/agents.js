const user = require("../../services/user");
const City = require("../../services/city");
const District = require("../../services/district");
const { validationResult } = require("express-validator");

module.exports.list = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    let query = {};
    const { paged, limit, city, services, type, agency } = req.query;

    if (city) {
      cityRespond = await City.detail({ name: city })
      query.city = cityRespond.id
    }

    if (services) {
      query.services = { "$in": [services] }
    }

    if (type) {
      query.type = type;
    }

    if (agency) {
      query.agency = agency
    }

    query.disabled = false;

    const data = await user.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.detail = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.params;

    const data = await user.detail(id);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.search = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { key, type } = req.query;
    let queryAgent = {}

    if (type) {
      queryAgent = { 
        type: type,
        $or: [
          { fName: { $regex: key, $options: "gi" } },
          { lName: { $regex: key, $options: "gi" } }
        ] 
      };
    } else {
      const queryDistrict = { name: { $regex: key, $options: "gi" } }
      const district = await District.detail(queryDistrict);

      queryAgent = { city: district.city, type: { $in: ['agent', 'agency'] } };
    }

    const data = await user.list(queryAgent);

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};