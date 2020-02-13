const Property = require("../models/property");
const _ = require("lodash");

module.exports.create = (body) => {
  return new Promise((resolve, reject) => {
    Property.create(body, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(data));
    });
  });
};

module.exports.list = (query, paged, limit) => {
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

    Property.paginate(query, options, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.docs === null) {
        reject({ code: 10000 });
        return;
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

module.exports.detail = (id) => {
  return new Promise((resolve, reject) => {
    Property.findById(id, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(res));
    })
  });
};

module.exports.update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id
    };
    
    Property.findOneAndUpdate(query, body, { new: true }, function(err, data) {
      if (err) {
        reject(err);
      }

      resolve(convertData(data));
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
