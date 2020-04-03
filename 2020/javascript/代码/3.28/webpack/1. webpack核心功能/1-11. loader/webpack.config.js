module.exports = {
    mode: "development",
    module: {
        rules: [
            // {
            //     test: /index\.js$/, //正则表达式，匹配模块的路径
            //     use: ["./loaders/loader1", "./loaders/loader2"] //匹配到了之后，使用哪些加载器
            // }, //规则1
            // {
            //     test: /\.js$/, //正则表达式，匹配模块的路径
            //     use: ["./loaders/loader3", "./loaders/loader4"] //匹配到了之后，使用哪些加载器
            // } //规则2

            {
                test: /\.js$/,
                use: ["./loaders/loader1.js", "./loaders/loader2.js"]
            }
        ], //模块的匹配规则，匹配的时候是从上往下，运行的时候是从下往上
    }
}


// module.exports = {
//     mode: "development",
//     module: {
//         rules: [
//             {
//                 test: /index\.js$/,
//                 use: {
//                     loader: "./loaders/test-loader.js",
//                     options: {
//                         changeVar: "未知数"
//                     }
//                 }
//             }
//         ]//规则可以有很多个
//     }
// }