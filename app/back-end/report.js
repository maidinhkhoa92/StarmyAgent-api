const Report = require('../services/report');
const User = require('../services/user');
const APP_CONFIG = require('../config/APP_CONFIG');
const { getCurrentMonthYear } = require("../helper/moment");

module.exports.list = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = {
      user: id
    }
    const data = await Report.list(query, -1)

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.currentReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const time = await getCurrentMonthYear();
    const data = await Report.detail(time, id);

    if (data) {
      const { requestRent, requestSale, offerRent, offerSale } = data;

      // get discount
      const agents = await User.list({ agency: id, type: 'agent' }, -1);
      const numberAgent = agents.totalDocs;
      const discount = await APP_CONFIG.discount(numberAgent);


      const total = (requestRent * 2 + requestSale * 4 + offerRent * 5 + offerSale * 8) * discount / 100

      res.status(200).send({
        requestSale,
        requestRent,
        offerSale,
        offerRent,
        numberAgent,
        discount,
        total
      });
    } else {
      res.status(200).send({
        requestSale: 0,
        requestRent: 0,
        offerSale: 0,
        offerRent: 0,
        numberAgent: 0,
        discount,
        total: 0
      });
    }
  } catch (err) {
    next(err);
  }
};