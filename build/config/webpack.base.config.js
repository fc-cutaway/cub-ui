/**
 * 公共配置
*/
const path = require('path');
const webpack = require('webpack');
const pkg = require('../../package.json');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
function resolve (dir) {
  return path.join(__dirname, '..', dir);
}
module.exports = {
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        },
        exclude: resolve('node_modules')
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: resolve('dist')
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MinCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MinCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MinCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          publicPath: '../',
          name: 'image/[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(woff2?|eot|tff|otf|ttf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          publicPath: '../',
          name: 'fonts/[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader',
            options: {
              /* your options here */
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MinCssExtractPlugin({
      filename: 'style/[name].css',
      chunkFilename: '[id].min.css',
      minify: {
        // 去除注释,
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${pkg.version}'`
    })
  ]
};
