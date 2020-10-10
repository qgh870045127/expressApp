var fs = require('fs')
var path = require('path')
var crypto = require('crypto')

var keyPath = path.join(__dirname, '../key/')

var public_key = fs
  .readFileSync(keyPath + 'public_key.pem')
  .toString('ascii')
var private_key = fs
  .readFileSync(keyPath + 'private_key.pem')
  .toString('ascii')

module.exports = {
  encrypt: function (data) {
    //公钥加密
    return crypto.publicEncrypt(public_key, data)
  },
  decrypt: function (decrypted) {
    //私钥解密
    return crypto.privateDecrypt(private_key, decrypted).toString()
  },
  md5crypt: function (data) {
    // md5加密
    var hash = crypto.createHash('md5')
    hash.update(data)
    return hash.digest('hex');
  }
}