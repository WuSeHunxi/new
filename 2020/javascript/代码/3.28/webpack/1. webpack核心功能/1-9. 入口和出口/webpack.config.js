var path = require("path")

module.exports = {
    mode: "production",
    entry: {
        //两个chunk，各自打包，互补干扰
        //当有多个chunk的时候(main,a)，出口文件必须要动态设置，不能只有一个了
        main: "./src/index.js", //属性名：chunk的名称， 属性值：入口模块（启动模块）
        a: ["./src/index.js", "./src/a.js"] //启动模块有两个（配置一个chunk下的多个入口文件）
    },
    output: {
        //输出的结果是配置得来的，不是默认的
        path: path.resolve(__dirname, "target"), //必须配置一个绝对路径，表示资源放置的文件夹，默认是dist
        filename: "[id].[chunkhash:5].js", //配置的合并的js文件的规则(哪个chunk改变了，影响的就是哪一个)
        // filename: "[id].[hash:5].js"
    },
    devtool: "source-map"//会生成map文件
}