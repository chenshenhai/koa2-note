process.env.NODE_ENV = 'development';

const merge = require('webpack-merge');
const config = require('./webpack.base.config');

// const prodMode = process.env.NODE_ENV === 'production';

module.exports = merge(config, {
  mode: 'development',
  devtool: '#source-map'
});