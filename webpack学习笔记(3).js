1、使用CommonsChunkPlugin会把共有代码和runtime提取到父节点(共有代码通常是不变的，单独提取出来可以利用浏览器缓存，提高加载速度)

例：
var webpack = require("webpack");
module.exports = {
  entry: {
    app: "./app.js" /*业务代码*/,
    vendor: ["lodash","jquery"] /*公共代码*/,
  },
  output: {
    path: 'release',
    filename: "[name].[chunkhash].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({names: ['vendor','runtime']}),
  ]
}

-----------------------------------

2、webpack.config.js 使用es6语法  只要修改Webpack 文件名，为webpack.config.babel.js 就可以，但node 版本> 4， 并且要安装全babel-loader 和 babel-core ，webpack 会自动把webpack.config.babel 转化成es5

-----------------------------------

3、glob模式语法说明

基本语法介绍

* 匹配任意数量的字符，但不匹配/
? 匹配单个字符，但不匹配/
** 匹配任意数量的字符，包括/，只要它是路径中唯一的一部分
{} 允许使用一个逗号分割的列表或者表达式  //{js,json}  {,}中逗号后面不能有空格
! 在模式的开头用于否定一个匹配模式(即排除与模式匹配的信息)

-----------------------------------

4、process.env
process.env属性返回一个对象，包含了当前Shell的所有环境变量。比如，process.env.HOME返回用户的主目录。

通常的做法是，新建一个环境变量NODE_ENV，用它确定当前所处的开发阶段，生产阶段设为production，开发阶段设为develop或staging，然后在脚本中读取 process.env.NODE_ENV即可。

运行脚本时，改变环境变量，可以采用下面的写法。

$ export NODE_ENV=production && node app.js
# 或者
$ NODE_ENV=production node app.js

-----------------------------------

5、__dirname
在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。
例：当前__dirname为C:\Users\liweifan\Desktop

-----------------------------------

6、require.ensure()
webpack 在编译时，会静态地解析代码中的 require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。

语法如下：

require.ensure(dependencies: String[], callback: function(require), chunkName: String)
依赖 dependencies

这是一个字符串数组，通过这个参数，在所有的回调函数的代码被执行前，我们可以将所有需要用到的模块进行声明。

回调 callback

当所有的依赖都加载完成后，webpack会执行这个回调函数。require 对象的一个实现会作为一个参数传递给这个回调函数。因此，我们可以进一步 require() 依赖和其它模块提供下一步的执行。

chunk名称 chunkName

chunkName 是提供给这个特定的 require.ensure() 的 chunk 的名称。通过提供 require.ensure() 不同执行点相同的名称，我们可以保证所有的依赖都会一起放进相同的 文件束(bundle)。

-----------------------------------

7、生产环境构建
http://www.css88.com/doc/webpack2/guides/production-build/

-----------------------------------

8、如果webpack.config.js导出的是一个function, 那么webpack会执行它, 并把返回的结果作为配置对象.

module.exports = (options = {}) => {
  return {
    // 配置内容
  }
}

-----------------------------------

9、环境变量 (process.env === env)
通过 process.env.npm_package_xxx 可以获得到 package.json 中的内容。比如 process.env.npm_package_name 可以获得到 package.json 中 name 的值 。
另外可以通过 process.env.npm_config_xxx 来拿到 npm config 中的值，即拿到 npm 的配置变量。比如通过 process.env.npm_config_user_email 可以拿到 user.email 的值 。(npm_config_xxx === npm 的配置变量)

-----------------------------------

10、webpack-merge
作用约等于 object.assign

-----------------------------------

11、输出文件：output参数

publicPath:
publicPath参数表示的是一个URL路径（指向生成文件的根目录），用于生成css/js/图片/字体文件等资源的路径，以确保网页能正确地加载到这些资源。
publicPath参数跟path参数的区别是：path参数其实是针对本地文件系统的，而publicPath则针对的是浏览器；因此，publicPath既可以是一个相对路径，如示例中的'../../../../build/'，也可以是一个绝对路径如 http: / /www.xxxxx.com/。一般来说，我还是更推荐相对路径的写法，这样的话整体迁移起来非常方便。那什么时候用绝对路径呢？其实也很简单，当你的html文件跟其它资源放在不同的域名下的时候，就应该用绝对路径了，这种情况非常多见于后端渲染模板的场景。

-----------------------------------

11、DefinePlugin
你可以理解为，通过配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
比如，你通过下面的设置：

 // webpack.config.js
 new webpack.DefinePlugin({
        __DEV__: true
    }),
那么在你的业务代码中可以直接使用，比如有一个index.js

在index.js 你可以直接这样使用：

// index.js
if (__DEV__){
    // 任意代码
    console.log(‘这个是我通过webpack配置的全局标识’)
}
当然 ‘__DEV__’ 的值可以通过命令传递，也可以通过手动的配置

-----------------------------------

12、chunkhash与contenthash
webpack3：css变js不变，contenthash变chunkhash不变
webpack2：css变js不变，contenthash变chunkhash变（webpack-md5-hash）


--------------------------------------

13、 css-modules
import style from "./styles.css"
import style2 from "./styles2.css"


document.getElementsByTagName("div")[0].className=style.test

相同的类名也不会造成不同组件之间的污染。


------------------------------------


14、输出的entry文件加上hash

module.exports = (options = {}) => {
  return {
    /*
    这里entry我们改用对象来定义
    属性名在下面的output.filename中使用, 值为文件路径
    */
    entry: {
      index: './src/index',
    },

    output: {
      /*
      entry字段配置的入口js的打包输出文件名
      [name]作为占位符, 在输出时会被替换为entry里定义的属性名, 比如这里会被替换为"index"
      [chunkhash]是打包后输出文件的hash值的占位符, 把?[chunkhash]跟在文件名后面可以防止浏览器使用缓存的过期内容,
      这里, webpack会生成以下代码插入到index.html中:
      <script type="text/javascript" src="/assets/index.js?d835352892e6aac768bf"></script>
      这里/assets/目录前缀是output.publicPath配置的

      options.dev是命令行传入的参数. 这里是由于使用webpack-dev-server启动开发环境时, 是没有[chunkhash]的, 用了会报错
      因此我们不得已在使用webpack-dev-server启动项目时, 命令行跟上--env.dev参数, 当有该参数时, 不在后面跟[chunkhash]
      */
      filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    }
  }
}


----------------------------


15、简化import路径

文件a引入文件b时, b的路径是相对于a文件所在目录的. 如果a和b在不同的目录, 藏得又深, 写起来就会很麻烦:

import b from '../../../components/b'
为了方便, 我们可以定义一个路径别名(alias):

resolve: {
  alias: {
    '~': resolve(__dirname, 'src')
  }
}
这样, 我们可以以src目录为基础路径来import文件:

import b from '~/components/b'
html中的<img>标签没法使用这个别名功能, 但html-loader有一个root参数, 可以使/开头的文件相对于root目录解析.

{
  test: /\.html$/,
  use: [
    {
      loader: 'html-loader',
      options: {
        root: resolve(__dirname, 'src'),
        attrs: ['img:src', 'link:href']
      }
    }
  ]
}
那么, <img src="/favicon.png">就能顺利指向到src目录下的favicon.png文件, 不需要关心当前文件和目标文件的相对路径.

PS: 在调试<img>标签的时候遇到一个坑, html-loader会解析<!-- -->注释中的内容, 之前在注释中写的

<!--
大于10kb的图片, 图片会被储存到输出目录, src会被替换为打包后的路径
<img src="/assets/f78661bef717cf2cc2c2e5158f196384.png">
-->
之前因为没有加root参数, 所以/开头的文件名不会被解析, 加了root导致编译时报错, 找不到该文件. 大家记住这一点.



----------------------------------


16、怎么来兼容老式jQuery插件

ProvidePlugin + expose-loader:

ProvidePlugin的配置是这样的：

  var providePlugin = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
  });



 接下来介绍expose-loader，这个loader的作用是，将指定js模块export的变量声明为全局变量。下面来看下expose-loader的配置：

{
  test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
  loader: 'expose?$!expose?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
},
你或许会问，有了ProvidePlugin为嘛还需要expose-loader？问得好，如果你所有的jQuery插件都是用webpack来加载的话，的确用ProvidePlugin就足够了；但理想是丰满的，现实却是骨感的，总有那么些需求是只能用<script>来加载的。 








前后端分离
1、多页面应用url如何跳转  href="/foo/foo?id=123"
2、单一页面是否需要多处ajax请求     可以
3、ajax请求后以拼接字符串形式或者模板引擎       使用artTemplate    ejs
4、json分页
5、vue多页面应用	






