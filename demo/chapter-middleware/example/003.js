// 003

const Koa = require('koa');
const app = new Koa();

const middleware = async function(ctx, next) {
  const routes = [
    { 
      method: 'GET', 
      path: '/index', 
      middleware: async function(ctx, next){ 
        ctx.body = '<h1>Index Page</h1>'
      } 
    }
  ]
};

app.use(middleware);

app.use(async(ctx, next) => {
  ctx.body = 'hello world';
});

app.listen(3000, () => {
  console.log('[demo] is starting at port 3000');
});
