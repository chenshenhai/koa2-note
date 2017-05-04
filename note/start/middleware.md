# koa中间件开发和使用

> 注：原文地址在我的博客issue里[https://github.com/ChenShenhai/blog/issues/15](https://github.com/ChenShenhai/blog/issues/15)

- koa v1和v2中使用到的中间件的开发和使用
- generator 中间件开发在koa v1和v2中使用
- async await 中间件开发和只能在koa v2中使用

## generator中间件开发

### generator中间件开发

> generator中间件返回的应该是function * () 函数

```js
/* ./middleware/logger-generator.js */
function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
    return function * ( next ) {

        // 执行中间件的操作
        log( this )

        if ( next ) {
            yield next
        }
    }
}
```

### generator中间件在koa@1中的使用

> generator 中间件在koa v1中可以直接use使用

```js
const koa = require('koa')  // koa v1
const loggerGenerator  = require('./middleware/logger-generator')
const app = koa()

app.use(loggerGenerator())

app.use(function *( ) {
    this.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```

### generator中间件在koa@2中的使用
> generator 中间件在koa v2中需要用koa-convert封装一下才能使用

```js
const Koa = require('koa') // koa v2
const convert = require('koa-convert')
const loggerGenerator  = require('./middleware/logger-generator')
const app = new Koa()

app.use(convert(loggerGenerator()))

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```


## async中间件开发

### async 中间件开发


```js
/* ./middleware/logger-async.js */

function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
  return async function ( ctx, next ) {
    log(ctx);
    await next()
  }
}

```

### async 中间件在koa@2中使用

> async 中间件只能在 koa v2中使用

```js
const Koa = require('koa') // koa v2
const loggerAsync  = require('./middleware/logger-async')
const app = new Koa()

app.use(loggerAsync())

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```
