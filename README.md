
##新建项目名称topic

##npm init
生成一个package.json

##安装weppack、react、react-dom
--npm i webpack
-- npm i react
--npm i react-dom

##在根目录下新建build,在build文件夹下新建webpack.config.js

webpack.config.js文件：

相应安装babel-loader(上面截图是解析jsx文件的loader)
--npm i babel-loader babel-core -D

##然后要新建一个babel的配置文件.babelrc

也要安装相关依赖
-- npm i babel-preset-es2015 babel-preset-es2015-loose babel-preset-react

##想要浏览器打开html文件，安装相关依赖
--npm i html-webpack-plugin -D

##接下来是服务端渲染的基本配置
##在build文件夹下新建webpack.config.server.js,这个文件和webconfig.config.js基本差不多，可以拷贝过来将不同的改下
并且新建如下文件（红框标红）

相应的文件代码：

页面上会报：

要解决此报错，可以在server.js文件中取serverEntry加上一个default,具体原因可以将serverEntry打印出来，我们要发送的是对象里面default的东西


这边注意红框部分，其他部分和webpack.config.js差不多


此时package.json下的配置如下图配置，这边为了区分，将webpack.config.js文件名改为webpack.config.client.js

##新建html模板

webpack.config.client.js配置html模板

重新编译--npm run build, 执行 --npm start, 浏览器访问：
http://localhost:3333/
页面展示如下：

页面html：


基础配置已经完成了，下面我们再优化
之前在编译的时候，我们每次都要执行下npm run build
那我们在开发的时候可以配置一些项目在开发的时候的常用配置
--webpack dev server(是webpack官方提供的一个小型Express服务器。使用它可以为webpack打包生成的资源文件提供web服务。两个主要功能：
为静态文件提供服务
自动刷新和热替换(HMR))
--Hot module replacement(应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面)。

如何配置：
##配置webpack dev serve
打开webpack.ckonfig.client.js,添加以下代码



###然后安装webpack-dev-server
npm install webpack-dev-server -D

###安装完成之后配置package.json

注意：命令要添加cross-env NODE_ENV=development,  cross-env是一个需要安装，主要解决跨平台配置，linux和window和mac，cross-env安装命令：npm install cross-env -D,后面NODE_ENV=development是开发环境。

###然后启动项目，用localhost:8888访问页面，页面访问js文件报404，然后在项目中直接打开js文件是可以访问的，打开地址可以看到前面会多一个public,那是之前在配置的时候在webpack.config.client文件中的输出目录中加了配置

所以我们在webpack.config,client.js中改下开发环境的配置


###重新启动项目，发现访问页面还是404

如何解决：这边是一个隐藏的坑，webpack会在硬盘上找相应的js文件，所以我们要删除dist目录。

删除后重新访问，访问成功。


###配置Hot module replacement
首先配置babel,编辑.balbelrc文件和webpack,config.client.js



然后安装react-hot-loader包
npm i react-hot-loader@next -D



###安装完成之后，修改app.js



###开发时的服务端渲染,取development环境，然后不是走dev时，新建一个util文件夹，文件夹下新建dev-static.js,引入。

然后非dev环境的时候就都可以在dev-static.js文件里面操作了

###安装axios
npm i axios -S
###安装memory-fs
npm i memory-fs -D
###安装http-proxy-middleware
npm i http-proxy-middleware -D
