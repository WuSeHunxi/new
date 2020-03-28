//立即执行函数能够形成一个单独的作用域
const SymbolFor = (() => {
    const global = {};//用于记录有哪些共享符号
    return function (name) {
        // console.log(global)
        if (!global[name]) {
            global[name] = Symbol(name);
        }
        console.log(global);
        return global[name];
    }
})();

//形成闭包
const SymbolFor = (name => {
    const global = {};//用于记录有哪些共享符号
    // console.log(global)
    if (!global[name]) {
        global[name] = Symbol(name);
    }
    console.log(global);
    return global[name];
})
// const SymbolFor=(()=>{
//     const global={};
//     return function(name){
//         if(!global[name]){
//             global[name]=Symbol(name)
//         }
//         return global[name];
//     }
// })()



//共共享符号就是根据描述的内容来建立的，相同的话就是同一个
const syb1 = SymbolFor("abc");

const syb2 = SymbolFor("abc");

console.log(syb1 === syb2);

