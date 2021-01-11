const user = require("../../services/user");
const City = require("../../services/city");
const District = require("../../services/district");
const { validationResult } = require("express-validator");
const _ = require("lodash");

module.exports.list = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    let query = {};
    const { paged, limit, city, services, type, agency, order, locations } = req.query;

    if (city) {
      cityRespond = await City.detail({ _id: city })
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

    if (locations) {
      query.locations = { "$in": [locations] };
    }

    query.disabled = false;

    let data = await user.list(query, paged, limit);
    
    // sort
    if (order && order === 'Mejor puntuación') {
      data.docs = _.orderBy(data.docs, ['total'], ['desc']);
    }
    if (order && order === 'Más reseñas') {
      data.docs = _.orderBy(data.docs, ['comments'], ['desc']);
    }
    
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