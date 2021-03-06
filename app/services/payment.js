const Payment = require("../models/payment");
const _ = require("lodash");

const create = (body) => {
  return new Promise((resolve, reject) => {
    Payment.create(body, (err, data) => {
      if (err) {
        reject(err);
        return;
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

module.exports = {
  create
};
