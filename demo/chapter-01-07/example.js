const SimpleKoa = require('./index');

const app = new SimpleKoa();
const PORT = 3001;

app.use(async ctx => {
  ctx.body = '<p>this is a body</p>';
});

app.listen(PORT, () => {
  console.log(`the web server is starting at port ${PORT}`);
});
