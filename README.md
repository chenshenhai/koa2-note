# koa2进阶笔记 (koa2-note)

# 《koa2-note进阶学习笔记》

## 目录
* [koa2开始]()
    * [快速开始](note/start/quick.md)
    * [async/await使用](note/start/async.md)
    * [koa2简析结构](note/start/info.md)
    * [koa中间件开发与使用](note/start/middleware.md)
* [路由]()
    * [原生koa2实现路由](note/route/simple.md)
    * [koa-router中间件](note/route/koa-router.md)
* [请求数据获取]()
    * [GET请求数据获取](note/request/get.md)
    * [POST请求数据获取](note/request/post.md)
    * [koa-bodyparser中间件](note/request/post-use-middleware.md)
* [静态资源加载]()
    * [原生koa2实现静态资源服务器](note/static/server.md)
    * [koa-static中间件](note/static/middleware.md)
* [cookie/session]()
    * [koa2使用cookie](note/cookie/info.md)
    * [koa2实现session](note/session/info.md)
* [模板引擎]()
    * [koa2加载模板引擎](note/template/add.md)
    * [ejs模板引擎](note/template/ejs.md)
* [文件上传]()
    * [busboy模块](note/upload/busboy.md)
    * [上传文件简单实现](note/upload/simple.md)
* [数据库mysql]()
    * [mysql模块](note/mysql/info.md)    
    * [async/await封装使用mysql](note/mysql/async.md)
    * [项目建表初始化](note/mysql/init.md)
* [项目框架搭建]()
    * [快速启动](note/project/start.md)
    * [框架设计](note/project/framework.md)
    * [分层操作](note/project/layer.md)
    * [数据库设计](note/project/sql.md)
    * [路由设计](note/project/route.md)
    * [webpack2环境搭建](note/project/webpack2.md)
    * [使用react.js](note/project/react.md)
    * [登录注册功能实现](note/project/sign.md)
    * [session登录态判断处理](note/project/session.md) 
* [debug]()
    * [开发debug](note/debug/info.md)

## 前言
- ES6/7 带来的变革

自ES6确定和ES7的async/await开始普及，node.js的发展变得更加迅速，可以预见到JavaScript中令人“头疼”的多层嵌套回调（注意是”多层嵌套回调“）将会使用Promise + async/await的方式逐渐替代（不是完全替代，多层嵌套回调也有其特殊的应用场景）。

- koa2 大势所趋的前景

基于async/await实现中间体系的koa2框架将会是是node.js web开发方向大势所趋的普及框架。基于generator/yield的koa1将会逐渐被koa2替代，毕竟使用co.js来处理generator是一种过渡的方式，虽然有其特定的应用场景，但是用async/await会更加优雅地实现同步写法。

## 初衷

- 写笔记目的

从学生到工作写了几年的代码，觉得虽然学习新语言，新框架的主要目的是为了解决实际问题，其中更重要的是要每次入门了一门新技术后要及时留下点学习的痕迹，方便以后忘记可以从学习轨迹中迅速上手。

