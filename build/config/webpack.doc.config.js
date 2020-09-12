/**
 * 本地预览
*/
const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const addOptimization = require('../utils/optimization-utils.js');
const WebpackBaseConfig = require('./webpack.base.config.js');
function resolve (dir) {
  return path.join(__dirname, '../../', dir);
}
// addOptimization 添加代码的拆分压缩优化
addOptimization(WebpackBaseConfig);
let devServerObj = {
  publicPath: '/',
  port: 9000,
  hot: true,
  host: 'localhost',
  open: true,
  openPage: 'index.html'
};
module.exports = merge(WebpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: devServerObj,
  // 入口
  entry: {
    main: resolve('doc/main.js'),
    example: resolve('examples/main.js')
  },
  output: {
    path: resolve('docdist'),
    publicPath: './',
    filename: 'js/[name].[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      cubui: resolve('src/index.js'),
      vue: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@components': resolve('src/components'),
      '@directives': resolve('src/directives'),
      '@filters': resolve('src/filters'),
      '@plugins': resolve('src/plugins')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('doc/index.html'),
      filename: 'index.html',
      appropriate: true,
      inject: true,
      chunks: ['vendor', 'common', 'main'],
      chunksSortMode: 'manual',
      minify: {
        removeComments: true,
        conservativeCollapse: true
      },
      hash: false
    }),
    new HtmlWebpackPlugin({
      template: resolve('examples/index.html'),
      filename: 'example.html',
      appropriate: true,
      inject: true,
      chunks: ['vendor', 'common', 'example'],
      chunksSortMode: 'manual',
      minify: {
        removeComments: true,
        conservativeCollapse: true
      },
      hash: false
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin()
  ]
});
