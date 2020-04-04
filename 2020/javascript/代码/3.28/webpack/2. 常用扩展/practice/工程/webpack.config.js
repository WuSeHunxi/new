const baseConfig = require("./webpack.base");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.pro")

module.exports = function (env) {
    if (env && env.prod) {
        const config = {
            ...baseConfig,
            ...prodConfig
        }
        config.plugin = [...baseConfig.plugins, ...prodConfig];
        return config
    } else {
        return {
            ...baseConfig,
            ...devConfig
        }
    }
}