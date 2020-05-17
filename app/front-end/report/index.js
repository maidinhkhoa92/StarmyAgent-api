const Request = require('../../services/request');
const Offer = require('../../services/offer');
const User = require('../../services/user');
const APP_CONFIG = require('../../config/APP_CONFIG');
const _ = require('lodash');

module.exports.byAgentID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const saleQuery = { agent: id, type: 'sale' };
    const rentQuery = { agent: id, type: 'rent' };

    const requestSale = await Request.report(saleQuery);
    const requestRent = await Request.report(rentQuery);
    const offerSale = await Offer.report(saleQuery);
    const offerRent = await Offer.report(rentQuery);

    res.status(200).send({
      requestSale,
      requestRent,
      offerSale,
      offerRent
    });
  } catch (err) {
    next(err);
  }
};

module.exports.report = async (req, res, next) => {
  try {
    const { id } = req.decoded;

    const agents = await User.list({ agency: id, type: 'agent' }, -1);
    const numberAgent = agents.totalDocs;
    const discount = await APP_CONFIG.discount(numberAgent);
    if (agents.length > 0) {
      const saleQuery = await {
        $and: [
          { type: 'sale' },
          { $or: _.map(agents.docs, item => ({ agent: item.id })) }
        ]
      }

      const requestSale = await Request.report(saleQuery);
      const offerSale = await Offer.report(saleQuery);

      const rentQuery = await {
        $and: [
          { type: 'rent' },
          { $or: _.map(agents.docs, item => ({ agent: item.id })) }
        ]
      }

      const requestRent = await Request.report(rentQuery);
      const offerRent = await Offer.report(rentQuery);

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