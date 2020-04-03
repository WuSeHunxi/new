var loaderUtils = require("loader-utils")

module.exports = function (sourceCode) {
    //sourceCode : 变量 a = 1;
    console.log("test-loader运行了")
    var options = loaderUtils.getOptions(this)//得到传入对象
    console.log(options)
    //options.changeVar--》得到传入的对象中的参数
    var reg = new RegExp(options.changeVar, "g");
    return sourceCode.replace(reg, "var");
}


