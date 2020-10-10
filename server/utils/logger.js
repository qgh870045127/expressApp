var log4js = require('log4js')
// log4js的输出级别6个: trace, debug, info, warn, error, fatal

log4js.configure({
  appenders: {
    //设置控制台输出 （默认日志级别是关闭的（即不会输出日志））
    out: { type: 'console' },
    // 创建日志文件
    // 以日期为单位的文件名 注意设置pattern，alwaysIncludePattern属性
    // maxLogSize:文件最大值（单位byte）
    // backups:备份的文件个数最大值,最新数据覆盖旧数据
    httpLog: {
      type: 'dateFile',
      filename: 'log/error',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      keepFileExt: true,
      backups: 10,
    },
    // 错误日志 type:过滤类型logLevelFilter 将过滤error日志写进指定文件
    error: { type: 'logLevelFilter', level: 'error', appender: 'httpLog' },
  },
  categories: {
    //appenders:采用的appender,取上面appenders项,level:设置级别
    default: { appenders: ['out', 'error'], level: 'info' },
  },
})

global.logger = log4js.getLogger()
const httpLogger = log4js.connectLogger(logger, { level: 'auto' })

module.exports = httpLogger
