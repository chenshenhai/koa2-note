# session登录态判断处理

## 使用session中间件
```js
// code ...
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const config = require('./../config')

// code ...

const app = new Koa()

// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))
// code ...
```

## 登录成功后设置session到MySQL和设置sessionId到cookie
```js
let session = ctx.session
session.isLogin = true
session.userName = userResult.name
session.userId = userResult.id
```

## 需要判断登录态页面进行session判断
```js
async indexPage ( ctx ) {
    // 判断是否有session
    if ( ctx.session && ctx.session.isLogin && ctx.session.userName ) {
      const title = 'work页面'
      await ctx.render('work', {
        title,
      })
    } else {
      // 没有登录态则跳转到错误页面
      ctx.redirect('/error')
    }
  },
```
