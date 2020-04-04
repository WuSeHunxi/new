const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?modules']
            }, {
                test: /\.png/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
}   