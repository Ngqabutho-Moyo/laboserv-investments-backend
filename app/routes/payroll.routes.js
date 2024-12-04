module.exports=app=>{
    const payrolls=require('../controllers/payroll.controller.js')
    var router=require('express').Router()

    // POST payroll
    router.post('/create', payrolls.create)

    // GET payrolls
    router.get('/', payrolls.findAll)

    app.use('/api/payrolls', router)
}