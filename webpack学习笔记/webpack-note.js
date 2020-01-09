1、 babel-preset: 转换es语法
    babel-polyfill(全局垫片) babel-runtime babel-plugin-transform-runtime（局部垫片，开发框架）: 转换es函数和方法 （除非开发js库或css工具包，否则只需在项目中引入babel-polyfill而不需要引入runtime）

2、 babrlrc中module:false就不会对es6的语法（诸如:import）进行转换了 (tree shaking 生效)   


3、热更新(HMR)不能和[chunkhash]同时使用

    解决方法：
    1： 如果是开发环境，将配置文件中的chunkhash 替换为hash
    2：如果是生产环境，不要使用参数 --hot


4、html-webpack-plugin其实并不关心你用的是什么模板引擎，只要你的模板最后export出来的是一份完整的HTML代码（字符串）就可以了。于是，我做了一个大胆的尝试，给html-webpack-plugin的template参数指定一个js文件，然后在此js文件末尾export出一份完整的HTML代码来。

5、import('**.ejs'),返回一个函数：layout，执行 layout(arguments)，会返回一份完整的html字符串

6、webpack多页应用痛点：①：每一个页面对应一个chunk（js），多个页面逻辑相同的js如何复用。②：打包生成代码压缩后，后期如何运维。③：后端渲染的项目中，输出静态页面供后端改写成动态页面后，后期如何进行页面修改。④：上线后部分修改，重新打包后如何只上传部分文件。