const moment = require('moment');

module.exports.getCurrentMonthYear = time => {
    return moment().format('MM/YYYY');
  };