var fs=require('fs');
// console.log(1);

// new Promise(function(){
//     console.log(2);
//     fs.readFile('./data/a.txt','utf8',function(err,data){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(3+"  "+data);
//         }
//     })
// })

// console.log(4);


//p1是Promise的实例
var p1=new Promise(function(resolve,reject){
    fs.readFile('./data/a.txt','utf8',function(err,data){
        if(err){
            // console.log(err);
            reject(err);
        }else{
            resolve(data);
        }
    })
})


//当p1成功了，就then(then里面实现的就是resolve(data))
p1.then(function(data){
    console.log(data);
},function(err){//这个实现的就是reject(err)
    console.log("读取文件失败",err);
})