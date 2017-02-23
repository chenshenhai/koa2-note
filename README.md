# 《koa2进阶学习笔记》

## 持续更新中...

## 附加gitbook快速阅读地址
[https://chenshenhai.github.io/koa2-note/](https://chenshenhai.github.io/koa2-note/)

## 目录
* [koa2开始]()
    * [快速开始](https://github.com/ChenShenhai/koa2-note/blob/master/note/start/quick.md)
    * [async/await使用](https://github.com/ChenShenhai/koa2-note/blob/master/note/start/async.md)
    * [koa2简析结构](https://github.com/ChenShenhai/koa2-note/blob/master/note/start/info.md)
    * [koa中间件开发与使用](https://github.com/ChenShenhai/koa2-note/blob/master/note/start/middleware.md)
* [路由]()
    * [原生koa2实现路由](https://github.com/ChenShenhai/koa2-note/blob/master/note/route/simple.md)
    * [koa-router中间件](https://github.com/ChenShenhai/koa2-note/blob/master/note/route/koa-router.md)
* [请求数据获取]()
    * [GET请求数据获取](https://github.com/ChenShenhai/koa2-note/blob/master/note/request/get.md)
    * [POST请求数据获取](https://github.com/ChenShenhai/koa2-note/blob/master/note/request/post.md)
    * [koa-bodyparser中间件](https://github.com/ChenShenhai/koa2-note/blob/master/note/request/post-use-middleware.md)
* [静态资源加载]()
    * [原生koa2实现静态资源服务器](https://github.com/ChenShenhai/koa2-note/blob/master/note/static/server.md)
    * [koa-static中间件](https://github.com/ChenShenhai/koa2-note/blob/master/note/static/middleware.md)
* [cookie/session]()
    * [koa2使用cookie](https://github.com/ChenShenhai/koa2-note/blob/master/note/cookie/info.md)
    * [koa2实现session](https://github.com/ChenShenhai/koa2-note/blob/master/note/session/info.md)
* [模板引擎]()
    * [koa2加载模板引擎](https://github.com/ChenShenhai/koa2-note/blob/master/note/template/add.md)
    * [ejs模板引擎](https://github.com/ChenShenhai/koa2-note/blob/master/note/template/ejs.md)
* [文件上传]()
    * [busboy模块](https://github.com/ChenShenhai/koa2-note/blob/master/note/upload/busboy.md)
    * [上传文件简单实现](https://github.com/ChenShenhai/koa2-note/blob/master/note/upload/simple.md)
    * [异步上传图片实现](https://github.com/ChenShenhai/koa2-note/blob/master/note/upload/pic-async.md)
* [数据库mysql]()
    * [mysql模块](https://github.com/ChenShenhai/koa2-note/blob/master/note/mysql/info.md)    
    * [async/await封装使用mysql](https://github.com/ChenShenhai/koa2-note/blob/master/note/mysql/async.md)
    * [项目建表初始化](https://github.com/ChenShenhai/koa2-note/blob/master/note/mysql/init.md)
* [项目框架搭建]()
    * [快速启动](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/start.md)
    * [框架设计](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/framework.md)
    * [分层操作](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/layer.md)
    * [数据库设计](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/sql.md)
    * [路由设计](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/route.md)
    * [webpack2环境搭建](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/webpack2.md)
    * [使用react.js](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/react.md)
    * [登录注册功能实现](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/sign.md)
    * [session登录态判断处理](https://github.com/ChenShenhai/koa2-note/blob/master/note/project/session.md) 
* [debug]()
    * [开发debug](https://github.com/ChenShenhai/koa2-note/blob/master/note/debug/info.md)

## 前言
- ES6/7 带来的变革

自ES6确定和ES7的async/await开始普及，node.js的发展变得更加迅速，可以预见到JavaScript中令人“头疼”的多层嵌套回调（注意是”多层嵌套回调“）将会使用Promise + async/await的方式逐渐替代（不是完全替代，多层嵌套回调也有其特殊的应用场景）。

- koa2 大势所趋的前景

基于async/await实现中间体系的koa2框架将会是是node.js web开发方向大势所趋的普及框架。基于generator/yield的koa1将会逐渐被koa2替代，毕竟使用co.js来处理generator是一种过渡的方式，虽然有其特定的应用场景，但是用async/await会更加优雅地实现同步写法。

## 初衷

- 写笔记目的

从学生到工作写了几年的代码，觉得虽然学习新语言，新框架的主要目的是为了解决实际问题，其中更重要的是要每次入门了一门新技术后要及时留下点学习的痕迹，方便以后忘记可以从学习轨迹中迅速上手。

