const path = require('path');
const Koa = require('koa');
const statics = require('./index');

const app = new Koa();

const root = path.join(__dirname, './public');
app.use(statics({ root }));

app.use(async(ctx, next) => {
  if (ctx.path === '/hello') {
    ctx.body = 'hello world';
  }
});

app.listen(3000);
console.log('listening on port 3000');
