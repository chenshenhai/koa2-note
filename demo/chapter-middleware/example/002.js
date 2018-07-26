// 002
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();

const middleware = function() {
  return async function(ctx, next) {
    if (ctx.render) await next();
    ctx.render = function(fileName = '404.html') {
      return new Promise((resolve, reject) => {
        try {
          const fullPath = path.join(__dirname, 'view', fileName);
          let content = `[view] ${fileName} is Not Found`;
          if (fs.existsSync(fullPath)) {
            content = fs.readFileSync(fullPath, 'binary');
          }
          ctx.body = content;
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    };
    await next();
  };
};

// middleware(app)
app.use(middleware());

app.use(async(ctx, next) => {
  if (ctx.path === '/' || ctx.path === '/index' || ctx.path === '/index') {
    await ctx.render('index.html');
  } else {
    await ctx.render('404.html');
  }
});

app.listen(3000, () => {
  console.log('[demo] is starting at port 3000');
});
