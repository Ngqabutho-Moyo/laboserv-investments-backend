module.exports=app=>{
    const controller=require('../controllers/index.js')
    var router=require('express').Router()

    // POST payroll
    router.post('/payrolls/create', controller.createPayroll)

    // POST employee
    router.post('/employees/create', controller.createEmployee)

    // GET payrolls
    router.get('/payrolls', controller.findAllPayrolls)
    router.get('/payroll', controller.findOnePayroll)

    // GET employees
    router.get('/employees', controller.findAllEmployees)

    // GET employee
    router.get('/employee', controller.findOneEmployee)

    // GET COUNT of employees, and SUM of their earnings and deductions
    router.get('/payrolls/sum', controller.sumPayrolls)

    // GET SUM of deductions
    router.get('/employees/deductions', controller.sumDeductions)

    // UPDATE payrolls and employees
    router.put('/employee/update', controller.updateEmployee)
    router.put('/payroll/update', controller.updatePayroll)

    // DELETE payrolls and employees
    router.delete('/employee/delete', controller.deleteEmployee)
    router.delete('/payroll/delete', controller.deletePayroll)

    app.use('/api', router)
}