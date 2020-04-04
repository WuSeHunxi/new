var MyPlugin = require("./plugins/MyPlugin")

// module.exports = {
//     mode: "development",
//     watch: true,
//     plugins: [
//         new MyPlugin()
//     ],
//     devtool: "source-map"
// }

module.exports = {
    mode: "development",
    watch: true,
    plugins: [
        new MyPlugin()
    ],
    devtool: "source-map"
}

