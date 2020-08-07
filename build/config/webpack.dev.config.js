const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const findPublishEntries = require('../utils/publish-enties.js');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    view: resolve(__dirname, '../../', 'src/index.js'),
    ...findPublishEntries()
  },
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    library: 'view',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  // resolve:{
  //     extensions:['.vue','.js','.json','.css'],
  //     alias:{
  //       'vue$':'vue/dist/vue.js',
  //       '@':resolve('src'),
  //       '@utlis':resolve('src/utils'),
  //       '@components':resolve('src/components'),
  //       '@plugins':resolve('src/plugins')
  //     }
  //   },
  externals: {
    vue: {
      root: 'vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'development'
      }
    })
  ]
});
