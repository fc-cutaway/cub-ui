const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
/**
 * 增加优化配置，该配置仅在非watch模式下生效,包括图片压缩，css压缩合并 js压缩合并
 * @param {Object} webpackConfig webpack基础配置信息
*/
module.exports = addOptimization;
function addOptimization (webpackConfig) {
  webpackConfig.optimization = {
    // 启动压缩
    minimize: true,
    // 合并重复的代码块
    mergeDuplicateChunks: true,
    // 移除父模块中已经存在的模块
    removeAvailableModules: true,
    // runtimeChunk: 'single',
    // 无论 mode 值是什么始终保持文件名
    // occurrenceOrder: true,
    // 代码拆分,目前HtmlWebpackPlugin不支持，暂不开启
    namedModules: true,
    namedChunks: true,
    minimizer: [
      // 优化js压缩
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        cache: true,
        uglifyOptions: {
          ie8: false,
          ecma: 5,
          warnings: false,
          compress: true,
          output: {
            comments: false
          }
        }
      })
    ]
    // 代码块拆分
    // splitChunks: {
    //   // 每个块的最大大小是60K
    //   // maxSize: 61440,
    //   // 每个块的最小大小是40K
    //   minSize: 40960,
    //   chunks: 'async',
    //   maxSize: 61440,
    //   // minChunks: 1,
    //   // maxAsyncRequests: 5,
    //   // maxInitialRequests: 3,
    //   // automaticNameDelimiter: '~',
    //   // name: true,
    //   cacheGroups: {
    //     // default: false,
    //     commons: {
    //       name: 'commons',
    //       chunks: 'all',
    //       minChunks: 2
    //     }
    //   }
    // }
  };
  webpackConfig.plugins.push(
    new ImageminPlugin({
      jpegtran: {
        progressive: true
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    })
  );
  return webpackConfig;
}
