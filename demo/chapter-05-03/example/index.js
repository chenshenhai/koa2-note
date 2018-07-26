const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const body = require('../index');
const app = new Koa();

app.use(body());

app.use(async(ctx, next) => {
  if (ctx.url === '/') {
    // 当GET请求时候返回表单页面
    let html = fs.readFileSync(path.join(__dirname, './index.html'), 'binary');
    ctx.body = html;
  } else if (ctx.url === '/post' && ctx.method === 'POST') {
    // 当POST请求的时候，解析POST表单里的数据，并显示出来
    ctx.body = ctx.request.body;
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
  }

  await next();
});

app.listen(3000, () => {
  console.log('[demo] is starting at port 3000');
});
