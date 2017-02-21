# webpack2 环境搭建

## 前言
由于demos/project 前端渲染是通过react.js渲染的，这就需要webpack2 对react.js及其相关JSX，ES6/7代码进行编译和混淆压缩。

## webpack2 
### 安装和文档
可访问网[https://webpack.js.org/](https://webpack.js.org/)

## 配置webpack2编译react.js + less + sass + antd 环境

### 文件目录
```sh
└── static # 项目静态文件目录
    ├── build
    │   ├── webpack.base.config.js # 基础编译脚本
    │   ├── webpack.dev.config.js # 开发环境编译脚本
    │   └── webpack.prod.config.js # 生产环境编译脚本
    ├── output # 编译后输出目录
    │   ├── asset
    │   ├── dist
    │   └── upload
    └── src # 待编译的ES6/7、JSX源代码
        ├── api
        ├── apps
        ├── components
        ├── pages
        ├── texts
        └── utils
```

### webpack2 编译基础配置

#### webpack.base.config.js
```js
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const sourcePath = path.join(__dirname, './static/src');
const outputPath = path.join(__dirname, './../output/dist/');

module.exports = {
  // 入口文件
  entry: {
    'admin' : './static/src/pages/admin.js',
    'work' : './static/src/pages/work.js',
    'index' : './static/src/pages/index.js',
    'error' : './static/src/pages/error.js',
    vendor: ['react', 'react-dom', 'whatwg-fetch'],
  },
  // 出口文件
  output: {
    path: outputPath,
    publicPath: '/static/output/dist/',
    filename: 'js/[name].js',
  },
  module: {
    // 配置编译打包规则
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              // presets: ['es2015', 'react'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader']
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'less-loader']
        })
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath,
      'node_modules'
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
      filename: 'js/[name].js'
    }),
  ]
};
```


### 配置开发&生产环境webpack2 编译设置
为了方便编译基本配置代码统一管理，开发环境（wepack.dev.config.js）和生产环境（webpack.prod.config.js）的编译配置都是继承了基本配置（wepack.base.config.js）的代码

#### 开发环境配置 wepack.dev.config.js
```js
var merge = require('webpack-merge')
var webpack = require('webpack')
var baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {

  devtool: 'source-map',
  plugins: [
    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
})
```

#### 编译环境配置 wepack.prod.config.js
```js
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  
  plugins: [
    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      }
    })
  ]
})
```
