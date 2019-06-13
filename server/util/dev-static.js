const axios = require('axios')
const path = require('path');
const webpack = require('webpack')
const MemoryFS = require('memory-fs') // 内存读取文件
const proxy = require('http-proxy-middleware') // 用于把请求代理转发到其他服务器的中间件
const serverConfig = require('../../build/webpack.config.server')
const reactDomServer = require('react-dom/server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  });
}

const Module = module.constructor // module的构造函数
const mfs = new MemoryFS
const serverCompiler = webpack(serverConfig) // 传入配置
let serverBundle; // 定义全局变量
serverCompiler.outputFileSystem = mfs;
// 监听一些错误和提示
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path, // server配置文件的输出文件地址
    serverConfig.output.filename // server配置文件的输出文件名称
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8') //读取文件并以utf-8字符串输出
  const m = new Module
  m._compile(bundle, 'server-entry.js') // 编译时要指定js文件名称
  serverBundle = m.exports.default // 加载读取出来的文件
})
module.exports = function (app) {
  // proxy现在就是一个中间件把需要发送的请求/public发送到目标服务器http://localhost:8888
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))

  app.get('*', function(req, res) {
    getTemplate().then((template) => {
      const content = reactDomServer.renderToString(serverBundle) // 用于将组件输出成html字符串
      res.send(template.replace('<!-- app -->', content)) // 重新替换
    })
  })
}