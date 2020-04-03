//该对象提供了大量路径处理的函数
//path--->node的内置模块
var path = require("path") //导出了一个对象

// var result = path.resolve("./", "child", "abc", "123");//得到完整的绝对路径

var result = path.resolve(__dirname, "src");
console.log(result);