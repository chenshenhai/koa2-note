const Koa = require('koa');
let app = new Koa();

const middleware = async function(ctx, next) {
  // 中间件 拦截响应
  // 把所有响应结果设置成文本类型
  ctx.response.type = 'text/plain';
  await next();
}

const page = async function(ctx, next) {
  ctx.body = `
      <html>
        <head></head>
        <body>
          <h1>${ctx.path}</h1>
        </body>
      </html>
    `; 
}

app.use(middleware);
app.use(page);

app.listen(3001, function(){
  console.log('the demo is start at port 3001');
})