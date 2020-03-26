var util = 123;

var abc = require("./util.js");
var abc2 = require("./util.js");
console.log(abc === abc2);//true--->因为有缓存
require("./b")//没有导出的话就是空