const Koa = require('koa');
let app = new Koa();

const middleware = async function(ctx, next) {
  // 中间件 挂载上下文
  // 把所有当前服务的进程PID，内存使用情况方法挂载在ctx上
  ctx.getServerInfo = function() {
    function parseMem( mem = 0 ) {
      let memVal = mem / 1024 / 1024;
      memVal = memVal.toFixed(2) + 'MB';
      return memVal;
    }
    
    function getMemInfo() {
      let memUsage = process.memoryUsage();
      let rss = parseMem(memUsage.rss);
      let heapTotal = parseMem(memUsage.heapTotal);
      let heapUsed =  parseMem(memUsage.heapUsed);
      return {
        pid: process.pid,
        rss,
        heapTotal,
        heapUsed
      }
    }
    return getMemInfo()
  };
  await next();
}

const page = async function(ctx, next) {
  const serverInfo = ctx.getServerInfo();
  ctx.body = `
      <html>
        <head></head>
        <body>
          <p>${JSON.stringify(serverInfo)}</p>
        </body>
      </html>
    `; 
}

app.use(middleware);
app.use(page);

app.listen(3001, function(){
  console.log('the demo is start at port 3001');
})