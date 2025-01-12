const { raw } = require("express");
const db = require("../models");
const sequelize = require("sequelize");
const Employee = db.Employee;
const Payslip = db.Payslip;

/************************************************************EMPLOYEES**********************************************************************/

// Create employee
exports.createEmployee = (req, res) => {
  const pobsContribution = parseFloat(req.body.pobsInsurableEarnings) * 0.09;
  const basicAPWCS = parseFloat(req.body.pobsInsurableEarnings) * 0.0132;

  const employee = {
    ssrNumber: req.body.ssrNumber,
    worksNumber: req.body.worksNumber,
    ssnNumber: req.body.ssnNumber,
    nationalID: req.body.nationalID,
    period: req.body.period,
    birthDate: req.body.birthDate,
    surname: req.body.surname,
    firstName: req.body.firstName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    pobsInsurableEarnings: req.body.pobsInsurableEarnings,
    actualInsurableEarnings: req.body.actualInsurableEarnings,    
    pobsContribution: pobsContribution,
    basicAPWCS: basicAPWCS,
    department: req.body.department,
    bank: req.body.bank,
    branch: req.body.branch,
    accountNumber: req.body.accountNumber,
    medicalAidNumber: req.body.medicalAidNumber,
  };
  Employee.create(employee)
    .then(() => {
      res.status(200).send("Employee created successfully");
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

// Get employees
exports.findAllEmployees = (req, res) => {
  Employee.findAll({
    order: [["id", "ASC"]],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error.messsage);
    });
};

// Get employee
exports.findOneEmployee = (req, res) => {
  const firstName = req.query.firstName;
  const surname = req.query.surname;

  Employee.findOne({
    attributes: [
      "ssrNumber",
      "worksNumber",
      "ssnNumber",
      "nationalID",
      "period",
      "birthDate",
      "surname",
      "firstName",
      "startDate",
      "endDate",
      "pobsInsurableEarnings",
      "pobsContribution",
      "basicAPWCS",
      "actualInsurableEarnings",
      "department",
      "bank",
      "branch",
      "accountNumber",
      "medicalAidNumber"
    ],
    raw: true,
    where: {
      firstName: firstName,
      surname: surname,
    },
  })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("Employee could not be found");
      }
    })
    .catch((error) => {
      res.status(500).send(error.response);
    });
};

// Update employee
exports.updateEmployee = (req, res) => {
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  req.body.pobsContribution = parseFloat(req.body.pobsInsurableEarnings) * 0.09;
  req.body.basicAPWCS = parseFloat(req.body.pobsInsurableEarnings) * 0.0132;

  Employee.update(req.body, {
    where: { firstName: firstName, surname: surname },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send("Employee updated successfully");
      } else {
        res.status(404).send("Employee could not be found");
      }
    })
    .catch((error) => {
      res.status(500).send(error.messsage);
    });
};

// Delete employee
exports.deleteEmployee = (req, res) => {
  const firstName = req.query.firstName;
  const surname = req.query.surname;

  Employee.destroy({
    raw: true,
    where: { firstName: firstName, surname: surname },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send("Employee deleted successfully");
      } else {
        res.status(404).send("Employee could not be found");
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

/***********************************************************PAYSLIPS***********************************************************************/

// Create payslip
exports.createPayslip = (req, res) => {
  let nssaPension;
  try {
    const grossPay =
      parseFloat(req.body.basePay) +
      parseFloat(req.body.housingAllowance) +
      parseFloat(req.body.transportAllowance) +
      parseFloat(req.body.commission);
    if (req.body.basePay * 0.045 > 700) {
      nssaPension = 700;
    } else {
      nssaPension = req.body.basePay * 0.045;
    }
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

    const payslip = {
      month: req.body.month,
      year: req.body.year,
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
      NSSANumber: req.body.NSSANumber,
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
    Payslip.create(payslip).then(
      res.status(200).send("Payslip created successfully")
    );
  } catch (error) {
    res.status(500).send(error.response);
  }
};

// Get payslips
exports.findAllPayslips = (req, res) => {
  try {
    Payslip.findAll({
      attributes: [
        "month",
        "year",
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
      order: [["id", "ASC"]],
    }).then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send(error.response);
  }
};

// Get payslips for a specific employee
exports.findAllPayslipsForEmployee = (req, res) => {
  const firstName = req.query.firstName;

  Payslip.findAll({
    attributes: [
      "month",
      "year",
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
    order: [["id", "ASC"]],
    where: { firstName: firstName },
  })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send("No payslips found for requested period");
      }
    })
    .catch((error) => {
      res.status(500).send(error.response);
    });
};

// Get payslips for a specific month
exports.findAllPayslipsInPeriod = (req, res) => {
  const month = req.query.month;
  const year = req.query.year;

  Payslip.findAll({
    attributes: [
      "month",
      "year",
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
    order: [["id", "ASC"]],
    where: { month: month, year: year },
  })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send("No payslips found for requested period");
      }
    })
    .catch((error) => {
      res.status(500).send(error.response);
    });
};

// Get payslip
exports.findOnePayslip = (req, res) => {
  const idNumber = req.query.idNumber;
  const firstName = req.query.firstName;
  const surname = req.query.surname;
  const month = req.query.month;
  const year = req.query.year;

  Payslip.findOne({
    attributes: [
      "month",
      "year",
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
    raw: true,
    where: {
      idNumber: idNumber,
      firstName: firstName,
      surname: surname,
      month: month,
      year: year,
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

// Update payslip
exports.updatePayslip = (req, res) => {
  const idNumber = req.body.idNumber;

  Payslip.update(req.body, {
    where: { idNumber: idNumber },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send("Payslip updated successfully");
      } else {
        res.status(404).send("ID could not be found");
      }
    })
    .catch((error) => {
      res.status(500).send(error.messsage);
    });
};

// Delete payslip
exports.deletePayslip = (req, res) => {
  const firstName = req.body.firstName;
  const surname = req.body.surname;

  Payslip.destroy({
    raw: true,
    where: { firstName: firstName, surname: surname },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send("Payslip deleted successfully");
      } else {
        res.status(404).send("ID could not be found");
      }
    })
    .catch((error) => {
      res.status(500).send(error.messsage);
    });
};

// Generate payslip summary
exports.payslipSummary = (req, res) => {
  Payslip.findAll({
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("id")), "entries"],
      [sequelize.fn("SUM", sequelize.col("basePay")), "basePay"],
      [sequelize.fn("SUM", sequelize.col("commission")), "commission"],
      [
        sequelize.fn("SUM", sequelize.col("housingAllowance")),
        "housingAllowance",
      ],
      [
        sequelize.fn("SUM", sequelize.col("transportAllowance")),
        "transportAllowance",
      ],
      [sequelize.fn("SUM", sequelize.col("grossPay")), "grossPay"],
      [sequelize.fn("SUM", sequelize.col("payeUSD")), "payeUSD"],
      [sequelize.fn("SUM", sequelize.col("aidsLevyUSD")), "aidsLevyUSD"],
      [sequelize.fn("SUM", sequelize.col("nssaLevyUSD")), "nssaLevyUSD"],
      [
        sequelize.fn("SUM", sequelize.col("totalDeductionsUSD")),
        "totalDeductionsUSD",
      ],
      [sequelize.fn("SUM", sequelize.col("netPayUSD")), "netPayUSD"],
    ],
    raw: true,
  })
    .then((data) => {
      const jsonData = data[0];
      jsonData.WCIF_USD = 0.0132 * parseFloat(jsonData["basePay"]);
      jsonData.standardsDevLevy = 0.01 * parseFloat(jsonData["grossPay"]);
      jsonData.zimdefUSD =
        0.01 *
        (parseFloat(jsonData["grossPay"]) +
          parseFloat(jsonData["nssaLevyUSD"]));
      jsonData.totalEmployerContr =
        parseFloat(jsonData["nssaLevyUSD"]) +
        jsonData.WCIF_USD +
        jsonData.standardsDevLevy +
        jsonData.zimdefUSD;
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(jsonData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.messsage);
    });
};

// Generate monthly payslip summary
exports.payslipMonthlySummary = (req, res) => {
  const month = req.query.month;
  const year = req.query.year;

  Payslip.findAll({
    where: { month: month, year: year },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("id")), "entries"],
      [sequelize.fn("SUM", sequelize.col("basePay")), "basePay"],
      [sequelize.fn("SUM", sequelize.col("commission")), "commission"],
      [
        sequelize.fn("SUM", sequelize.col("housingAllowance")),
        "housingAllowance",
      ],
      [
        sequelize.fn("SUM", sequelize.col("transportAllowance")),
        "transportAllowance",
      ],
      [sequelize.fn("SUM", sequelize.col("grossPay")), "grossPay"],
      [sequelize.fn("SUM", sequelize.col("payeUSD")), "payeUSD"],
      [sequelize.fn("SUM", sequelize.col("aidsLevyUSD")), "aidsLevyUSD"],
      [sequelize.fn("SUM", sequelize.col("nssaLevyUSD")), "nssaLevyUSD"],
      [
        sequelize.fn("SUM", sequelize.col("totalDeductionsUSD")),
        "totalDeductionsUSD",
      ],
      [sequelize.fn("SUM", sequelize.col("netPayUSD")), "netPayUSD"],
    ],
    raw: true,
  })
    .then((data) => {
      const jsonData = data[0];
      jsonData.WCIF_USD = 0.0132 * parseFloat(jsonData["basePay"]);
      jsonData.zimdefUSD =
        0.01 *
        (parseFloat(jsonData["grossPay"]) +
          parseFloat(jsonData["nssaLevyUSD"]));
      jsonData.standardsDevLevy = 0.01 * parseFloat(jsonData["grossPay"]);
      jsonData.totalEmployerContr =
        parseFloat(jsonData["nssaLevyUSD"]) +
        jsonData.WCIF_USD +
        jsonData.standardsDevLevy +
        jsonData.zimdefUSD;
      res.status(200).send(jsonData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.messsage);
    });
};

// Get total deductions
exports.sumDeductions = (req, res) => {
  Employee.findAll({
    attributes: [
      [
        sequelize.fn("SUM", sequelize.col("pobsContribution")),
        "pobsContribution",
      ],
      [sequelize.fn("SUM", sequelize.col("basicAPWCS")), "basicAWPCS"],
    ],
    raw: true,
  })
    .then((data) => {
      const jsonData = data[0];
      jsonData.totalNSSAPayable =
        parseFloat(jsonData["pobsContribution"]) +
        parseFloat(jsonData["basicAWPCS"]);
      res.status(200).send(jsonData);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};
