"use strict";

const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../helper/nodemailer");
const APP_CONFIG = require("../config/APP_CONFIG");

const register = body => {
  return new Promise((resolve, reject) => {
    user.create(body, function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      const mailOptions = {
        from: "admin@gmail.com",
        to: data.email,
        subject: "Your new account",
        text: "Your link: " + APP_CONFIG.registerWebAppUrl
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (err) {
          reject(error);
          return;
        }

        resolve(convertData(data));
      });
    });
  });
};

const login = (email, password) => {
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

        if (User.status === false) {
          reject({ code: 6 });
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
            type: User.type,
            email: User.email,
            id: User._id
          };
          const token = jwt.sign(data, APP_CONFIG.token);
          resolve({ ...convertData(User), token: token });
        });
      })
      .catch(() => {
        res.status(403).send({ msg: ERRORS[9999] });
      });
  });
};

const convertData = (data, password = true) => {
  var result = data;
  if (data === null || data === undefined) {
    return null;
  }
  if (data.toObject) {
    result = data.toObject();
  }
  result.id = data._id;
  if (password) {
    delete result.password;
  }
  delete result._id;
  delete result.__v;
  return result;
};

module.exports = {
  register,
  login
};
