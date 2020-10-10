## 介绍
该项目使用express搭建，使用jwt实现token验证，使用log4js保存错误日志。
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