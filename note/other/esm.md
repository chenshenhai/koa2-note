## 前言
 Node 9最激动人心的是提供了在flag模式下使用`ECMAScript Modules`，虽然现在还是`Stability: 1 - Experimental`阶段，但是可以让Noder抛掉babel等工具的束缚，直接在Node环境下愉快地去玩耍`import/export`

如果觉得文字太多，看不下去，可以直接去玩玩demo，地址是[https://github.com/chenshenhai/node-modules-demo](https://github.com/chenshenhai/node-modules-demo)


## Node 9下import/export使用简单须知
- Node 环境必须在 9.0以上
- 不加loader时候，使用`import/export`的文件后缀名必须为`*.mjs`（下面会讲利用Loader Hooks兼容`*.js`后缀文件） 
- 启动必须加上flag `--experimental-modules`
- 文件的`import`和`export`必须严格按照`ECMAScript Modules`语法
- `ECMAScript Modules`和`require()`的cache机制不一样


## 使用简述
Node 9.x官方文档 [https://nodejs.org/dist/latest-v9.x/docs/api/esm.html](https://nodejs.org/dist/latest-v9.x/docs/api/esm.html)

### 与require()区别
|能力|描述|require()|import|
|----|----|----|----|
|NODE_PATH|从NODE_PATH加载依赖模块|Y|N|
|cache|缓存机制|可以通过require的API操作缓存|自己独立的缓存机制，目前不可访问|
|path|引用路径|文件路径|URL格式文件路径，例如`import A from './a?v=2017'`|
|extensions|扩展名机制|require.extensions|Loader Hooks|
|natives|原生模块引用|直接支持|直接支持|
|npm|npm模块引用|直接支持|需要Loader Hooks|
|file|文件(引用)|`*.js`,`*.json`等直接支持|默认只能是`*.mjs`，通过`Loader Hooks`可以自定义配置规则支持`*.js`,`*.json`等Node原有支持文件|


## Loader Hooks模式使用

> 由于历史原因，在ES6的Modules还没确定之前，JavaScript的模块化处理方案都是八仙过海，各显神通，例如前端的AMD、CMD模块方案，Node的CommonJS方案也在这个“乱世”诞生。
> 当到了ES6规范确定后，Node的CommonJS方案已经是JavaScript中比较成熟的模块化方案，但ES6怎么说都是正统的规范，“法理”上是需要兼容的，所以`*.mjs`这个针对`ECMAScript Modules`规范的Node文件方案在一片讨论声中应运而生。

> 当然如果`import/export`只能对`*.mjs`文件起作用，意味着Node原生模块和npm所有第三方模块都不能。所以这时候Node 9就提供了 `Loader Hooks`，开发者可自定义配置`Resolve Hook`规则去利用`import/export`加载使用Node原生模块，`*.js`文件，npm模块，C/C++的Node编译模块等Node生态圈的模块。

### Loader Hooks 使用步骤
- 自定义loader规则
- 启动的flag要加载loader规则文件 
    - 例如：`node --experimental-modules  --loader ./custom-loader.mjs ./index.js`


## Koa2 直接使用import/export

看看demo4，[https://github.com/chenshenhai/node-modules-demo/tree/master/demo4](https://github.com/chenshenhai/node-modules-demo/tree/master/demo4)

- 文件目录

```js
├── esm
│   ├── README.md
│   ├── custom-loader.mjs
│   ├── index.js
│   ├── lib
│   │   ├── data.json
│   │   ├── path.js
│   │   └── render.js
│   ├── package.json
│   └── view
│       ├── index.html
│       ├── index.html
│       └── todo.html
```

代码片段太多，不一一贴出来，只显示主文件

```js
import Koa from 'koa';
import { render } from './lib/render.js';
import data from './lib/data.json';

let app = new Koa();
app.use((ctx, next) => {
    let view = ctx.url.substr(1);
    let content;
    if ( view === '' ) {
        content = render('index');
    } else if ( view === 'data' ) {
        content = data;
    } else {
        content = render(view);
    }
    ctx.body = content;
})
app.listen(3000, ()=>{
    console.log('the modules test server is starting');
})
```

- 执行代码
```
node --experimental-modules  --loader ./custom-loader.mjs ./index.js
```

- 访问
  - 访问 [http://127.0.0.1:3000/index](http://127.0.0.1:3000/index)
  - 访问 [http://127.0.0.1:3000/data](http://127.0.0.1:3000/data)
  - 访问 [http://127.0.0.1:3000/todo](http://127.0.0.1:3000/todo)


### 自定义loader规则优化

从上面官方提供的自定义loader例子看出，只是对`*.js`文件做`import/export`做loader兼容，然而我们在实际开发中需要对npm模块，`*.json`文件也使用`import/export`
 
### loader规则优化解析

```js
import url from 'url';
import path from 'path';
import process from 'process';
import fs from 'fs';

// 从package.json中
// 的dependencies、devDependencies获取项目所需npm模块信息
const ROOT_PATH = process.cwd();
const PKG_JSON_PATH = path.join( ROOT_PATH, 'package.json' );
const PKG_JSON_STR = fs.readFileSync(PKG_JSON_PATH, 'binary');
const PKG_JSON = JSON.parse(PKG_JSON_STR);
// 项目所需npm模块信息
const allDependencies = {
  ...PKG_JSON.dependencies || {},
  ...PKG_JSON.devDependencies || {}
}

//Node原生模信息
const builtins = new Set(
  Object.keys(process.binding('natives')).filter((str) =>
    /^(?!(?:internal|node|v8)\/)/.test(str))
);

// 文件引用兼容后缀名
const JS_EXTENSIONS = new Set(['.js', '.mjs']);
const JSON_EXTENSIONS = new Set(['.json']);

export function resolve(specifier, parentModuleURL, defaultResolve) {
  // 判断是否为Node原生模块
  if (builtins.has(specifier)) {
    return {
      url: specifier,
      format: 'builtin'
    };
  }

  // 判断是否为npm模块
  if ( allDependencies && typeof allDependencies[specifier] === 'string' ) {
    return defaultResolve(specifier, parentModuleURL);
  }

  // 如果是文件引用，判断是否路径格式正确
  if (/^\.{0,2}[/]/.test(specifier) !== true && !specifier.startsWith('file:')) { 
    throw new Error(
      `imports must begin with '/', './', or '../'; '${specifier}' does not`);
  }

  // 判断是否为*.js、*.mjs、*.json文件
  const resolved = new url.URL(specifier, parentModuleURL);
  const ext = path.extname(resolved.pathname);
  if (!JS_EXTENSIONS.has(ext) && !JSON_EXTENSIONS.has(ext)) {
    throw new Error(
      `Cannot load file with non-JavaScript file extension ${ext}.`);
  }

  // 如果是*.js、*.mjs文件
  if (JS_EXTENSIONS.has(ext)) {
    return {
      url: resolved.href,
      format: 'esm'
    };
  }
  
  // 如果是*.json文件
  if (JSON_EXTENSIONS.has(ext)) {
    return {
      url: resolved.href,
      format: 'json'
    };
  }

}
```

### 规则总结
在自定义loader中，export的resolve规则最核心的代码是
```js
return {
  url: '',
  format: ''
}
```

- url 是模块名称或者文件URL格式路径
- format 是模块格式有`esm`, `cjs`, `json`, `builtin`, `addon`这四种模块/文件格式.


注意：
目前Node对`import/export`的支持现在还是`Stability: 1 - Experimental`阶段，后续的发展还有很多不确定因素，自己练手玩玩还可以，但是在还没去flag使用之前，尽量不要在生产环境中使用。Node 9.x 更详细`import/export`的使用，可参考 [https://github.com/ChenShenhai/blog/issues/24](https://github.com/ChenShenhai/blog/issues/24)









