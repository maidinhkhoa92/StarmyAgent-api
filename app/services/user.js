"use strict";

const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../helper/nodemailer");
const APP_CONFIG = require("../config/APP_CONFIG");
const _ = require("lodash");

const register = body => {
  return new Promise((resolve, reject) => {
    if (body.password) {
      body.password = bcrypt.hashSync(
        body.password,
        bcrypt.genSaltSync(8),
        null
      );
    }
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
      transporter.sendMail(mailOptions, function(error) {
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

        if (!User.status) {
          reject({ code: 6 });
          return;
        }

        if (User.disabled) {
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
        reject({ msg: ERRORS[9999] });
      });
  });
};

const update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id
    };
    if (body.password) {
      body.password = bcrypt.hashSync(
        body.password,
        bcrypt.genSaltSync(8),
        null
      );
    }
    
    user.findOneAndUpdate(query, body, { new: true }, function(err, data) {
      if (err) {
        reject(err);
      }

      resolve(convertData(data));
    });
  });
};

const list = (searchQuery, paged, limit) => {
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

    user.paginate(searchQuery, options, (err, result) => {
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
  login,
  update,
  list
};
