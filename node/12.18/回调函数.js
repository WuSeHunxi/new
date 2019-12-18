/**
 * 
 * 当我想在异步操作时，直接获得异步操作的数据，需要使用回调函数进行解决
 * 
 */
var fs = require("fs");

// function foo(callback) {
//     fs.readFile('./a.txt', 'utf8', function (err, data) {
//         // console.log(data);
//         callback(data);
//         console.log("papp");
//     })
//     console.log("hahaha");
// }

// foo(function(data){
//     console.log(data);
// })


// function foo(x,y,callback){
//     setTimeout(function(){
//         // console.log(x+y);
//         callback(1,2);
//     },2000);
// }

// foo(1,2,function(x,y){
//     console.log(x+y);
// })


// function add(x, y) {
//     setTimeout(() => {
//         var ret = x + y;
//         console.log(ret); //回调函数
//     }, 1000);
// }
// add(10, 20)

function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open ('get', url, true);
    //当请求加载成功之后调用指定的函数
    xhr.onload = function () {
        // console.log(xhr.responseText);
        callback(xhr.responseText);
    }
    xhr.send();
}
get('data.json', function (data) {
    console.log(data); 
});
