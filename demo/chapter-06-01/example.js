
const Koa = require('koa');
const Router = require('./index');
const app = new Koa();
const router = new Router();

router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.get('/item', async ctx => { ctx.body = 'item page'; });

app.use(router.routes());

app.use(async ctx => {
  ctx.body = '404';
});

app.listen(3000);
console.log('listening on port 3000');
