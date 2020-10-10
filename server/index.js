const { Router } = require('express')

const router = Router()

const login = require('./routes/login')
const index = require('./routes/index')

router.use(login, index)

module.exports = router
