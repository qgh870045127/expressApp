const jwt = require('jsonwebtoken')
const db = require('../../db')
const rds = require('../../redis')
const { Router } = require('express')
const crypto = require('../../utils/crypto')

var router = Router()

router.post('/login', (req, res, next) => {
  let { username, password } = req.body
  let token = jwt.sign({ username }, 'mytoken', {
    expiresIn: 3600 * 24, // 单位秒
  })
  // 查询用户信息以及所在分组
  let result = db.select('xxx')
  // 缓存到redis，后续会用到（例如路由权限匹配）
  rds.set(token, result)
  // 前端密码md5加密并使用公钥二次加密，服务端使用私钥解密进行匹配
  if (
    result.username == username &&
    result.password == crypto.decrypt(password)
  ) {
    res.json({
      msg: '登录成功！',
      status: 200,
    })
  } else {
    res.json({
      msg: '账号或密码不正确！',
      status: 405,
    })
  }
})

router.post('/register', (req, res, next) => {
  let { username, password } = req.body
  // 校验用户名
  let result = db.select()
  if (!result) {
    res.json({
      msg: '该用户已注册！',
      status: 405,
    })
  }
  // 密码私钥解密 密码以md5值保存到数据库
  password = crypto.decrypt(password)
  db.insert(() => {
    res.json({
      msg: '注册成功！',
      status: 200,
    })
  })
})

module.exports = router
