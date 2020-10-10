const url = require('url')
const rds = require('../../redis')
const { Router } = require('express')
var router = Router()

router.get('/index/data', (req, res, next) => {
  let params = url.parse(req.url, true)
  res.json({
    status: 200,
  })
})

module.exports = router
