const { json } = require("sequelize");
const db = require("../models");
const Payroll = db.Payroll;
const Op = db.Sequelize.Op;

// Create payroll
exports.create = (req, res) => {
  try {    
    const grossPay =
      parseInt(req.body.basePay) +
      parseInt(req.body.housingAllowance) +
      parseInt(req.body.transportAllowance) +
      parseInt(req.body.commission);
    const nssaPension = req.body.basePay * 0.045;
    const taxableIncome = grossPay - nssaPension;
    let paye = 0;
    switch (true) {
      case taxableIncome >= 0 && taxableIncome <= 100:
        paye = 0;
        break;
      case taxableIncome >= 100.01 && taxableIncome <= 300:
        paye = taxableIncome * 0.2 - 20;
        break;
      case taxableIncome >= 300.01 && taxableIncome <= 1000:
        paye = taxableIncome * 0.25 - 35;
        break;
      case taxableIncome >= 1000.01 && taxableIncome <= 2000:
        paye = taxableIncome * 0.3 - 85;
        break;
      case taxableIncome >= 2000.01 && taxableIncome <= 3000:
        paye = taxableIncome * 0.35 - 185;
        break;
      case taxableIncome >= 3000.01:
        paye = taxableIncome * 0.4 - 335;
        break;
    }
    const aidsLevy = paye * 0.03;
    const totalDeductions = paye + aidsLevy + nssaPension;
    const netPay = grossPay - totalDeductions;

    const payroll = {
      firstName: req.body.firstName,
      surname: req.body.surname,
      worksNumber: req.body.worksNumber,
      grade: req.body.grade,
      department: req.body.department,
      idNumber: req.body.idNumber,
      dateJoined: req.body.dateJoined,
      daysTaken: req.body.daysTaken,
      leaveBalance: req.body.leaveBalance,
      loan: req.body.loan,
      nssaNumber: req.body.nssaNumber,
      medicalAidNumber: req.body.medicalAidNumber,
      bank: req.body.bank,
      branch: req.body.branch,
      accountNumber: req.body.accountNumber,
      basePay: req.body.basePay,
      housingAllowance: req.body.housingAllowance,
      transportAllowance: req.body.transportAllowance,
      commission: req.body.commission,
      grossPay: grossPay,
      payeUSD: paye,
      aidsLevyUSD: aidsLevy,
      nssaLevyUSD: nssaPension,
      totalDeductionsUSD: totalDeductions,
      netPayUSD: netPay,
    };
    // res.send(`Gross Pay:\n${grossPay}`)
    Payroll.create(payroll).then(
      res.status(200).send("Payroll created successfully")
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get payrolls
exports.findAll = (req, res) => {
  try {
    Payroll.findAll({
      attributes: [
        "firstName",
        "surname",
        "worksNumber",
        "grade",
        "department",
        "idNumber",
        "dateJoined",
        "daysTaken",
        "leaveBalance",
        "loan",
        "NSSANumber",
        "medicalAidNumber",
        "bank",
        "branch",
        "accountNumber",
        "basePay",
        "transportAllowance",
        "housingAllowance",
        "commission",
        "grossPay",
        "payeUSD",
        "aidsLevyUSD",
        "nssaLevyUSD",
        "totalDeductionsUSD",
        "netPayUSD",
      ],
    }).then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
