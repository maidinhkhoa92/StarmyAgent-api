const offer = require("../../../services/offer");
const user = require("../../../services/user");
const report = require("../../../services/report");
const { validationResult } = require("express-validator");
const { getCurrentMonthYear } = require("../../../helper/moment");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { agent, email, telephone } = req.body;
    let twice = false;

    // check if client applied
    const oldRequestQuery = {
      email,
      agent
    }
    const oldRequest = await request.findOne(oldRequestQuery)
    if (oldRequest) {
      throw ({ code: 12 })
    }

    // Check if Agent exist
    const Agent = await user.detail(agent);
    if (!Agent) {
      throw ({ code: 8 })
    }

    // Check if offer exist
    const query = {
      email,
      telephone
    }
    const Offer = await offer.findOne(query)
    if (Offer) {
      twice = true
    }

    /* 
    ******save report *******
    */
    const time = await getCurrentMonthYear();

    // Check report is existed or not
    const Report = await report.detail(time, agent)
    // Create new report if doesn't exist, update if exist
    let dataReport = {}
    if (Report) {
      dataReport = {
        offerRent: req.body.type === 'rent' ? Report.offerRent + 1 : Report.offerRent,
        offerSale: req.body.type === 'sale' ? Report.offerSale + 1 : Report.offerSale
      }
    } else {
      dataReport = {
        date: time,
        user: agent,
        offerRent: req.body.type === 'rent' ? 1 : 0,
        offerSale: req.body.type === 'sale' ? 1 : 0
      }
    }
    await report.createOrUpdate(time, agent, dataReport)

    // check if have agency, create report for agency
    if (Agent.agency) {
      // Check report is existed or not
      const ReportAgency = await report.detail(time, Agent.agency)
      // Create new report if doesn't exist, update if exist
      let dataReportAgency = {}
      if (ReportAgency) {
        dataReportAgency = {
          offerRent: req.body.type === 'rent' ? ReportAgency.offerRent + 1 : ReportAgency.offerRent,
          offerSale: req.body.type === 'sale' ? ReportAgency.offerSale + 1 : ReportAgency.offerSale
        }
      } else {
        dataReportAgency = {
          date: time,
          user: Agent.agency,
          offerRent: req.body.type === 'rent' ? 1 : 0,
          offerSale: req.body.type === 'sale' ? 1 : 0
        }
      }
      await report.createOrUpdate(time, Agent.agency, dataReportAgency)
    }

    const data = await offer.create(req.body, Agent, twice);
    res.status(200).send(data);
  } catch (err) {
    console.log(err)
    next(err);
  }
};
