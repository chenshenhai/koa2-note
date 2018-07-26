const Koa = require('koa');
const path = require('path');
const view = require('./index');
const app = new Koa();

view(app, {
  baseDir: path.join(__dirname, 'views')
});

app.use(async ctx => {
  await ctx.view(`${ctx.path}.html`, {
    title: 'index page'
  });
});

app.listen(3000, () => {
  console.log('[demo] view is starting at port 3000');
});
