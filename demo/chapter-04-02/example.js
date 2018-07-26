const send = require('./index');
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  await send(ctx, ctx.path, { root: `${__dirname}/public` });
});

app.listen(3000);
console.log('listening on port 3000');
