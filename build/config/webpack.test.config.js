/**
 *
*/
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');
const findPublishEntries = require('../utils/publish-enties.js');
const addOptimization = require('../utils/optimization-utils.js');
function resolve (dir) {
  return path.join(__dirname, '../../', dir);
}
addOptimization(webpackBaseConfig);
module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    'cubui': resolve('src/index.js'),
    ...findPublishEntries()
  },
  output: {
    path: resolve('lib'),
    publicPath: '/lib/',
    filename: '[name].js',
    library: 'cubui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.vue', '.js', '.json', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': resolve('src'),
      '@utlis': resolve('src/utils'),
      '@components': resolve('src/components'),
      '@plugins': resolve('src/plugins')
    }
  },
  externals: {
    vue: {
      root: 'vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: false,
      sourceMap: false,
      uglifyOptions: {
        warnings: false,
        parse: {},
        compress: {},
        mangle: true, // Note `mangle.properties` is `false` by default.
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_fnames: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'development'
      }
    })
  ]
});
