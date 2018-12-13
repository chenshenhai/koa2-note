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
    filename: 'js/[name].js'
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
