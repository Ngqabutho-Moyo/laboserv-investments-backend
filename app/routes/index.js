module.exports = (app) => {
    const controller = require("../controllers/index.js");
    var router = require("express").Router();
  
    // POST payslip
    router.post("/payslips/create", controller.createPayslip);
  
    // POST employee
    router.post("/employees/create", controller.createEmployee);
  
    // GET payslips
    router.get("/payslips", controller.findAllPayslips);
    router.get("/payslip", controller.findOnePayslip);
  
    // GET payslips for specific period
    router.get("/payslips/period", controller.findAllPayslipsInPeriod);
  
    // GET payslips for specific user
    router.get("/payslips/employee", controller.findAllPayslipsForEmployee);
  
    // GET employees
    router.get("/employees", controller.findAllEmployees);
  
    // GET employee
    router.get("/employee", controller.findOneEmployee);
  
    // GET COUNT of employees, and SUM of their earnings and deductions
    router.get("/payslips/summary", controller.payslipSummary);
  
    // GET COUNT of employees, and SUM of their earnings and deductions for specified period
    router.get("/payslips/summary/month", controller.payslipMonthlySummary);
  
    // GET SUM of deductions
    router.get("/employees/deductions", controller.sumDeductions);
  
    // UPDATE payslips and employees
    router.put("/employee/update", controller.updateEmployee);
    router.put("/payslip/update", controller.updatePayslip);
  
    // DELETE payslips and employees
    router.delete("/employee/delete", controller.deleteEmployee);
    router.delete("/payslip/delete", controller.deletePayslip);
  
    app.use("/api", router);
  };
  