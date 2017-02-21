# 路由设计

## 使用koa-router中间件

### 路由目录
```sh
# ...
└── server # 后端代码目录
    └── routers
        ├── admin.js # /admin/* 子路由
        ├── api.js #  resetful /api/* 子路由
        ├── error.js #   /error/* 子路由
        ├── home.js # 主页子路由
        ├── index.js # 子路由汇总文件
        └── work.js # /work/* 子路由
 # ...
```

### 子路由配置

### resetful API 子路由
例如api子路由/user/getUserInfo.json，整合到主路由，加载到中间件后，请求的路径会是 http://www.example.com/api/user/getUserInfo.json

./demos/project/server/routers/api.js
```js
/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')

const routers = router
  .get('/user/getUserInfo.json', userInfoController.getLoginUserInfo)
  .post('/user/signIn.json', userInfoController.signIn)
  .post('/user/signUp.json', userInfoController.signUp)

module.exports = routers
```

#### 子路由汇总
./demos/project/server/routers/index.js
```js
/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const api = require('./api')
const admin = require('./admin')
const work = require('./work')
const error = require('./error')

router.use('/', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/work', work.routes(), work.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())
module.exports = router
```

#### app.js加载路由中间件
./demos/project/server/app.js
```js
const routers = require('./routers/index')

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
```



