const request = require("../../../services/request");
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
    const { agent, type } = req.body

    // Check if Agent exist
    const Agent = await user.detail(agent);
    if (!Agent) {
      throw ({ code: 8 })
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
        requestRent: type === 'rent' ? Report.requestRent + 1 : Report.requestRent,
        requestSale: type === 'sale' ? Report.requestSale + 1 : Report.requestSale
      }
    } else {
      dataReport = {
        date: time,
        user: agent,
        requestRent: type === 'rent' ? 1 : 0,
        requestSale: type === 'sale' ? 1 : 0
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
          requestRent: type === 'rent' ? ReportAgency.requestRent + 1 : ReportAgency.requestRent,
          requestSale: type === 'sale' ? ReportAgency.requestSale + 1 : ReportAgency.requestSale
        }
      } else {
        dataReportAgency = {
          date: time,
          user: Agent.agency,
          requestRent: type === 'rent' ? 1 : 0,
          requestSale: type === 'sale' ? 1 : 0
        }
      }
      await report.createOrUpdate(time, Agent.agency, dataReportAgency)
    }

    const data = await request.create(req.body, Agent);
    res.status(200).send(data);
  } catch (err) {
    console.log(err)
    next(err);
  }
};
