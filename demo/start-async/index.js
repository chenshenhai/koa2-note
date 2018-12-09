const Koa = require('koa')
const render = require('./util/render')
const app = new Koa()

app.use( async ( ctx ) => {
  let html = await render('index.html')
  ctx.body = html
})

app.listen(3000, () => {
  console.log('[demo] start-async is starting at port 3000')
})

