var expressJwt = require('express-jwt')

var jwtAuth = expressJwt({
  secret: 'mytoken', // token密钥
  credentialsRequired: true, // false为不进行校验
}).unless({
  path: ['/login'], // 白名单
})

var httpAuth = function (req) {
  // 获取以token为键值，存储在redis里的用户信息
  rds.get(req.token, (err, res) => {
    // 根据用户的权限集判断当前接口
    return judgeRoute(res.permission, req.path)
  })
}

var judgeRoute = function (data, currentRoute) {
  return data.find((item) => {
    // 类型3表示请求接口
    if (item.type == 3) {
      if (item.path == currentRoute) {
        return true
      }
    }
    if (item.children) {
      return judgeRoute(item.children, currentRoute)
    }
  })
}

module.exports = { jwtAuth, httpAuth }
