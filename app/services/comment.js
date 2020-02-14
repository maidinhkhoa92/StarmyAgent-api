const Comment = require("../models/comment");
const _ = require("lodash");

const create = body => {
  return new Promise((resolve, reject) => {
    Comment.create(body, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(data));
    });
  });
};

const list = (query, paged, limit) => {
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

    Comment.paginate(query, options, (err, result) => {
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

const convertData = data => {
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

module.exports = {
  create,
  list
};
