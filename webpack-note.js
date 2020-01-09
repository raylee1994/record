1、 babel-preset: 转换es语法
    babel-polyfill(全局垫片) babel-runtime babel-plugin-transform-runtime（局部垫片，开发框架）: 转换es函数和方法 （除非开发js库或css工具包，否则只需在项目中引入babel-polyfill而不需要引入runtime）