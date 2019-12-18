// var fs=require("fs");
// var path=require("path");

// new Promise(function(){
//     fs.readFile('./a.txt','utf8',function(err,data){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(data);
//         }
//     })
// })


//函数版
// var fs=require("fs");

// var p1=new Promise(function(resolve,reject){
//     fs.readFile('./a.txt','utf8',function(err,data){
//         if(err){
//             reject(err);
//         }else{
//             resolve(data);
//         }
//     })
// });

// var p2=new Promise(function(resolve,reject){
//     fs.readFile('./b.txt','utf8',function(err,data){
//         if(err){
//             reject(err);
//         }else{
//             resolve(data);
//         }
//     })
// });

// var p3=new Promise(function(resolve,reject){
//     fs.readFile('./c.txt','utf8',function(err,data){
//         if(err){
//             reject(err);
//         }else{
//             resolve(data);
//         }
//     })
// });

// p1.then(function(data){
//     console.log(data);
//     return p2;
// },function(err){
//     console.log(err);
// }).then(function(data){
//     console.log(data);
//     return p3;
// }).then(function(data){
//     console.log(data);
// })


//封装版
var fs = require("fs");

function pReadFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

pReadFile('./a.txt').then(function(data){
    console.log(data);
    return pReadFile("./b.txt");
},function(err){
    console.log(err);
}).then(function(data){
    console.log(data);
    return pReadFile("./c.txt");
}).then(function(data){
    console.log(data);
})