//让AMD和CommonJS尽可能相似

define(function (require, exports, module) {
    var b = require("b");
    console.log("a", b);
    module.exports = "a模块的内容"
})