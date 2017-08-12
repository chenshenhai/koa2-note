# koa2简析结构

## 源码文件
```
├── lib
│   ├── application.js
│   ├── context.js
│   ├── request.js
│   └── response.js
└── package.json
```
这个就是 `GitHub` [https://github.com/koajs/koa](https://github.com/koajs/koa/)上开源的koa2源码的源文件结构，核心代码就是lib目录下的四个文件

- application.js 是整个koa2 的入口文件，封装了context，request，response，以及最核心的中间件处理流程。
- context.js   处理应用上下文，里面直接封装部分request.js和response.js的方法
- request.js   处理http请求
- response.js  处理http响应

## koa2特性

- 只提供封装好http上下文、请求、响应，以及基于`async/await`的中间件容器。
- 利用ES7的`async/await`的来处理传统回调嵌套问题和代替koa@1的generator，但是需要在node.js 7.x的harmony模式下才能支持`async/await`。
- 中间件只支持 `async/await` 封装的，如果要使用koa@1基于generator中间件，需要通过中间件koa-convert封装一下才能使用。
