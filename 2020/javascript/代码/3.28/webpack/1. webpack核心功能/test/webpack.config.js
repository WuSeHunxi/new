const MyPlugin = require("./plugin/MyPlugin");

module.exports = {
    mode: "development",
    watch: true,
    plugins: [
        new MyPlugin()
    ],
    devtool: 'source-map'
}