const path = require('path')
const os = require('os')
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

const resolvePath = _path => path.resolve(__dirname, _path)
//  cpu逻辑处理器个数
const threads = os.cpus().length


module.exports = {
  entry: './src/index.js',

  output: {
    path: resolvePath('./dist'),
    clean: true,
    filename: 'scripts/[name].js'
  },

  module: {
    rules: [{
      oneOf: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        // 匹配less文件
        test: /\.less$/,
        // loader的使用顺序 less-loader，css-loader，style-loader
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }, {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'cache-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: 'asset',
        generator: {
          filename: 'assets/img/[hash:10][ext]'
        }
      }, {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        // include: resolvePath('./src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // 开启babel编译缓存
          cacheCompression: false, // 缓存文件不压缩
        }
        /* use: [{
          loader: "thread-loader", // 开启多进程
          options: {
            workers: threads, // 数量
          },
        }, {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // 开启babel编译缓存
            cacheCompression: false, // 缓存文件不压缩
          }
        }] */
      }]
    }]
  },

  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: resolvePath('./src'),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: resolvePath('../node_modules/.cache/.eslintcache')
    }),
    // new 实例化调用插件
    new HtmlWebpackPlugin({
      template: resolvePath('./src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],

  resolve: {
    alias: {
      '@': resolvePath('./src')
    },
    extensions: [".js", ".ts"]
  },

  devServer: {
    client: {
      overlay: true
    },
    host: 'localhost',
    port: 8080,
    open: true,
    hot: true,
    // liveReload: true
  },

  devtool: 'cheap-module-source-map',

  mode: 'production'
}