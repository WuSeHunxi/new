const webpack = require("webpack");
const path = require("path");
//对公共模块进行打包
module.exports = {
  mode: "production",
  entry: {//有几个公共模块需要打包就写几个
    jquery: ["jquery"],
    lodash: ["lodash"]
  },
  output: {
    filename: "dll/[name].js",
    library: "[name]" // 每个bundle暴露的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({//webpack自带插件
      path: path.resolve(__dirname, "dll", "[name].manifest.json"),
      name: "[name]"//通常和library一致
    })
  ]
};
