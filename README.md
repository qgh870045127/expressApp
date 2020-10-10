## 介绍
一个express模板，包含了登录注册、token生成和认证、路由权限以及错误日志功能。
该项目主要运用了以下技术：
- 使用jsonwebtoken生成token票证，配合express-jwt验证token有效性
- 使用log4js处理错误日志，以当天日期命名文件，记录最近十天的错误信息
- 使用redis缓存信息
- 使用mysql-pool连接数据库
## 目录结构
```
myApp
├─ .gitignore
├─ app.js
├─ bin
│  └─ www
├─ log
│  └─ error.2020-10-10.log
├─ package.json
├─ README.md
└─ server
   ├─ db
   │  ├─ config.json
   │  └─ index.js
   ├─ index.js
   ├─ key
   │  ├─ private_key.pem
   │  └─ public_key.pem
   ├─ redis
   │  └─ index.js
   ├─ routes
   │  ├─ index
   │  │  └─ index.js
   │  └─ login
   │     └─ index.js
   └─ utils
      ├─ auth.js
      ├─ crypto.js
      └─ logger.js

```