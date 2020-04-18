const user = require("../models/admin")
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const APP_CONFIG = require("../config/APP_CONFIG");


module.exports.create = (body) => {
    return new Promise((resolve, reject) => {
      if (body.password) {
        body.password = bcrypt.hashSync(
          body.password,
          bcrypt.genSaltSync(8),
          null
        );
      }
      user.create(body, (err, data) => {
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
      user.find((err, result) => {
        if (err) {
          reject(err)
        } 
        resolve(_.map(result, (item) => convertData(item) ))
      })
    })
  }

  module.exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
      user
        .findOne({ email: email }, function(error, User) {
          if (error) {
            reject(error);
            return;
          }
          if (User === null || User === undefined) {
            reject({ code: 8 });
            return;
          } 
          bcrypt.compare(password, User.password, (err, resonse) => {
            if (err) {
              reject(err);
              return;
            }

            if (!resonse) {
              reject({ code: 9999 });
              return;
            }
            delete User.password;
            const data = {
              email: User.email,
              id: User._id
            };
            const token = jwt.sign(data, APP_CONFIG.token);
            resolve({ ...convertData(User), token: token });
          });
        })
        .catch(() => {
          reject({ msg: ERRORS[9999] });
        });
    });
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
  