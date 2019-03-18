const router = require('express').Router()
const userController = require('../controller/userController')
const googleController = require('../controller/googleController')

router.post('/', userController.create)

router.post('/login', userController.findOne)

router.post('/login/google', googleController.signin)

router.post('/verification', googleController.tokenVerification)


module.exports = router