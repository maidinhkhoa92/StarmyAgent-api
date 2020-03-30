const city = require("../models/city");
const _ = require("lodash");

module.exports.list = (paged = 1, limit = 10) => {
  return new Promise((resolve, reject) => {
    var query = city.find();
    
    if (limit) {
      query = query.limit(limit);
    }

    if (paged) {
      const skiped = (paged - 1) * limit;
      query = query.skip(skiped);
    }

    query.sort('name').exec(function(err, data) {
      if (err) {
        reject(err);
      }
      if (data === null) {
        reject({ code: 10000 });
      }
      const result = _.map(data, item => {
        return convertData(item);
      });

      resolve({
        total: result.length,
        limit: limit,
        paged: paged,
        data: result
      });
    });
  });
};

module.exports.detail = query => {
  return new Promise((resolve, reject) => {
    city.findOne(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(res));
    });
  });
};

const convertData = (data) => {
  var result = data;
  if (data === null || data === undefined) {
    return null;
  }
  if (data.toObject) {
    result = data.toObject();
  }
  result.id = data._id;
  delete result._id;
  delete result.__v;
  return result;
};
