const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: "development",
    devtool: "source-map",
    output: {
        filename: "scripts/[name].[chunkhash:5].js"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        //在页面上直接写死的纯静态的东西可以使用该插件，但是如果是通过js生成的话需要使用loader插件
        new CopyPlugin([
            { from: "./public", to: "./" }//to相对的就是输出目录
        ])
    ]
}