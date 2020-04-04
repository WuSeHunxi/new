const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    mode: "production",
    plugin: [
        new CleanWebpackPlugin()
    ]
}