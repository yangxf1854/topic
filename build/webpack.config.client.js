
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
// 开发环境配置
const isDev = process.env.NODE_ENV === 'development'
const config = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/' // /public/app.hash.js
  },
  resolve: {
    extensions: ['.js', '.jsx'] // 自动解析确定的扩展。
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html') // 页面html模版
    })
  ]

}

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'), // contentBase表示的是告诉服务器从哪里提供内容
    hot: true, // 启动Hot module replacemen
    overlay: { // 编译时出现错误那么在网页上显示错误信息
      errors: true // 只出现错误的信息
    },
    publicPath: '/public', // 所有我们访问的静态文件前面都加public
    historyApiFallback: { // 保证我们访问的html是public/index.html
      index: '/public/index.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
