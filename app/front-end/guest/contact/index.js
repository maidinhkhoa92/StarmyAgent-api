const contact = require("../../../services/contact");
const property = require("../../../services/property");
const user = require("../../../services/user")
const { validationResult } = require("express-validator");
const { getCurrentMonthYear } = require("../../../helper/moment");
const report = require("../../../services/report");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { property : property_id, agent : agent_id, email } = req.body;

    // check if client applied
    const oldContactQuery = {
      email,
      agent: agent_id,
      property: property_id
    }
    const oldContact = await contact.findOne(oldContactQuery)
    if (oldContact) {
      throw ({ code: 12 })
    }

    // Check if Property exist
    const Property = await property.detail(property_id)
    if (!Property) {
      throw ({ code: 8 })
    }

    // Check if Agent exist
    const Agent = await user.detail(agent_id);
    if (!Agent) {
      throw ({ code: 8 })
    }

    /* 
    ******save report *******
    */
   const time = await getCurrentMonthYear();

   // Check report is existed or not
   const Report = await report.detail(time, agent_id)
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
       user: agent_id,
       requestRent: type === 'rent' ? 1 : 0,
       requestSale: type === 'sale' ? 1 : 0
     }
   }
   await report.createOrUpdate(time, agent_id, dataReport)

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

  const data = await contact.create(req.body);

  res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.sendEmail = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const data = await contact.sendEmail(req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.newAgency = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const data = await contact.newAgency(req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};