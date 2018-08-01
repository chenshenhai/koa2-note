# koa2 中的 async/await 使用

## 举个栗子

- Promise封装 fs 异步读取文件的方法

```js
// code file:  util/render.js
// Promise封装 fs 异步读取文件的方法

const fs = require('fs')

function render( page ) {
  return new Promise(( resolve, reject ) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}

module.exports = render
```

- koa2 通过async/await 实现读取HTML文件并执行渲染

```js
// code file : index.js
// koa2 通过async/await 实现读取HTML文件并执行渲染
const Koa = require('koa')
const render = require('./util/render')
const app = new Koa()

app.use( async ( ctx ) => {
  let html = await render('index.html')
  ctx.body = html
})

app.listen(3000)
console.log('[demo] start-async is starting at port 3000')
```
