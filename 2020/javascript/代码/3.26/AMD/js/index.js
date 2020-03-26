define(["b"], function (b) {//函数中的参数个数和导入的文件个数相同

    //等b.js加载完成之后执行该函数
    //模块内部的代码
    console.log(b);

});

//[]是要导入的文件名称

define((require, exports, module) => {
    var a = require("a");
    var b = require("b");
    console.log(b, a)
})