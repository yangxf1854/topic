const path = require('path')
const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')

// 开发环境
const isDev = process.env.NODE_ENV === 'development'
// 新建app
const app = express()


if (!isDev) { // 非开发环境
    const serverEntry = require('../dist/server-entry.js').default
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
    app.use('/public', express.static(path.join(__dirname, '../dist/')))
    app.get('*', function (req, res) {
        const appString = ReactSSR.renderToString(serverEntry)
        res.send(template.replace('<!-- app -->', appString)) // 发送给浏览器
    })
} else {
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen(3333, function () {
    console.log('server is listenning at 3333')
})
