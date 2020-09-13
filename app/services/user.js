"use strict";

const user = require("../models/user");
const Comment = require("../models/comment");
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

    let mailOptions = {
      from: APP_CONFIG.adminEmail,
      to: body.email,
      subject: EMAIL.register.title,
      html: null
    };

    if (body.type === 'agent') {
      if (body.password) {
        mailOptions.html = EMAIL.register.agent({ link: APP_CONFIG.registerWebAppUrl })
      } else {
        mailOptions.html = EMAIL.register.agencyAgent({ link: APP_CONFIG.registerWebAppUrl })
      }
    } else if (body.type === 'agency') {
      mailOptions.html = EMAIL.register.agency({ link: APP_CONFIG.registerWebAppUrl })
    }

    // Send email to user
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        reject({ code: 11 });
        return;
      }
      user.create(body, function (err, data) {
        if (err) {
          reject(err);
          return;
        }
        user.findOne({_id: data._id}).populate('city').exec(function (er, User) {
          if (er) {
            reject(er);
            return;
          }
          const mailOptionToAdmin = {
            from: body.email,
            to: APP_CONFIG.adminEmail,
            subject: 'Nuevo registro de agencia',
            html: null
          };
  
          if (body.type === 'agent') {
            mailOptionToAdmin.subject = 'Nuevo registro de agentes';
            mailOptionToAdmin.html = EMAIL.register.agencyAgent(User)
          } else if (body.type === 'agency') {
            mailOptionToAdmin.html = EMAIL.register.newAgencyUser(User)
          }
  
          transporter.sendMail(mailOptionToAdmin, function (e) {
            if (e) {
              reject({ code: 11 });
              return;
            }
            resolve(convertData(data));
          })
        })
      });
    });
  });
};

module.exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    user
      .findOne({ email: email }, function (error, User) {
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

    user.findOneAndUpdate(query, body, { new: true }, function (err, data) {
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

    if (paged && paged === -1) {
      options.pagination = false
    }

    user.paginate(searchQuery, options, async (err, result) => {
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
        docs: await Promise.all(_.map(result.docs, async item => {
          const comments = await Comment.find({ agent: item._id, status: 'public' });
          const validComments = await _.filter(comments, item => item.address);
          const formatComments = await validComments.length === 0 ? [0] :_.map(validComments, (item) => item.address ? item.rate.sum : 0)
          const total = await _.reduce(formatComments, (sum, item) => (sum + item))
          return {...convertData(item), total, comments: comments.length, validComments: validComments.length};
        }))
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

module.exports.find = (query, isPopulate = false, isVerifyCode = false) => {
  return new Promise((resolve, reject) => {
    let userQuery = user.findOne(query)
    if (isPopulate) {
      userQuery = userQuery.populate('city')
    } 
    userQuery.exec(query, (err, res) => {
      if (err || !res) {
        reject({code: 11000});
        return;
      }
      resolve(isVerifyCode ? res : convertData(res));
    });
  });
};

module.exports.delete = id => {
  return new Promise((resolve, reject) => {
    user.findByIdAndRemove(id, (err, res) => {
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
    user.findOne({ email: email }, function (err, data) {
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
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject({ code: 11 });
          return;
        }

        resolve(convertData(data));
      });
    });
  });
};

module.exports.sendEmail = ({ from = APP_CONFIG.adminEmail, to, subject, html }) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from, to, subject, html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject({ code: 11 });
        return;
      }

      resolve(convertData(info));
    });
  })
}

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
  
  delete result.verifyCode;
  delete result._id;
  delete result.__v;
  return result;
};
