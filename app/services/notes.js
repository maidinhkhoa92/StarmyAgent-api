const notes = require('../models/notes')
const _ = require("lodash");


module.exports.create = body => {
    return new Promise((resolve, reject) => {
        notes.create(body, function(err, data) {
            if (err) {
            reject(err);
            return;
            }
            resolve(convertData(data));
            }
      );
    });
  };

  module.exports.list = id => {
    return new Promise((resolve, reject) => {
        notes.find({ agency: id}, function(err, data) {
            if (err) {
            reject(err);
            return;
            }
            resolve(data.map(item => convertData(item)))
            }
      );
    });
  };

  module.exports.delete = id => {
    return new Promise((resolve, reject) => {
      notes.findByIdAndRemove(id, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(convertData(res));
      });
    });
  };

  module.exports.update = (id, body) => {
    return new Promise((resolve, reject) => {
      const query = {
        _id: id
      };
      const params = {
        msg: body.message
      }
      notes.findOneAndUpdate(query, params, {new: true}, function(err, data) {
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