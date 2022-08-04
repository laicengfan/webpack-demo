const path = require('path')
const os = require('os')
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const resolvePath = _path => path.resolve(__dirname, _path)
//  cpu逻辑处理器个数
const threads = os.cpus().length


module.exports = {
  entry: {
    index: './src/index.js',
    main: './src/main.js',
  },

  output: {
    path: resolvePath('./dist'),
    clean: true,
    filename: 'scripts/[name].[contenthash:10].js',
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
        },
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024 // 小于60kb的图片会被base64处理
          }
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
    // new CssMinimizerPlugin()
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      // new TerserPlugin()
    ],

    splitChunks:{
      // 对所有模块进行分割
      chunks:'all',
      cacheGroups: {
        default: {
          // chunks需达到一定体积才能被分割，我们定义的chunk体积太小，所以更改生成 chunk 的最小体积（以 bytes 为单位）。
          minSize: 0, 
          minChunks: 2,
          priority: -20,
          // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          reuseExistingChunk: true,
        }
      }
    },

    runtimeChunk: {
      name: entryChunk => `runtime-${entryChunk.name}.js`
    }
  },

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
    liveReload: true
  },

  externals: {
    cengfan: 'Vue',
  },

  devtool: 'cheap-module-source-map',

  mode: 'production'
}