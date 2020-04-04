const baseConfig = require("./webpack.base");
const devConfig = require("./webpack.dev");
const proConfig = require("./webpack.pro");

module.exports = function (env) {
    if (env && env.prod) {
        return {
            ...baseConfig,
            ...proConfig
        }
    } else {
        return {
            ...baseConfig,
            ...devConfig
        }
    }
}