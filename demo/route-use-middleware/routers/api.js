const router = require('koa-router')()

module.exports = router.get('/get/data.json', async ( ctx )=>{
  ctx.body = {
    success: true,
    data: {
      text: 'hello world!'
    }
  }
}).get('/get/user.json', async ( ctx )=>{
  ctx.body = {
    success: true,
    data: {
      text: 'my name is koa.js!'
    }
  }
})
