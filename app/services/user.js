"use strict";

const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../helper/nodemailer");
const APP_CONFIG = require("../config/APP_CONFIG");
const _ = require("lodash");
const EMAIL = require("../config/EMAIL");

module.exports.register = body => {
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
        from: APP_CONFIG.adminEmail,
        to: data.email,
        subject: EMAIL.register.title,
        html: data.type === 'agent' ? EMAIL.register.agent({ link: APP_CONFIG.registerWebAppUrl }) : EMAIL.register.agency({ link: APP_CONFIG.registerWebAppUrl })
      };
      transporter.sendMail(mailOptions, function(error) {
        if (err) {
          reject({ code: 11 });
          return;
        }

        resolve(convertData(data));
      });
    });
  });
};

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

module.exports.update = (id, body) => {
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

module.exports.list = (searchQuery, paged, limit) => {
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
      if (!result.docs) {
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

module.exports.detail = id => {
  return new Promise((resolve, reject) => {
    user.findById(id, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(res));
    });
  });
};

module.exports.find = query => {
  return new Promise((resolve, reject) => {
    user.findOne(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(res));
    });
  });
};

module.exports.forgotPassword = email => {
  return new Promise((resolve, reject) => {
    user.findOne({ email: email }, function(err, data) {
      if (err) {
        reject(err);
        return;
      }

      if (!data) {
        reject({ code: 8 });
        return;
      }

      const token = jwt.sign({ email: data.email }, APP_CONFIG.token);
      const link = APP_CONFIG.resetPasswordUrl + token;

      let mailOptions = {
        from: APP_CONFIG.adminEmail,
        to: data.email,
        subject: EMAIL.resetPassword.title,
        html: EMAIL.resetPassword.message({ link })
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          reject({ code: 11 });
          return;
        }

        resolve(convertData(data));
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
