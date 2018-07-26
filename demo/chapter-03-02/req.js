const Koa = require('koa');
let app = new Koa();

const middleware = async function(ctx, next) {
  // 中间件 拦截请求
  // 把所有请求不是 /page/ 开头的路径全部抛出500错误
  const reqPath = ctx.request.path;
  if( reqPath.indexOf('/page/') !== 0 ) {
    ctx.throw(500)
  }
  await next();
}

const page = async function(ctx, next) {
  ctx.body = `
      <html>
        <head></head>
        <body>
          <h1>${ctx.request.path}</h1>
        </body>
      </html>
    `; 
}

app.use(middleware);
app.use(page);

app.listen(3001, function(){
  console.log('the demo is start at port 3001');
})