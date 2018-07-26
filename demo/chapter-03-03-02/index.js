const Koa = require('koa');
let app = new Koa();

function indirectMiddleware(path, middleware) {
  return async function(ctx, next) {
    console.log(ctx.path === path, middleware);
    if (ctx.path === path) {
      await middleware(ctx, next);
    } else {
      await next();
    }
  };
}

const index = async function(ctx, next) {
  ctx.body = 'this is index page';
};

const hello = async function(ctx, next) {
  ctx.body = 'this is hello page';
};

const world = async function(ctx, next) {
  ctx.body = 'this is world page';
};

app.use(indirectMiddleware('/', index));
app.use(indirectMiddleware('/hello', hello));
app.use(indirectMiddleware('/world', world));

app.listen(3001, () => {
  console.log('the demo is start at port 3001');
});
