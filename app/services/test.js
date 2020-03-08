const Test = require("../models/test");

module.exports.create = body => {
  return new Promise((resolve, reject) => {
    Test.create(body, function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};
