# 《Koa2进阶学习笔记》

<img src="https://user-images.githubusercontent.com/8216630/28377878-d0fdc62a-6ce0-11e7-8099-595ab20d41a3.png"  width="320"/>

## 持续更新中...

## 附加gitbook快速阅读地址
[https://chenshenhai.github.io/koa2-note/](https://chenshenhai.github.io/koa2-note/)

## 目录
* [1. koa2开始]()
    * [1.1 快速开始](https://github.com/ChenShenhai/koa2-note/blob/master/note/start/quick.md)
    * [1.2 async/await使用](https://github.com/ChenShenhai/koa2-note/blob/master/note/start/async.md)
    * [1.3 koa2简析结构](https://github.com/ChenShenhai/koa2-note/blob/master/note/start/info.md)
    * [1.4 koa中间件开发与使用](https://github.com/ChenShenhai/koa2-note/blob/master/note/start/middleware.md)
* [2. 路由]()
    * [2.1 原生koa2实现路由](https://github.com/ChenShenhai/koa2-note/blob/master/note/route/simple.md)
    * [2.2 koa-router中间件](https://github.com/ChenShenhai/koa2-note/blob/master/note/route/koa-router.md)
* [3. 请求数据获取]()
    * [3.1 GET请求数据获取](https://github.com/ChenShenhai/koa2-note/blob/master/note/request/get.md)
    * [3.2 POST请求数据获取](https://github.com/ChenShenhai/koa2-note/blob/master/note/request/post.md)
    * [3.3 koa-bodyparser中间件](https://github.com/ChenShenhai/koa2-note/blob/master/note/request/post-use-middleware.md)
* [4. 静态资源加载]()
    * [4.1 原生koa2实现静态资源服务器](https://github.com/ChenShenhai/koa2-note/blob/master/note/static/server.md)
    * [4.2 koa-static中间件](https://github.com/ChenShenhai/koa2-note/blob/master/note/static/middleware.md)
* [5. cookie/session]()
    * [5.1 koa2使用cookie](https://github.com/ChenShenhai/koa2-note/blob/master/note/cookie/info.md)
    * [5.2 koa2实现session](https://github.com/ChenShenhai/koa2-note/blob/master/note/session/info.md)
* [6. 模板引擎]()
    * [6.1 koa2加载模板引擎](https://github.com/ChenShenhai/koa2-note/blob/master/note/template/add.md)
    * [6.2 ejs模板引擎](https://github.com/ChenShenhai/koa2-note/blob/master/note/template/ejs.md)
* [7. 文件上传]()
    * [7.1 busboy模块](https://github.com/ChenShenhai/koa2-note/blob/master/note/upload/busboy.md)
    * [7.2 上传文件简单实现](https://github.com/ChenShenhai/koa2-note/blob/master/note/upload/simple.md)
    * [7.3 异步上传图片实现](https://github.com/ChenShenhai/koa2-note/blob/master/note/upload/pic-async.md)
* [8. 数据库mysql]()
    * [8.1 mysql模块](https://github.com/ChenShenhai/koa2-note/blob/master/note/mysql/info.md)    
    * [8.2 async/await封装使用mysql](https://github.com/ChenShenhai/koa2-note/blob/master/note/mysql/async.md)
    * [8.3 项目建表初始化](https://github.com/ChenShenhai/koa2-note/blob/master/note/mysql/init.md)
* [9. JSONP实现]()
    * [9.1 原生koa2实现JSONP](https://github.com/ChenShenhai/koa2-note/blob/master/note/jsonp/info.md)
    * [9.2 koa-jsonp中间件](https://github.com/ChenShenhai/koa2-note/blob/master/note/jsonp/koa-jsonp.md)
* [10. 测试]()
    * [10.1 单元测试](https://github.com/ChenShenhai/koa2-note/blob/master/note/test/unit.md)
* [11. debug]()
    * [11.1 开发debug](https://github.com/ChenShenhai/koa2-note/blob/master/note/debug/info.md)
* [12. 项目框架搭建]()
    * [12.1 快速启动](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/start.md)
    * [12.2 框架设计](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/framework.md)
    * [12.3 分层操作](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/layer.md)
    * [12.4 数据库设计](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/sql.md)
    * [12.5 路由设计](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/route.md)
    * [12.6 webpack2环境搭建](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/webpack2.md)
    * [12.7 使用react.js](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/react.md)
    * [12.8 登录注册功能实现](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/sign.md)
    * [12.9 session登录态判断处理](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/session.md) 


## 前言
- ES6/7 带来的变革

自ES6确定和ES7的async/await开始普及，node.js的发展变得更加迅速，可以预见到JavaScript中令人“头疼”的多层嵌套回调（注意是”多层嵌套回调“）将会使用Promise + async/await的方式逐渐替代（不是完全替代，多层嵌套回调也有其特殊的应用场景）。

- koa2 大势所趋的前景

基于async/await实现中间体系的koa2框架将会是是node.js web开发方向大势所趋的普及框架。基于generator/yield的koa1将会逐渐被koa2替代，毕竟使用co.js来处理generator是一种过渡的方式，虽然有其特定的应用场景，但是用async/await会更加优雅地实现同步写法。

## 初衷

- 写笔记目的

从学生到工作写了几年的代码，觉得虽然学习新语言，新框架的主要目的是为了解决实际问题，其中更重要的是要每次入门了一门新技术后要及时留下点学习的痕迹，方便以后忘记可以从学习轨迹中迅速上手。

