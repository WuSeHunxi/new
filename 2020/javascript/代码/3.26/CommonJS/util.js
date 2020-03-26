var count = 0;

exports.getNumber = function () {
    count++;
    return count;
}

//内部的实现原理：module.exports和exports指向同一个对象
// 立即函数执行
// (function (module) {
//     module.exports = {};
//     var exports = module.exports;
//     var count = 0;
//     exports.getNumber = function () {
//         count++;
//         return count;
//     }
//     exports.abc = 123;
//     return module.exports;//它的返回值是module.exports，而不是exports，如果二者不在指向同一个对象了，那么exports中的任何内容都是undefined
// })()


//基于上述原理，导出模块也可以这样写
// module.exports.getNumber = function () {
//     count++;
//     return count;
// }

// module.exports.abc = 13;


//重新赋值了，此时二者不在指向同一个对象
module.exports = {//最好的导出方法
    getNumber: function () {
        count++;
        return count;
    },
    abc: 134
}

//导出只能一次，但是导入可以多次