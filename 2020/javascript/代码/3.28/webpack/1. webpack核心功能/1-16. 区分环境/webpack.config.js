var baseConfig = require("./webpack.base")
var devConfig = require("./webpack.dev")
var proConfig = require("./webpack.pro")

//可以返回一个函数
module.exports = function (env) {
    if (env && env.prod) {
        return {
            //基本配置和生产配置
            ...baseConfig,
            ...proConfig,
            // mode: "production",
            // devtool: "none",
            //require("./webpack.pro")
        }
    }
    else {
        return {
            ...baseConfig,
            ...devConfig
        }
    }
}