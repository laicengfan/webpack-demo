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
    }]
  }
}