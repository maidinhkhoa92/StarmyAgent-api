const CalculatedData = require("../models/calculated_data");
const _ = require("lodash");

module.exports.list = () => {
  return new Promise((resolve, reject) => {

    CalculatedData.find({}, (err, data) => {
      if (err) {
        reject(err)
        return;
      }
      const result = _.map(data, item => {
        return convertData(item);
      });

      resolve(result);
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
