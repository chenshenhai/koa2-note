# webpack4 环境搭建

## 前言
由于demos/project 前端渲染是通过react.js渲染的，这就需要webpack4 对react.js及其相关JSX，ES6/7代码进行编译和混淆压缩。

## webpack4 
### 安装和文档
可访问网[https://webpack.js.org/](https://webpack.js.org/)

## 配置webpack4编译react.js + less + sass + antd 环境

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

### webpack4 编译基础配置

#### babel@7 配置
```js
const babelConfig = {
  presets: [
    '@babel/env',
    // [
    //   '@babel/env',
    //   {
    //     targets: {
    //       edge: '17',
    //       firefox: '60',
    //       chrome: '67',
    //       safari: '11.1'
    //     },
    //     useBuiltIns: 'usage'
    //   }
    // ],
    '@babel/preset-react'
  ],
  'plugins': [
    [
      'import',
      { 'libraryName': 'antd', 'libraryDirectory': 'lib' },
      'ant'
    ],
    [
      'import',
      { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib' },
      'antd-mobile'
    ],
    '@babel/plugin-proposal-class-properties'
  ]
};

module.exports = babelConfig;

```

#### webpack.base.config.js
```js
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('./babel.config');

// const prodMode = process.env.NODE_ENV === 'production';

const srcResolve = function (file) {
  return path.join(__dirname, '..', 'src', file);
};

const distResolve = function (file) {
  return path.join(__dirname, '..', 'output', 'dist', file);
};

module.exports = {
  entry: {
    'index': srcResolve('js/index'),
    'admin' : srcResolve('pages/admin.js'),
    'work' : srcResolve('pages/work.js'),
    'index' : srcResolve('pages/index.js'),
    'error' : srcResolve('pages/error.js'),
  },
  output: {
    path: distResolve(''),
    filename: 'vendorjs/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: babelConfig
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [];
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};

```


### 配置开发&生产环境webpack4 编译设置
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
process.env.NODE_ENV = 'production';

const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('./webpack.base.config');

module.exports = merge(config, {
  mode: 'production',
  // plugins: [
  //   new UglifyJsPlugin()
  // ]
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
```
