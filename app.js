var http = require('http')
var express = require('express')
var app = express()
var server = http.createServer(app)
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var httpLogger = require('./server/utils/logger')

// 日志
app.use(httpLogger)

// token校验
var jwtAuth = require('./server/utils/auth').jwtAuth

// 路由权限校验
var httpAuth = require('./server/utils/auth').httpAuth

app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)

// 解析cookies
app.use(cookieParser())

// 解析body
app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

app.use(jwtAuth, (err, req, res, next) => {
  if (err.status == 401) {
    res.json({
      status: 401,
      msg: '无效的token！',
    })
  } else {
    if (httpAuth(req)) {
      next()
    } else {
      res.json({
        status: 501,
        msg: '暂无权限！',
      })
    }
  }
})

// 路由
const api = require('./server')
app.use('/', api)

module.exports = { app, server }
