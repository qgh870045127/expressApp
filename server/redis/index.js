var rds = {}
var db = require('../db')
var redis = require('redis')
const { Logger } = require('log4js')
var client = redis.createClient({
  auth_pass: '123456',
})
client.on('error', function (err) {
  console.log('Error :', err)
})

client.on('connect', function () {
  console.log('Redis连接成功.')
})

/**
 * 添加string类型的数据
 * @param key 键
 * @params value 值
 * @params expire (过期时间,单位秒;可为空，为空表示不过期)
 */
rds.set = function (key, value, expire) {
  client.set(key, value, function (err, result) {
    if (err) {
      throw err
    }
    if (!isNaN(expire) && expire > 0) {
      client.expire(key, parseInt(expire))
    }
  })
}
/**
 * 查询string类型的数据
 * @param key 键
 * @param callBack(err,result)
 */
rds.get = function (key, callback) {
  client.get(key, function (err, result) {
    if (err) {
      throw err
    }
    callback(result)
  })
}

/**
 * 查询是否存在
 * @param key 键
 * @param callBack(err,result)
 */
rds.exists = function (key, callback) {
  client.exists(key, function (err, result) {
    if (err) {
      throw err
    }
    callback(result)
  })
}

module.exports = rds
