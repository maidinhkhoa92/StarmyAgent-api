const User = require("../models/admin")
const _ = require("lodash");
const bcrypt = require("bcryptjs");


module.exports.create = (body) => {
    return new Promise((resolve, reject) => {
      if (body.password) {
        body.password = bcrypt.hashSync(
          body.password,
          bcrypt.genSaltSync(8),
          null
        );
      }
      User.create(body, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(convertData(data));
      });
    });
  };

  module.exports.fetch = () => {
    return new Promise ((resolve, reject) => {
      User.find((err, result) => {
        if (err) {
          reject(err)
        } 
        resolve(_.map(result, (item) => convertData(item) ))
      })
    })
  }

  
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
  