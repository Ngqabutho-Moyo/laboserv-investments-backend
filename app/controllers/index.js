const db = require("../models");
const sequelize = require("sequelize");
const Employee = db.Employee;
const Payroll = db.Payroll;

/****************************************EMPLOYEES***********************************************************/

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
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Update employee

// Delete employee

/*****************************************PAYROLLS***********************************************************/
// Create payroll
exports.createPayroll = (req, res) => {
  try {
    const grossPay =
      parseFloat(req.body.basePay) +
      parseFloat(req.body.housingAllowance) +
      parseFloat(req.body.transportAllowance) +
      parseFloat(req.body.commission);
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
    Payroll.create(payroll).then(
      res.status(200).send("Payroll created successfully")
    );
  } catch (error) {
    res.status(500).send(error.response);
  }
};

// Get payrolls
exports.findAllPayrolls = (req, res) => {
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
        "nssaNumber",
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
      order:[['id', 'ASC']]
    }).then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send(error.response);
  }
};

// Get one payroll
exports.findOnePayroll = (req, res) => {
  const idNumber = req.body.idNumber;

  Payroll.findOne({ where: { idNumber: idNumber } })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("ID could not be found");
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

// Update employee
exports.updateEmployee = (req, res) => {
  const nationalID = req.body.nationalID;

  Employee.update(req.body, {
    where: { nationalID: nationalID },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send("Employee updated successfully");
      } else {
        res.status(404).send("ID could not be found");
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Update payroll
exports.updatePayroll = (req, res) => {
  const idNumber = req.body.idNumber;

  Payroll.update(req.body, {
    where: { idNumber: idNumber },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send("Payroll updated successfully");
      } else {
        res.status(404).send("ID could not be found");
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// Delete employee and payroll

// Get sum of salaries, earnings and deductions
exports.sumPayrolls = (req, res) => {
  Payroll.findAll({
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
      res.setHeader("Content-Type", "application/json");
      const jsonData = data[0];
      jsonData.WCIF_USD = 0.0134 * parseFloat(jsonData["basePay"]);
      jsonData.standardsDevLevy = 0.01 * parseFloat(jsonData["grossPay"]);
      res.status(200).send(jsonData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};
