const path = require('path')
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

const resolvePath = _path => path.resolve(__dirname, _path)

module.exports = {
  entry: './src/index.ts',

  output: {
    path: resolvePath('./dist'),
    clean: true,
    filename: 'scripts/[name].js'
  },

  module: {
    rules: [{
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
      use: 'babel-loader',
    }]
  },

  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: resolvePath('./src'),
    }),
    // new 实例化调用插件
    new HtmlWebpackPlugin({
      template: resolvePath('./src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],

  resolve:{
    alias: {
      '@': resolvePath('./src')
    },
  },

  devServer: {
    client:{
      overlay: true
    },
    host: 'localhost',
    port: 8080,
    open: true,
    hot: true,
    // liveReload: true
  },

  devtool:'cheap-module-source-map',

  mode: 'development'
}