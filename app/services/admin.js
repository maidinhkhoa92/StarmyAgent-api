const admin = require("../models/admin")
const user = require("../models/user")
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
      admin.create(body, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const result = () => {
          let infor = convertData(data);
          delete infor.password
          return infor
        }
        resolve(result());
      });
    });
  };

  module.exports.fetch = () => {
    return new Promise ( (resolve, reject) => {
      user.find({type: 'agency'}, (err, result) => {
        if (err) {
          reject(err)
        } 
        resolve(_.map(result, (item) => convertData(item)))
      })
    })
  }

  module.exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
      admin
        .findOne({ email: email }, function(error, Admin) {
          if (error) {
            reject(error);
            return;
          }
          if (Admin === null || Admin === undefined) {
            reject({ code: 8 });
            return;
          } 
          bcrypt.compare(password, Admin.password, (err, resonse) => {
            if (err) {
              reject(err);
              return;
            }

            if (!resonse) {
              reject({ code: 9999 });
              return;
            }
            delete Admin.password;
            const data = {
              email: Admin.email,
              id: Admin._id
            };
            const token = jwt.sign(data, APP_CONFIG.token);
            resolve({ ...convertData(Admin), token: token });
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
    delete result.password;
    return result;
  };
  