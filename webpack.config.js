const path = require('path')

const resolvePath = _path => path.resolve(__dirname, _path)

module.exports = {
  entry: './src/index.js',

  output: {
    path: resolvePath('./dist'),
    clean: true,
    filename: 'scripts/[name].js'
  },

  module: {
    rules:[{
      test: /\.css$/,
      use:[
        'style-loader',
        'css-loader'
      ]
    },{
      // 匹配less文件
      test: /\.less$/,
      // loader的使用顺序 less-loader，css-loader，style-loader
      use:[
        'style-loader',
        'css-loader',
        'less-loader'
      ]
    },{
      test: /\.s[ac]ss$/,
      use:[
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },{
      test: /\.(jpe?g|png|gif|webp|svg)$/,
      type: 'asset',
      generator: {
        filename: 'assets/img/[hash:10][ext]'
      }
    }]
  },

  mode:'development'
}