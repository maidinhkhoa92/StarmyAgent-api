const Report = require("../models/report");
const _ = require("lodash");

module.exports.createOrUpdate = (date, user, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      date,
      user
    }
    Report.updateOne(query, body, {upsert: true, setDefaultsOnInsert: true}, (err, data) => {
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

    if (paged && paged === -1) {
      options.pagination = false
    }

    Report.paginate(query, options, (err, result) => {
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

module.exports.detail = (time, user_id) => {
  return new Promise((resolve, reject) => {
    const query = {
      date: time,
      user: user_id
    }
    Report.findOne(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(res));
    })
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
