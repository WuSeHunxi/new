import data from "./b.js"

// import { name, age } from "./a.js"

// import * as a from "./a.js"
//默认导出和基本导出
import a, { name, age } from "./a.js"

console.log(data)

// console.log(a.name, a.age, a.default)

console.log(a, name, age)