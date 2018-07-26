// 001

const Koa = require('koa');
const app = new Koa();

const middleware = async function(ctx, next) {
  let res = ctx.res;

  // 拦截操作请求 request
  console.log(`<-- ${ctx.method} ${ctx.url}`);

  await next();

  // 拦截操作响应 request
  res.on('finish', () => {
    console.log(`--> ${ctx.method} ${ctx.url}`);
  });
};

app.use(middleware);

app.use(async(ctx, next) => {
  ctx.body = 'hello world';
});

app.listen(3000, () => {
  console.log('[demo] is starting at port 3000');
});
