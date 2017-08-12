const Koa = require('koa')
const jsonp = require('koa-jsonp')
const app = new Koa()

// 使用中间件
app.use(jsonp())

app.use( async ( ctx ) => {
  
  let returnData = {
    success: true,
    data: {
      text: 'this is a jsonp api',
      time: new Date().getTime(),
    }
  }

  ctx.body = returnData
})

app.listen(3000, () => {
  console.log('[demo] jsonp is starting at port 3000')
})
