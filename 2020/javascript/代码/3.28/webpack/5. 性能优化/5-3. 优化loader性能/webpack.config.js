module.exports = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          // {
          //   loader: "cache-loader",
          //   options:{
          //     cacheDirectory: "./cache"//编译文件缓存的路径
          //   }
          // },
          "thread-loader",
          "babel-loader"
        ]
      }
    ]
  }
};
