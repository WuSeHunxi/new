import "./b.js";//这条导入语句仅仅会运行，不会导出里面代码
import "./init.js";//一般可以利用这种功能初始化代码
import * as a from "./a.js";//导出a.js中全部代码，但需要重命名
import {b as b2} from "./b.js"//更换变量名，导出
//import{ name, age, test, Person} from "./a.js" 导出a中的变量
// var b = 3;
// console.log(b2)
// console.log(name, age);
// console.log(b)

console.log(a.a, a.age, a.name)