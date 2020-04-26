const District = require("../models/district");
const _ = require("lodash");

module.exports.list = (searchQuery = {}, paged = 1, limit = 10) => {
  return new Promise((resolve, reject) => {
    let options = {};

    if (limit) {
      limit = parseInt(limit);
      options.limit = limit;
    }

    if (paged) {
      limit = parseInt(paged);
      options.page = paged;
    }

    District.paginate(searchQuery, options, function(err, result) {
      if (err) {
        reject(err);
      }
      if (result.docs === null) {
        reject({ code: 10000 });
      }

      resolve({
        ...result,
        docs: _.map(result.docs, item => {
          return convertData(item);
        })
      });
    });
  });
};

module.exports.detail = query => {
  return new Promise((resolve, reject) => {
    District.findOne(query, (err, res) => {
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
