const Koa = require('koa');
const jsonp = require('./index');
const app = new Koa();

jsonp(app, {});

app.use(async ctx => {
  await ctx.jsonp({
    data: 'this is a demo',
    success: true
  });
});

app.listen(3000, () => {
  console.log('[demo] jsonp is starting at port 3000');
});
