# koa2加载模板引擎

## 快速开始

### 安装模块
```sh
# 安装koa模板使用中间件
npm install --save koa-views

# 安装ejs模板引擎
npm install --save ejs
```


### 使用模板引擎

demo源码

[https://github.com/ChenShenhai/koa2-note/blob/master/demo/ejs/](https://github.com/ChenShenhai/koa2-note/blob/master/demo/ejs/)

#### 文件目录
```
├── package.json
├── index.js
└── view
    └── index.ejs
```

#### ./index.js文件
```js
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000)
```

#### ./view/index.ejs 模板
```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
</body>
</html>
```
